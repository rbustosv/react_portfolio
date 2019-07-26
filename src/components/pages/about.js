import React from "react";
import profilePicture from "../../../static/assets/images/bio/headshot.jpg"

export default function() {
  return (
    <div className="content-page-wrapper">
      <div className="left-column"
      style={{
        background: "url(" + profilePicture + ") no-repeat",
        backgroundSize: "cover",//"contain",//
        backgroundPosition: "center",
        marginLeft:"10px",
        marginBottom: "10px"
      }}/>
      <div className="right-column">
      <p>I am a systems engineer with experience in different areas of IT, such as infrastructure, support, and software development which have increased my professional knowledge and skills. 
      I have a passion for web development, especially HTML, CSS, JQuery, JavaScript, Python.
      I consider challenges as essential elements for personal growth.</p>
      <p>Ingeniera de sistemas con mención en telemática.
      Mi experiencia laboral en diversas áreas de TI, como infraestructura, soporte y desarrollo me ha permitido ampliar mis conocimientos y destrezas en el ámbito profesional. 
      Mi fascinación, todo lo relacionado a desarrollo web. HTML, CSS, JavaScript, Python, JQuery.
      Considero a los retos o desafíos elementos esenciales para el desarrollo personal y profesional.
      </p>
      </div>
    </div>
  );
}