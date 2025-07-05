import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import '../../styles/contentStyle/destinylayout.css';
import Footer from "../../components/content/Footer";
import Loader from "./Loder";

function DestinyLayout() {

    const location = useLocation();

    const placesData = location.state?.placeData;
    const [img1, setImg1] = useState(placesData.image1);
    const [img2, setImg2] = useState(img1);

    if (!placesData) {
        return <div><Loader /></div>;
    }
    const handleImageClick = (img) => {
        setImg1(img)
        setImg2(img2)
    }
    return (
        <>
            <div className="destiny-layout">
                <div className="destinylayout-main-container">
                    <div className="destinylayout-header-container">

                        <div className="main-photo-container">
                            <img src={img1} alt="" />
                        </div>
                        <div className="about-photo-container">
                            <p><b>{placesData.placeName}</b></p>
                            <p><b>Address: </b>{placesData.address}</p>
                            <p><b>About: </b>{placesData.about}</p>
                            <p><b>Genuse: </b>{placesData.genuse}</p>
                        </div>

                    </div>

                    <div className="section-container-destinylayout-related-pic">
                        {[placesData.image1, placesData.image2, placesData.image3, placesData.image4, placesData.image5, placesData.image6]
                            .filter((image) => image)
                            .map((image, index) => (
                                <div className="related-pic" key={index}>
                                    <img
                                        src={image}
                                        onClick={() => handleImageClick(image)}
                                        alt={`Related img ${index + 1}`}
                                    />
                                </div>
                            ))}
                    </div>
                    <div className="more-info-about-place-container">
                        <p><b>Know more :</b><br />{placesData.description}</p>
                    </div>
                    {/* <div id="relative-places-h3"> <h3 >You might also like this </h3></div>
                    <div className="section-container-destinylayout">
                        <div className="relative-places-continer">

                        </div>
                        <div className="relative-places-continer">

                        </div>
                        <div className="relative-places-continer">

                        </div>
                        <div className="relative-places-continer">

                        </div>
                        <div className="relative-places-continer">

                        </div>
                        <div className="relative-places-continer">

                        </div>
                        <div className="relative-places-continer">

                        </div>
                        <div className="relative-places-continer">

                        </div>
                        <div className="relative-places-continer">

                        </div>
                        <div className="relative-places-continer">

                        </div>
                    </div> */}

                </div>
            </div>
            <Footer />
        </>
    );
}


export default DestinyLayout;