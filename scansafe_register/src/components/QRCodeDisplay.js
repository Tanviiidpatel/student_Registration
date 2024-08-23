import React from 'react';

const QRCodeDisplay = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Scan the QR Code to Open the Form</h2>
      <img 
        src={`${process.env.PUBLIC_URL}/ngrok-form-qr.png`} 
        alt="QR Code" 
        style={{ width: '300px', height: '300px' }}
      />
    </div>
  );
};

export default QRCodeDisplay;
