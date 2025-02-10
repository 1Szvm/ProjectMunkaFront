import React from 'react';

export const Footer = () => {
  return (
    <div id="sticky-footer">
      <div className="wrap">
        <footer
          style={{
            height: '60px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '20px',
            background: '#0a0a0a', // Dark black background
            color: '#fff',
            position: 'fixed',
            bottom: '0',
            left: '0',
            width: '100%',
            boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.5)', // Slight shadow for separation
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: '14px',
              fontFamily: 'Arial, sans-serif',
              letterSpacing: '0.5px',
              transition: 'color 0.3s ease',
            }}
            onMouseOver={(e) => e.target.style.color = '#ff7f50'} // Hover effect on text
            onMouseOut={(e) => e.target.style.color = '#fff'}
          >
            &copy; {new Date().getFullYear()} HUN SRT. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};
