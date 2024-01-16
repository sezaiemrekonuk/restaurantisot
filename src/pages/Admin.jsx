import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const Admin = () => {
    const {user2} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
            if(!localStorage.getItem("user")){
                navigate("/")
            }
      }, []);
    

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

        <ul className="space-y-2">
          <li>
            <Link to="/scan" className="text-blue-500 hover:underline">
              Scan QR
            </Link>
          </li>
          {/* Add more list elements for the admin dashboard */}
          <li>
            <Link to="/campaign" className="text-blue-500 hover:underline">
              Edit campaigns
            </Link>
          </li>
          <li>
            <Link to="/press" className="text-blue-500 hover:underline">
              Edit Press
            </Link>
          </li>
          {/* Add more list elements as needed */}
        </ul>
      </div>
    </div>
  );
};

export default Admin;
