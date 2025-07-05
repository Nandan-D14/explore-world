import React from 'react'
import '../styles/About.css'
import Footer from "./content/Footer.jsx";

const AboutUs = () => {

  return (<>
    <div className="about-us-outer-container">
      <div className="about-us-content">
        <img
          src="https://via.placeholder.com/150"
          alt="About Us"
          className="about-us-image"
        />
        <div className="about-us-text">
          <h2 className="about-us-heading">Nandan D</h2> <pre>Developer</pre>
          <p className="about-us-description">
            We are a passionate team of developers dedicated to creating innovative solutions. Our mission is to make technology accessible and enjoyable for everyone. With years of experience in the tech industry, we strive to make a positive impact on the world through our work.
          </p>
          <button className="about-us-button">Learn More</button>
        </div>
      </div>
      <div className="about-us-content">
        <img
          src="https://via.placeholder.com/150"
          alt="About Us"
          className="about-us-image"
        />
        <div className="about-us-text">
          <h2 className="about-us-heading">Sharath Gowda GR</h2> <pre>Developer</pre>
         
          <p className="about-us-description">
            We are a passionate team of developers dedicated to creating innovative solutions. Our mission is to make technology accessible and enjoyable for everyone. With years of experience in the tech industry, we strive to make a positive impact on the world through our work.
          </p>
          <button className="about-us-button">Learn More</button>
        </div>
      </div>
      <div className="about-us-content">
        <img
          src="https://via.placeholder.com/150"
          alt="About Us"
          className="about-us-image"
        />
        <div className="about-us-text">
          <h2 className="about-us-heading">N Mahendra</h2> <pre>Developer</pre>
          <p className="about-us-description">
            We are a passionate team of developers dedicated to creating innovative solutions. Our mission is to make technology accessible and enjoyable for everyone. With years of experience in the tech industry, we strive to make a positive impact on the world through our work.
          </p>
          <button className="about-us-button">Learn More</button>
        </div>
      </div>
    </div>
    
    <Footer />
  </>);
};

export default AboutUs;