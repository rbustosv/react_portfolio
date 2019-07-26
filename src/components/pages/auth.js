import React, { Component } from "react";
import Login from "../auth/login";
import loginImg from "../../../static/assets/images/auth/contact.jpg"
//I can name it loginImg or any name but the path has to be exact


export default class Auth extends Component {
    constructor(props) {
        super(props);
        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
        this.handleUnSuccessfulAuth = this.handleUnSuccessfulAuth.bind(this);
    }

    handleSuccessfulAuth(){
        this.props.handleSuccessfulLogin();
        this.props.history.push("/");//redirecting to the route path
    }

    handleUnSuccessfulAuth(){
        this.props.handleUnSuccessfulLogin();
    }

    render() {
        return (
        <div className="auth-page-wrapper">
            <div className="left-column"
            style={{
                backgroundImage: `url(${loginImg})`
            }}

            />
            <div className="right-column">
                <Login 
                handleSuccessfulAuth={this.handleSuccessfulAuth}
                handleUnSuccessfulAuth = {this.handleUnSuccessfulAuth}
                />
            </div>

        </div>
        );
    }
}