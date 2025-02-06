import React from 'react'

export const Footer = () => {
    return (
      <div id="sticky-footer">
        <div class="wrap">
          <footer style={{ 
            height: '100px', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            textAlign: 'center', 
            padding: '10px', 
            background: '#333', 
            color: '#fff', 
            position: 'absolute', 
            bottom: '0', 
            left: '0', 
            width: '100%' 
          }}>
            <p>&copy; {new Date().getFullYear()} HUN SRT. All rights reserved.</p>
          </footer>
        </div>
      </div>
    );
  };
  