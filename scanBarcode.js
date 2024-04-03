import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const ScanBarcodePage = () => {
  const router = useRouter();

  useEffect(() => {
    const handleBarcodeScan = async (event) => {
      const barcode = event.data;
      if (barcode === '/personalInfo') {
        router.push('/personalInfo');
      }
    };

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          const video = document.getElementById('video');
          video.srcObject = stream;
          const barcodeDetector = new BarcodeDetector();
          barcodeDetector.addEventListener('barcodefound', handleBarcodeScan);
          barcodeDetector.start({ video: video });
        })
        .catch((error) => {
          console.error('Error accessing the camera:', error);
        });
    } else {
      console.error('getUserMedia is not supported');
    }

    return () => {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const video = document.getElementById('video');
        video.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div>
      <h1>Scan Barcode</h1>
      <video id="video" autoPlay playsInline />
    </div>
  );
};

export default ScanBarcodePage;
