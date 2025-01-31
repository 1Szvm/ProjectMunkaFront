import React from 'react'

export const Footer = () => {
    return (
      <footer style={{ height:'120px', textAlign: "center",justifyContent:'center', padding: "10px", background: "#333", color: "#fff" }}>
        <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
      </footer>
    );
  };

