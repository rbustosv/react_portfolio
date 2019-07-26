import React, { Component } from "react";
import axios from "axios";

import PortfolioSidebarList from "../portfolio/portfolio-sidebar-list";
import PortfolioForm from "../portfolio/portfolio-form";

export default class PortfolioManager extends Component {
    constructor(){
        super();

        this.state = {
            portfolioItems: [],
            portfolioToEdit: {}
        };

        this.handleNewFormSubmission = this.handleNewFormSubmission.bind(this);
        this.handleEditFormSubmission = this.handleEditFormSubmission.bind(this);
        this.handleFormSubmissionError = this.handleFormSubmissionError.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.clearPortfolioToEdit = this.clearPortfolioToEdit.bind(this);
    }

  clearPortfolioToEdit(){
      this.setState({
          portfolioToEdit: {}
      });
  }

  handleEditClick(portfolioItem){
      this.setState({
         portfolioToEdit: portfolioItem //assigning my array record in an object variable
      })
  }

  handleDeleteClick(portfolioItem){
    axios.delete(`https://api.devcamp.space/portfolio/portfolio_items/${portfolioItem.id}`,
    { withCredentials: true }
  ).then(response => {
      this.setState({
          portfolioItems: this.state.portfolioItems.filter(item =>{
              return item.id !== portfolioItem.id;//return all records except the one that's deleted
          })
      });
      return response.data;
  }).catch(error => {
      console.log("handleDeleteClick error", error);
  })
  }

  handleNewFormSubmission(portfolioItem){
      //ToDo
      //update the portfolioItems state
      //and add the portfolioItem to the list
      this.setState({
          portfolioItems: [portfolioItem].concat(this.state.portfolioItems)
          //this send to the top of the array a new record created
      })

  }  

  handleEditFormSubmission(){
    this.getPortfolioItems();
  }

  handleFormSubmissionError(error) {
    console.log("handleFormSubmissionError error", error);
  }


  getPortfolioItems(){
      //'?order_by=created_at&direction=desc' at the end of the api link 
      //allows me to show records in descendant (This is specific to this API)
      axios.get("https://rbustosv.devcamp.space/portfolio/portfolio_items?order_by=created_at&direction=desc", { 
        withCredentials: true
      }).then(response => {
          this.setState({
              portfolioItems: [...response.data.portfolio_items]//populating our arrays with our data
          })
      }).catch(error => {
          console.log("error in getPortfolioItems", error);
      })
  } 
  
  componentDidMount(){
      this.getPortfolioItems();
  }


  render() {
    return (
        <div className="portfolio-manager-wrapper">
        <div className="left-column">
            <PortfolioForm 
             handleNewFormSubmission={this.handleNewFormSubmission}
             handleEditFormSubmission={this.handleEditFormSubmission}
             handleFormSubmissionError={this.handleFormSubmissionError}
             clearPortfolioToEdit={this.clearPortfolioToEdit}
             portfolioToEdit={this.state.portfolioToEdit}
            />
        </div>

        <div className="right-column">
            <PortfolioSidebarList 
            /*giving acces to the function but not invoking it*/
            handleDeleteClick={this.handleDeleteClick}
            /*Passing props called data*/
            data={this.state.portfolioItems}
            handleEditClick={this.handleEditClick}
            />    
        </div>
        </div>
    );
  }
}