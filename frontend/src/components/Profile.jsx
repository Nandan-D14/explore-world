import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../styles/profile.css';
import Loader from "./content/Loder";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");

      try {
        const response = await axios.get("http://localhost:4000/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        alert("Session expired. Please login again.");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [navigate]);

  return loading ? (
    <Loader />
  ) : user ? (
    <div className="profile-outer-continer">
      <div className="profile-container">
        <div className="profile-header">
          <h1>My Profile</h1>
        </div>
        <div className="profile-img-container">
        <img
          src="https://via.placeholder.com/150"
          alt="About Us"
          className="profile-img"
        />
        </div>
        <div className="profile-details">
        <h3><strong>Name:</strong> {user.username.toUpperCase()}</h3>
          <h3><strong>Email :  </strong> {user.email}</h3>
          {/* <h2>Your Posts</h2>
          <ul>
            {user.posts && user.posts.length > 0 ? (
              user.posts.map(post => (
                <li key={post.id}>{post.title}</li>
              ))
            ) : (
              <p>No posts available.</p>
            )}
          </ul> */}
        </div>
      </div>
    </div>
  ) : (
    <p className="error">Error loading profile. Please try again.</p>
  );
}

export default Profile;