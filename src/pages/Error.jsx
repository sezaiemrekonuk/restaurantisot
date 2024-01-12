import React from 'react';
import { useNavigate } from 'react-router-dom';

const Cancel = () => {

    const navigate = useNavigate();

    const handleClickButton = () => {
        navigate("/")
    }
  return (
    <div className="flex items-center justify-center h-screen bg-red-200">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-800 mb-4">Payment Canceled</h1>
        <p className="text-lg text-gray-700">Your payment has been canceled.</p>
        <button onClick={handleClickButton} style={{backgroundColor:"#D63024", color:"white"}}>Go to homepage</button>
      </div>
    </div>
  );
};

export default Cancel;
