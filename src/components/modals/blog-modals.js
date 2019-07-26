import React, { Component } from "react";
import ReactModal from "react-modal";
import BlogForm from "../blog/blog-form";

//making sure react modal works for screen reader
ReactModal.setAppElement(".app-wrapper")
/*"app-wrapper" is the class name for the entire application. 
You can fin it out in index.html*/

export default class BlogModal extends Component {
  constructor(props) {
    super(props);


    this.customStyles = {
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          width: "800px"
        },
        overlay: {
            backgroundColor: "rgba(1, 1, 1, 0.75)"
          }
      };
      this.handleSuccessfullFormSubmision = this.handleSuccessfullFormSubmision.bind(this);
  }

  handleSuccessfullFormSubmision(blog){
      //console.log("blog from blog form", blog);
      this.props.handleSuccessfulNewBlogSubmision(blog);

  }

  render() {
    return (
      <ReactModal 
      style={this.customStyles}
      onRequestClose={()=>{
          //if user click outside of the modal area or press scape from keyboard then close it
          this.props.handleModalClose();
      }}isOpen={this.props.modalIsOpen}>
        <BlogForm handleSuccessfullFormSubmision={this.handleSuccessfullFormSubmision}/>
      </ReactModal>
    );
  }
}