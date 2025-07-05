import React from "react";
import './Img.css'
// import Info from "./content/Info";

function Img(props) {
    return (
        <div className="Img-container ">
            <div className='tour_imgs '>
                <a href="https://www.lalbagh.com" target="_blank">
                <img className="place_pic" src={props.imgLink} alt={props.imgName}/></a>
            </div>
            <div className="tour_imgs"><a href="https://www.lalbagh.com" target="_blank">{props.placeName}</a></div>
            <div className="tour_imgs">google ratings</div>
            <div className="tour_imgs"><h5>Garden</h5> </div>
            
        </div>
    )
}

export default Img 