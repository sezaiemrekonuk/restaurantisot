import React, { useState } from 'react';
import PressImage from '../../assets/Modals/press.webp';
import ClipLoader from 'react-spinners/ClipLoader';

const links = {
    option1: "https://www.inquirer.com/philly/food/20150514_Good_Taste_Phillys_own_Turkish_dumpling_delight.html",
    option2: "https://www.inquirer.com/food/drink/philly-coffee-shops-black-indigenous-third-place-20231016.html"
};

const Press = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageClick = (link) => {
    window.open(link, '_blank');
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh'}}>
      {/* Image */}
      <img
        onLoad={handleImageLoad} // Set the onLoad event
        src={PressImage}
        alt="Menu"
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
      />

      {/* First Option */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '50%',
          height: '70%',
          cursor: 'pointer',
        }}
        onClick={() => handleImageClick(links.option1)}
      />

      {/* Second Option */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '50%',
          height: '70%',
          cursor: 'pointer',
        }}
        onClick={() => handleImageClick(links.option2)}
      />

      {/* Loader */}
      {!imageLoaded && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            padding: '10px',
            borderRadius: '5px',
          }}
        >
          <ClipLoader size={30} color={'#ffffff'} loading={!imageLoaded} />
        </div>
      )}
    </div>
  );
};

export default Press;
