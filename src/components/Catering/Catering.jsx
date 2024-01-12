import React, { useState, useEffect } from 'react';
import Back from '../../assets/Modals/background.webp';
import GrubhubImage from '../../assets/Modals/grubhub.webp';
import UberImage from '../../assets/Modals/uber.webp';
import DoordashImage from '../../assets/Modals/doordash.webp';
import ClipLoader from 'react-spinners/ClipLoader';

const links = {
  Grubhub: 'https://www.grubhub.com/restaurant/isot-mediterranean-cuisine-622-s-6th-st-philadelphia/3270772',
  Uber: 'https://www.ubereats.com/store/isot/O83Szc_NS5WZnEesyznDQA',
  Doordash: 'https://www.doordash.com/store/isot-mediterranean-cuisine-philadelphia-23197311/',
};

const images = {
  Grubhub: GrubhubImage,
  Uber: UberImage,
  Doordash: DoordashImage,
};

const Order = () => {
  const [loadedImages, setLoadedImages] = useState(0);
  const totalImages = Object.keys(links).length;

  useEffect(() => {
    if (loadedImages === totalImages) {
      // All images are loaded
      // You can add any additional logic here if needed
      console.log('All images are loaded!');
    }
  }, [loadedImages, totalImages]);

  const handleImageLoad = () => {
    setLoadedImages((prev) => prev + 1);
  };

  const handleImageClick = (link) => {
    window.open(link, '_blank');
  };

  return (
    <div style={{ background: `url(${Back}) center/cover`, minHeight: '600px', position: 'relative', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', justifyContent: 'center' }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {Object.entries(links).map(([key, link]) => (
            <a key={key} href={link} target="_blank" rel="noopener noreferrer" onClick={() => handleImageClick(link)}>
              <div style={{ position: 'relative', width: '100px', height: '100px' }}>
                <ClipLoader size={30} color={'#ffffff'} loading={loadedImages < totalImages} />
                <img
                  loading="lazy"
                  onLoad={handleImageLoad}
                  src={images[key]}
                  alt={`Image ${key}`}
                  style={{ width: '100px', height: '100px', marginRight: '20px', cursor: 'pointer', opacity: loadedImages === totalImages ? 1 : 0 }}
                />
              </div>
            </a>
          ))}
        </div>
        <p style={{ fontWeight: 'bold', WebkitTextStroke: '1px black', marginTop: '20px', color: 'white', textShadow: '1px 1px 1px black', fontSize: '30px' }}>+1 267-457-3622</p>
      </div>
    </div>
  );
};

export default Order;
