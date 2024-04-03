import React from 'react';
import QRCode from 'qrcode.react';

const GenerateQRPage = () => {
  const personalInfoUrl = '/personalInfo';

  return (
    <div>
      <h1>Generate QR Code</h1>
      <QRCode value={personalInfoUrl} />
      <p>Scan this QR code to view personal information</p>
    </div>
  );
};

export default GenerateQRPage;
