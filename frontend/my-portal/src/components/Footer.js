import React from 'react';

const Footer = () => {
  return (
    <footer style={{ marginTop: '50px', padding: '20px', backgroundColor: '#f0f0f0', textAlign: 'center' }}>
      <p>&copy; {new Date().getFullYear()} MyPortal. All rights reserved.</p>
    </footer>
  );
};

export default Footer;