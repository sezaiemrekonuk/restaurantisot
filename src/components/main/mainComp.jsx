import React, { useEffect, useState, useContext } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import Navbar from "../Navbar/Navbar.jsx"
import "../../styles/tailwind.css";
import '../../style.css';





const MainComp = () => {
  const [isAppReady, setIsAppReady] = useState(false);
  const [loading, setLoading] = useState(false);


  return (
    <>
      {!isAppReady ? (
 <div className="bg-white dark:bg-gray-900 dark:text-white duration-200">
 <Navbar/>
 
</div>

      ) : (
        <div className="bg-white dark:bg-gray-900 dark:text-white duration-200">
          <Navbar/>
        </div>
      )}
    </>
  );
};

export default MainComp;
