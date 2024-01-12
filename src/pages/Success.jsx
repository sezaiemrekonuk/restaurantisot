import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import QRCode from 'react-qr-code';
import { v4 as uuidv4 } from 'uuid';
import { doc, setDoc } from "firebase/firestore"; 
import { db } from "../firebase";

const Success = () => {
  const navigate = useNavigate();
  const [qr, setQr] = useState("");
  const [uid, setUid] = useState("");
  const [open, setOpen] = useState(false);
  const  [searchParams] = useSearchParams();
  const [id, setId] = useState();
 

  useEffect(() => {
    const uniqueId = uuidv4();
    setUid(uniqueId);

  

    const id = searchParams.get("session_id");
    console.log(id);
    if(!id){
      navigate("/")
      setId(false)
    }
    setId(id);
  }, []);

  const generateQrCode = (uid) => {
    const prevId =  JSON.parse(localStorage.getItem("id"))

    if(id === prevId){
      navigate("/");
    }

    localStorage.setItem("id", JSON.stringify(id))
    console.log('QR Code Data:', uid);
    setQr(uid);
    addFirebase(uid);
  };

  const addFirebase = async (val) => {
    await setDoc(doc(db, "Giftcards", "QR-3"), {
      value: val
    });
  }

  const handleClickButton = () => {
    navigate('/');
  };

  const handleQrButton = () => {
    generateQrCode(uid);
    setOpen(true);
  }


  return (
    (id && (    <div className="flex items-center justify-center h-screen bg-green-200">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-green-800 mb-4">Payment Successful!</h1>
      <p className="text-lg text-gray-700">Thank you for your purchase.</p>
      {open && <QRCode value={qr} />}
      <button onClick={handleClickButton} style={{ backgroundColor: '#63C9FA', color: 'white' }}>
        Go to homepage
      </button>
      {!open && (
        <button onClick={handleQrButton} style={{ backgroundColor: '#63C9FA', color: 'white' }}>
          Get my qr
        </button>
      )}
    </div>
  </div>))

  );
};

export default Success;
