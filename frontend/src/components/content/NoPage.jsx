import React from "react";

const NoPage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404</h1>
      <p style={styles.message}>Oops! The page you are looking for does not exist.</p>
      <a href="/" style={styles.link}>Go Back Home</a>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Arial:wght@400;700&display=swap');

        body {
          font-family: 'Arial', sans-serif;
        }
      `}</style>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: '#03001C',
    color: '#343a40',
    textAlign: 'center',
    zIndex: 1000,
    position:"absolute",
    top:'0px',
    left:'0px'
  },
  title: {
    fontSize: '6rem',
    fontWeight: 'bold',
    margin: 0,
    color: '#white', 
  },
  message: {
    fontSize: '1.5rem',
    margin: '20px 0',
    color: 'white',
  },
  link: {
    padding: '10px 20px',
    backgroundColor: '#007bff', 
    color: 'white',
    textDecoration: 'none',
    borderRadius: '5px',
    transition: 'background-color 0.3s',
  },
};

export default NoPage;
