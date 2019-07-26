import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import contactPagePicture from "../../../static/assets/images/auth/contact.jpg";


export default function() {
  return (
    <div className="content-page-wrapper">
      <div className="left-column"
      style={{
        background: "url(" + contactPagePicture + ") no-repeat",
        backgroundSize: "cover",//"contain",//
        backgroundPosition: "center",
        marginLeft:"10px",
        marginBottom: "10px"
      }}/>
      <div className="right-column">
        <div className="contact-bullet-points">
          <div className="bullet-point-group">
            <div className="icon">
              <FontAwesomeIcon icon="envelope"/>
            </div>
            <div className="text">raisa.bustosv@gmail.com</div>
          </div>
          <div className="bullet-point-group">
            <div className="icon">
              <FontAwesomeIcon icon="map-marked-alt"/>
            </div>
            <div className="text">Orem, UT</div>
          </div>
        </div>
      </div>
    </div>
  );
}