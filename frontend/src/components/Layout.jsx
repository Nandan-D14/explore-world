import React, { useEffect, useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import "../styles/layout.css";

function Layout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleHeaderClick = () => {
    window.location.reload();
  };

  return (
    <>
      <header className="header">
        <span>
          <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 6H6m12 4H6m12 4H6m12 4H6" />
          </svg>

          <h1 className="logo" onClick={handleHeaderClick}>Explore World</h1>
        </span>
        <nav>
          <ul className="nav-list">
            <li>
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li>
              <Link className="nav-link" to="/blogs">Blogs</Link>
            </li>
            <li>
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>
            <li>
              <Link className="nav-link" to="/aboutus">About Us</Link>
            </li>
            {isLoggedIn ? (
              <>
                <li>
                  <Link className="nav-link" to="/profile">Profile</Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="logout-button">Logout</button>
                </li>
              </>
            ) : (
              <li>
                <Link className="nav-link sl" to="/signup">Login / Signup</Link>
              </li>
            )}
          </ul>
        </nav>
      </header>
      <main className="layout-container">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;