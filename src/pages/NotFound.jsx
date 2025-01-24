import React from 'react';
import { NavLink } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div style={styles.container}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 250" style={styles.svg}>
        <defs>
          <filter id="glow">
            <feGaussianBlur className="blur" result="coloredBlur" stdDeviation="4"></feGaussianBlur>
            <feMerge> 
              <feMergeNode in="coloredBlur"></feMergeNode>
              <feMergeNode in="SourceGraphic"></feMergeNode>
            </feMerge>
          </filter>
        </defs>
        <g>
          <path
            d="M195.7 232.67h-37.1V149.7H27.76c-2.64 0-5.1-.5-7.36-1.49-2.27-.99-4.23-2.31-5.88-3.96-1.65-1.65-2.95-3.61-3.89-5.88s-1.42-4.67-1.42-7.22V29.62h36.82v82.98H158.6V29.62h37.1v203.05z"
            style={styles.path}
          />
          <path
            d="M470.69 147.71c0 8.31-1.06 16.17-3.19 23.58-2.12 7.41-5.12 14.28-8.99 20.6-3.87 6.33-8.45 11.99-13.74 16.99-5.29 5-11.07 9.28-17.35 12.81a85.146 85.146 0 0 1-20.04 8.14 83.637 83.637 0 0 1-21.67 2.83H319.3c-7.46 0-14.73-.94-21.81-2.83-7.08-1.89-13.76-4.6-20.04-8.14a88.292 88.292 0 0 1-17.35-12.81c-5.29-5-9.84-10.67-13.66-16.99-3.82-6.32-6.8-13.19-8.92-20.6-2.12-7.41-3.19-15.27-3.19-23.58v-33.13c0-12.46 2.34-23.88 7.01-34.27 4.67-10.38 10.92-19.33 18.76-26.83 7.83-7.5 16.87-13.36 27.12-17.56 10.24-4.2 20.93-6.3 32.07-6.3h66.41c7.36 0 14.58.94 21.67 2.83 7.08 1.89 13.76 4.6 20.04 8.14a88.292 88.292 0 0 1 17.35 12.81c5.29 5 9.86 10.67 13.74 16.99 3.87 6.33 6.87 13.19 8.99 20.6 2.13 7.41 3.19 15.27 3.19 23.58v33.14z"
            style={styles.path}
          />
          <path
            d="M688.33 232.67h-37.1V149.7H520.39c-2.64 0-5.1-.5-7.36-1.49-2.27-.99-4.23-2.31-5.88-3.96-1.65-1.65-2.95-3.61-3.89-5.88s-1.42-4.67-1.42-7.22V29.62h36.82v82.98h112.57V29.62h37.1v203.05z"
            style={styles.path}
          />
        </g>
      </svg>

      
    
      <NavLink style={styles.heading} className="btn btn-ghost text-xl" to="/futamok">Home</NavLink>
      

      {/* Inject CSS for animations */}
      <style>
        {`
          @keyframes fadeInText {
            0% {
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }

          @keyframes flicker4 {
            0% {
              opacity: 1;
            }
            5% {
              opacity: 0.4;
            }
            10% {
              opacity: 1;
            }
            20% {
              opacity: 0.3;
            }
            25% {
              opacity: 1;
            }
            30% {
              opacity: 0.5;
            }
            35% {
              opacity: 1;
            }
            100% {
              opacity: 1;
            }
          }

          @keyframes hueRotate {
            0% {
              filter: hue-rotate(0deg);
            }
            100% {
              filter: hue-rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
};

const styles = {
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    margin: 0,
    background: 'radial-gradient(circle, #240015 0%, #301934 100%)',
    overflow: 'hidden',
  },
  svg: {
    position: 'absolute',
    height: 'auto',
    width: '600px',
    maxWidth: '100%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  path: {
    stroke: '#ff005d',
    strokeWidth: '3px',
    fill: 'transparent',
    filter: 'url(#glow)',
  },
  heading: {
    
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: '150px',
    fontSize: '32px',
    textTransform: 'uppercase',
    transform: 'translate(-50%, -50%)',
    display: 'block',
    color: 'red',
    fontWeight: 300,
    fontFamily: 'Audiowide',
    textShadow: '0px 0px 4px green',
    animation: 'fadeInText 3s ease-in 3.5s forwards, flicker4 5s linear 7.5s infinite, hueRotate 6s ease-in-out 3s infinite',
  },
};
