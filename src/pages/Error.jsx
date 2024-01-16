import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Cancel = () => {
  useEffect(() => {
    localStorage.removeItem('context');
    sessionStorage.removeItem('context');
  }, []);

  const navigate = useNavigate();

  const handleClickButton = () => {
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center h-screen bg-red-200">
      <div className="text-center p-8 bg-white rounded-md shadow-lg">
        <h1 className="text-4xl font-bold text-red-800 mb-4">Payment Canceled</h1>
        <p className="text-lg text-gray-700 mb-4">Your payment has been canceled.</p>
        <button
          onClick={handleClickButton}
          className="bg-red-800 text-white px-6 py-2 rounded-md hover:bg-red-600 focus:outline-none"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default Cancel;
