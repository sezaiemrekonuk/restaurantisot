import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase'; // Assuming 'firebase.js' is in the same directory as the component
import { useNavigate } from 'react-router-dom';

const QRScanner = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState('');
  const [showApprovalTick, setShowApprovalTick] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      navigate('/');
    }
  }, []);

  const handleScan = async (data) => {
    if (data) {
      try {
        const cardRef = collection(db, 'Giftcards');
        const q = query(cardRef, where('value', '==', data.text));

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          // Document with the QR code value exists in Firebase
          querySnapshot.forEach((doc) => {
            console.log(doc.id, ' => ', doc.data());
          });
          setResult('found');
          setShowApprovalTick(true);

          // Hide the tick after 3 seconds
          setTimeout(() => {
            setShowApprovalTick(false);
            setResult(null);
          }, 3000);
        } else {
          // No document found
          setResult('not found');
          setShowApprovalTick(true);

          // Hide the cross after 3 seconds
          setTimeout(() => {
            setShowApprovalTick(false);
            setResult(null);
          }, 3000);
        }
      } catch (error) {
        console.error('Error querying Firebase:', error);
        setResult('Error');
      }
    }
  };

  const handleError = (error) => {
    console.error('Error scanning QR code:', error);
    setResult('Error');
  };

  useEffect(() => {
    // Cleanup the result after 5 seconds
    const timer = setTimeout(() => {
      setResult(null);
    }, 5000);

    return () => clearTimeout(timer);
  }, [result]);

  const handleGoBack = () => {
    navigate('/admin'); // Navigate to the admin page
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div
        className="w-3/4 md:w-2/3 lg:w-1/2 bg-white p-8 rounded-md shadow-lg relative"
        style={{ border: '3px solid black', borderRadius: '10px' }}
      >
        {/* <QrReader
          delay={300}
          onError={handleError}
          style={{ width: '100%' }}
          onResult={(data) => handleScan(data)}
          constraints={{
            facingMode: 'environment',
          }}
        /> */}
        {showApprovalTick && (
          <div
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 rounded-md ${result === 'found' ? 'bg-green-500' : 'bg-red-500'
              }`}
          >
            {/* Approval Tick or Cross Icon */}
            {result === 'found' ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6 text-white"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6 text-white"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
            <p className="text-white ml-2">{result === 'found' ? 'Found!' : 'Not Found!'}</p>
          </div>
        )}
        <button
          onClick={handleGoBack}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
          style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)' }}
        >
          Go Back to Admin Page
        </button>
      </div>
    </div>
  );
};

export default QRScanner;
