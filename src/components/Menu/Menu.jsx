import React, { useState } from 'react';
import MenuImage from '../../assets/Modals/menu.webp';
import CateringPDF from '../../assets/Modals/catering.pdf';
import BrunchPDF from '../../assets/Modals/brunch.pdf';
import DinnerPDF from '../../assets/Modals/dinner.pdf';
import LunchPDF from '../../assets/Modals/lunch.pdf';
import ClipLoader from 'react-spinners/ClipLoader';

const links = {
  Option1: BrunchPDF,
  Option2: LunchPDF,
  Option3: DinnerPDF,
  Option4: CateringPDF,
};

const Menu = () => {
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
        src={MenuImage}
        alt="Menu"
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
      />

      {/* First Option */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '25%',
          height: '100%',
          cursor: 'pointer',
        }}
        onClick={() => handleImageClick(links.Option1)}
      />

      {/* Second Option */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '25%',
          width: '25%',
          height: '100%',
          cursor: 'pointer',
        }}
        onClick={() => handleImageClick(links.Option2)}
      />

      {/* Third Option */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          width: '25%',
          height: '100%',
          cursor: 'pointer',
        }}
        onClick={() => handleImageClick(links.Option3)}
      />

      {/* Fourth Option */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '75%',
          width: '25%',
          height: '100%',
          cursor: 'pointer',
        }}
        onClick={() => handleImageClick(links.Option4)}
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

export default Menu;
