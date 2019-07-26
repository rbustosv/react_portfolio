import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import NavigationContainer from "./navigation/navigation-container";
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import Blog from "./pages/blog";
import BlogDetail from "./pages/blog-detail";
import PortfolioManager from "./pages/portfolio-manager";
import PortfolioDetail from "./portfolio/portfolio-details";
import Auth from "./pages/auth";
import NoMatch from "./pages/no-match";
import Icons from "../helpers/icons";



export default class App extends Component {
  constructor(props){
    super(props);
    Icons();
    this.state = {
      loggedInStatus: "NOT_LOGGED_IN"
    };
    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
    this.handleUnSuccessfulLogin = this.handleUnSuccessfulLogin.bind(this);
    this.handleSuccessfulLogout = this.handleSuccessfulLogout.bind(this);
  }

  handleSuccessfulLogin(){
    this.setState({
      loggedInStatus: "LOGGED_IN"
    })
  }

  handleUnSuccessfulLogin(){
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    })
  }

  handleSuccessfulLogout(){
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    })
  }//Will will pass also this method as a prop in the navigation component (line 89)

  checkLoginStatus(){
    return axios.get("https://api.devcamp.space/logged_in",{ 
      withCredentials: true
    }).then(response => {
      const loggedIn = response.data.logged_in;
      const loggedInStatus = this.state.loggedInStatus;

      //if loggedIn and status LOGGED_IN  => return data
      // if loggedIn and status NOT_LOGGED_IN => update state
      // if not loggedIn and status LOGGED_IN => update state (logOut)

      if (loggedIn && loggedInStatus === "LOGGED_IN") {
        return loggedIn;
      } else if (loggedIn && loggedInStatus === "NOT_LOGGED_IN") {
        this.setState({
          loggedInStatus: "LOGGED_IN"//for new windows tab so this keeps user conected
        });
      } else if (!loggedIn && loggedInStatus === "LOGGED_IN") {
        this.setState({
          loggedInStatus: "NOT_LOGGED_IN"
        });
      }
    })
    .catch(error => {
      console.log("Error", error);

    });
  }

  componentDidMount(){
    this.checkLoginStatus();
  }

  authorizedPages(){
    return [
            <Route key="portfolio-manager" path="/portfolio-manager" component={PortfolioManager} />
           ];
    //we use an array so we can have many pages hidden or protected
    //react needs to keep track of elememnt in an array as unique key
  }

  render() {
    return (
      <div className='container'>
        <Router>
          <div>
            <NavigationContainer 
              loggedInStatus={this.state.loggedInStatus}
              handleSuccessfulLogout={this.handleSuccessfulLogout}
            />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route 
                path="/auth" 
                render={props => (
                  <Auth
                   {...props}//allows to add more props and not overwriting them
                   handleSuccessfulLogin = {this.handleSuccessfulLogin}
                   handleUnSuccessfulLogin = {this.handleUnSuccessfulLogin}
                   />
                )} 
              />
              <Route path="/about-me" component={About} />
              <Route path="/contact" component={Contact} />

              <Route path="/blog" 
              render={props => (
                <Blog {...props} loggedInStatus={this.state.loggedInStatus}/>
              )}
              />
              <Route path="/b/:slug" 
              render={props => (
                <BlogDetail {...props} loggedInStatus={this.state.loggedInStatus}/>
              ) }/>
              {this.state.loggedInStatus === "LOGGED_IN" ? this.authorizedPages() : null}
              <Route exact path="/portfolio/:slug" component={PortfolioDetail} />
              <Route component={NoMatch}/>
            </Switch>       
          </div>
        </Router>
      </div>
    );
  }
}
