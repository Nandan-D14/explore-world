import { Outlet, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import React from "react";
import "../styles/mainlayout.css";

export default function MainLayout() {
  // Initialize isVisible from localStorage, if it's there. Otherwise, default to true.
  const [isVisible, setIsVisible] = useState(() => {
    const storedVisibility = localStorage.getItem("mainLayoutVisible");
    return storedVisibility !== null ? JSON.parse(storedVisibility) : true;
  });

  // Update localStorage whenever isVisible changes
  useEffect(() => {
    localStorage.setItem("mainLayoutVisible", JSON.stringify(isVisible));
  }, [isVisible]);

  const handleLinkClick = () => {
    setIsVisible(false); // Hide the layout when "Explore" is clicked
  };

  if (!isVisible) {
    return null; // If not visible, render nothing
  }

  return (
    <>
      <div className="mainlayout-maincontainer">
        <div className="mainlayout-container">
          <h1> Hello Everyone !. </h1>
          <h4>
            Welcome To <h2>Explore World</h2>
          </h4>
          <p>We hope you will have a better experience here!</p>

          {/* Link tag with onClick event */}
          <Link to="/" onClick={handleLinkClick}>Explore{"->"}</Link>
        </div>

        {/* Containers */}
        <div className="mailyout-top-container">
          <div className="inner-top-mainlayout all1"></div>
          <div className="inner-top-mainlayout all3"></div>
          <div className="inner-top-mainlayout all2"></div>
          <div className="inner-top-mainlayout all4"></div>
        </div>

        <div className="mailyout-left-container">
          <div className="inner-top-mainlayout all1"></div>
          <div className="inner-top-mainlayout all2"></div>
          <div className="inner-top-mainlayout all3"></div>
        </div>

        <div className="mailyout-right-container">
          <div className="inner-top-mainlayout all1"></div>
          <div className="inner-top-mainlayout all2"></div>
          <div className="inner-top-mainlayout all3"></div>
        </div>

        <div className="mailyout-bottom-container">
          <div className="inner-top-mainlayout all1"></div>
          <div className="inner-top-mainlayout all2"></div>
          <div className="inner-top-mainlayout all3"></div>
          <div className="inner-top-mainlayout all4"></div>
        </div>
      </div>

      <Outlet />
    </>
  );
}
