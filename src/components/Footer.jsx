import React from 'react'

export const Footer = () => {
    return (
      <footer style={{ textAlign: "center", padding: "10px", background: "#333", color: "#fff" }}>
        <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
      </footer>
    );
  };

