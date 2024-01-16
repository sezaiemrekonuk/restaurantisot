import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import QRCode from 'react-qr-code';
import { v4 as uuidv4 } from 'uuid';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

const Success = () => {
  const navigate = useNavigate();
  const [qr, setQr] = useState('');
  const [uid, setUid] = useState('');
  const [open, setOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const [id, setId] = useState('');

  useEffect(() => {
    const uniqueId = uuidv4();
    setUid(uniqueId);

    const sessionId = searchParams.get('session_id');
    console.log(sessionId);

    if (!sessionId) {
      navigate('/');
      setId(false);
    }

    // Check if the session_id has changed upon reload
    setId(sessionId);

    const redirected = localStorage.getItem('context');

    if (!redirected) {
      navigate('/');
    }

    // Generate QR code immediately upon mounting
    generateQrCode(uniqueId);
  }, []);

  const generateQrCode = (uid) => {
    const prevId = sessionStorage.getItem('id');

    if (id === prevId) {
      navigate('/');
    }

    sessionStorage.setItem('id', JSON.stringify(id));
    localStorage.removeItem('context');
    console.log('QR Code Data:', uid);
    setQr(uid);
    addFirebase(uid);
  };

  const addFirebase = async (val) => {
    const newDocId = `QR-${uuidv4()}`;
    await setDoc(doc(db, 'Giftcards', newDocId), {
      value: val,
    });
  };
  const handleClickButton = () => {
    navigate('/');
  };

  const handleDownloadQRCode = () => {
    const qrCodeSvg = document.getElementById('qrcode');
    const svgBlob = new Blob([qrCodeSvg.outerHTML], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);
    const downloadLink = document.createElement('a');
    downloadLink.href = svgUrl;
    downloadLink.download = 'qrcode.svg';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    id && (
      <div className="flex items-center justify-center h-screen bg-green-200">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h1 className="text-4xl font-bold text-green-800 mb-4">Payment Successful!</h1>
          <p className="text-lg text-gray-700 mb-4">
            Thank you for your purchase. Please download QR, or just take a screenshot of it for onsite verification
          </p>
          <div className="flex justify-center">
            <QRCode id="qrcode" value={qr} />
          </div>
          <button
            onClick={handleDownloadQRCode}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
          >
            Download QR Code
          </button>
          <button
            onClick={handleClickButton}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 ml-4"
          >
            Go to homepage
          </button>
        </div>
      </div>
    )
  );
};

export default Success;
