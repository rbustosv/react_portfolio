import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import BlogItem from "../blog/blog-item";
import BlogModal from "../modals/blog-modals";

class Blog extends Component {
  constructor(){
    super();

    this.state = {
      blogItems: [],
      totalCount: 0,
      currentPage: 0,
      isLoading: true,
      blogModalIsOpen: false
    }

    this.getBlogItems =  this.getBlogItems.bind(this);
    this.onScroll = this.onScroll.bind(this);
    window.addEventListener("scroll", this.onScroll, false);
    this.handleNewBlogClick = this.handleNewBlogClick.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleSuccessfulNewBlogSubmision = this.handleSuccessfulNewBlogSubmission.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  handleDeleteClick(blog) {
    axios
      .delete(
        `https://api.devcamp.space/portfolio/portfolio_blogs/${blog.id}`,
        { withCredentials: true }
      )
      .then(response => {
        this.setState({
          blogItems: this.state.blogItems.filter(blogItem => {
            return blog.id != blogItem.id
          })
        })
        return response.data;
      })
      .catch(error => {
        console.log("delete blog error", error);
      });
  }

  handleSuccessfulNewBlogSubmission(blog) {
    this.setState({
      blogModalIsOpen: false,//closing Modal form and querying the records, last created on the top
      blogItems: [blog].concat(this.state.blogItems)
    });
  }

  handleModalClose(){
    this.setState({
      blogModalIsOpen: false
    });

  }
  handleNewBlogClick() {
    this.setState({
      blogModalIsOpen: true//only when user clicks new blog this new react modal will show a reactModal
    });
  }

  onScroll(){

      if (this.state.isLoading || this.state.blogItems.length === this.state.totalCount) {
        return; //if the page is still loading or there is not more accounts skip the next statement
      }
      
      /*When the user is close to the bottom of the document, get or retrieve more posts.*/
      if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight ){
        this.getBlogItems();
      }
  }

  getBlogItems() {
    this.setState({
      currentPage: this.state.currentPage +1
    });
    axios
      .get(`https://rbustosv.devcamp.space/portfolio/portfolio_blogs?page=${this.state.currentPage}`, {
        withCredentials: true
      }).then(response => {
        //console.log("get response data", response.data);
        this.setState({
          blogItems: this.state.blogItems.concat(response.data.portfolio_blogs),//getting records from api and asigning into our array
          totalCount: response.data.meta.total_records,
          isLoading: false
        });
      }).catch(error => {
        console.log("getBlogItems error", error);
      });
  }

  componentWillMount() {
    this.getBlogItems();
  }


  componentWillUnmount(){
    window.removeEventListener("scroll", this.onScroll, false);
    /*if we left the blog page and sroll down another page the component scroll is
    unmounted so doesnot bring the records*/
  }

  render(){

    const blogRecords = this.state.blogItems.map(blogItem => {
      if (this.props.loggedInStatus === "LOGGED_IN") {
        return (
        <div  key={blogItem.id} className="admin-blog-wrapper">
          <BlogItem  blogItem={blogItem} />
          {/*We need to wrap the function in an anonimous fuction so it's
           not executed right away and way for the event "click"*/}
          <a onClick={() => this.handleDeleteClick(blogItem)}>
            <FontAwesomeIcon icon="trash"/>
          </a>
        </div>
        );  
      } else {
      return <BlogItem key={blogItem.id} blogItem={blogItem} />;
      //sending each record blog as prop (blogItem={blogItem})
      }
    });

  return (
    <div className="blog-container">
      <BlogModal 
      handleSuccessfulNewBlogSubmision = {this.handleSuccessfulNewBlogSubmision}
      handleModalClose = {this.handleModalClose}
      modalIsOpen={this.state.blogModalIsOpen}/>
      {this.props.loggedInStatus === "LOGGED_IN" ? (
      <div className="new-blog-link">
        <a onClick={this.handleNewBlogClick}>
          <FontAwesomeIcon icon= "plus-circle"/>
        </a>
      </div>
      ) : null}
      {/*we dont need the reserved word 'this' 
       because the const 'blogRecords' is inside of the render funtion*/}
      <div className="content-container">{blogRecords}</div>
      {this.state.isLoading ? (
      <div className="content-loader">
        <FontAwesomeIcon icon="spinner" spin />
      </div>) : null }
    </div>
  );

}
}

export default Blog;