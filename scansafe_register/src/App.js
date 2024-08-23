import React from 'react';
import QRCodeDisplay from './components/QRCodeDisplay';
import Registration from './components/Registration';

function App() {
  return (
    <>
    <h1>Registration Form</h1>
      <Registration/>
      <QRCodeDisplay/>
    </>
  );
}

export default App;
