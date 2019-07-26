import React, { Component } from "react";
import axios from 'axios';
import ReactHtmlParser from "react-html-parser";

import BlogForm from "../blog/blog-form";
import BlogFeaturedImage from "../blog/blog-featured-image";

export default class BlogDetail extends Component {
  constructor(props){
      super(props);

      this.state = {
          //using props because we are calling the router parameter
          currentId: this.props.match.params.slug,
          blogItem: {},
          editMode: false
      }

      this.handleEditClick = this.handleEditClick.bind(this);
      this.handleFeaturedImageDeleted = this.handleFeaturedImageDeleted.bind(this);
      this.handleUpdateFormSubmision = this.handleUpdateFormSubmision.bind(this);
  }

  handleUpdateFormSubmision(blog){
    this.setState({
      blogItem: blog,
      editMode: false
    })
  }

  handleFeaturedImageDeleted(){
    this.setState({
      blogItem: { featured_image_url:""}
    })
  }

  handleEditClick() {
    //console.log("handle edit clicked");
   if (this.props.loggedInStatus === "LOGGED_IN"){//only user authenticated can edit
    this.setState({editMode: true});
    }
  }

  getBlogItem() {
      //we are not using with credentials because blog is a public page
    axios.get(
      `https://rbustosv.devcamp.space/portfolio/portfolio_blogs/${this.state
        .currentId}`
    ).then(response => {
        this.setState({
            blogItem: response.data.portfolio_blog//getting blog_detail from api
        })
    }).catch(error => {
        console.log("getBlogItem error", error);
    })
  }

  componentDidMount(){
      this.getBlogItem();
  }


  render() {
    const {
        title,
        content,
        featured_image_url,
        blog_status
      } = this.state.blogItem;

      const contentManager = () =>{
        if (this.state.editMode){
          return (
          <BlogForm
          handleFeaturedImageDeleted={this.handleFeaturedImageDeleted}
          handleUpdateFormSubmision={this.handleUpdateFormSubmision}
          editMode={this.state.editMode}
          blog={this.state.blogItem} 
          />//if click title editMode true then bring form to edit 
          )} else {
          return (
          <div className="content-container">
          {/*Addind functionality for modifying just clicking the title */}
            <h1 onClick={this.handleEditClick}>{title}</h1>
            {/*Passing as prop the img */}
            <BlogFeaturedImage img={featured_image_url} />
            {/*Parsing content to HTML */}
            <div className="content">{ReactHtmlParser(content)}</div>
        </div>  
          )         
        }
      }


    return (
      <div className="blog-container">{contentManager()}</div>
    );
  }
}