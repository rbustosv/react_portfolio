import React, { Component } from 'react';
import {EditorState, convertToRaw, ContentState} from "draft-js";
import {Editor} from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

export default class RichTextEditor extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          editorState: EditorState.createEmpty()//function as value for key editorState
        }

        this.onEditorStateChange = this.onEditorStateChange.bind(this);
        this.getBase64 = this.getBase64.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
      } 

  componentWillMount(){
    if (this.props.editMode && this.props.contentToEdit){
      const blocksFromHtml = htmlToDraft(this.props.contentToEdit);//with this we can render HTML in the text editor
      const {contentBlocks, entityMap} = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
      const editorState = EditorState.createWithContent(contentState);
      this.setState({editorState});

    }
  }    
      
  onEditorStateChange(editorState){
      this.setState({ editorState },
        this.props.handleRichTextEditorChange(
            //parsing content as raw string into html
            draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
        )
        );
  }
  //converting image embeded as string
  getBase64(file, callback){
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => callback(reader.result);
      reader.onerror = error => {};
  }
      
  uploadFile(file) {
    return new Promise((resolve, reject) => {
        this.getBase64(file, data => resolve({data: {link: data}}));
        //resolve({data: {link: data}})); this is the callback and the data is gotten from the result
    })
  }      

  render() {
    return (
      <div>
        <Editor
        editorState={this.state.editorState}
        wrapperClassName="demo-wrapper"
        editorClassname="demo-editor"
        onEditorStateChange={this.onEditorStateChange}
        //Double '{{' for passing objects
        toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
            image: {
              uploadCallback: this.uploadFile,
              alt: { present: true, mandatory: false },
              previewImage: true,
              inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg"
            }
          }}
      />
      </div>
    );
  }
}