import React from "react";
import "./Card.css";

const Card = ({  imgsrc, titel, text,AvatarClick }) => {
  return (
    <div className="card-containerx"
    >
      
      <div className="content2x">
        
        <div className="text-content2x">
          <span className="main-span">{titel}</span>
          <span className="sub-span">{text}</span>
        </div>
      </div>
      <div
        className="profile-picture2x"
       
      >
        
          <img
            src={imgsrc? imgsrc : "/assets/Images/profile.jpg"}
            alt="profile"
    
            className="profile-imgx"
            onClick={AvatarClick}
            style={{cursor :"pointer"}}
          />
       
      
      </div>
     
    </div>
  );
};

export default Card;
