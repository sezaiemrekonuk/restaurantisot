import React, { useState, useEffect, useContext } from 'react';
import Modal from 'react-modal';
import AboutImage from '../../assets/Modals/about.webp';
import Yelp from '../../assets/Modals/yelp.webp';
import Catering from '../../assets/Modals/ez.webp';
import GiftCards from "../../assets/Modals/giftcard.webp";
import Contact from "../../assets/Modals/contact.webp";
import Order from '../Catering/Catering.jsx';
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from 'react-router-dom';

const MenuItemModal = ({ isOpen, onRequestClose, selectedMenuItem}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [contentWidth, setContentWidth] = useState('35rem');
  const [contentHeight, setContentHeight] = useState("40rem");
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageKey, setImageKey] = useState(0); 

const navigate = useNavigate();


  useEffect(() => {
    const handleResize = () => {
      setContentWidth(window.innerWidth < 560 ? '20rem' : '35rem');
      setContentHeight(window.innerWidth < 560 ? '30rem' : "40rem");
    };

    // Initial call to set content width based on the screen size
    handleResize();

    // Attach the event listener to update content width on window resize
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const navigateToPayment = (()=> {
    navigate("/payments")
  })

  const getImageForMenuItem = () => {
    if (selectedMenuItem) {
      switch (selectedMenuItem.name) {
        case 'About Chef Fatih':
          return { src: AboutImage, key: 'about' };
        case 'Reservations':
          return { src: Yelp, key: 'reservations' };
        case 'Gift Cards':
          return navigateToPayment();
        case 'Contact':
          return { src: Contact, key: 'contact' };
        case 'Catering':
          return { src: Catering, key: 'catering' };
        default:
          return null;
      }
    }
    return null;
  };
  

  const handleLinkClick = (event) => {
    if (selectedMenuItem.name === "Reservations" && selectedMenuItem.link) {
      const { offsetX, target } = event.nativeEvent;
      const isLeftHalf = offsetX < target.width / 2;

      const url = isLeftHalf
        ? "https://www.yelp.com/biz/isot-mediterranean-cuisine-philadelphia-3"
        : "https://www.opentable.com/r/isot-mediterranean-cuisine-philadelphia";

      window.open(url, '_blank');
    } else {
      if (selectedMenuItem.link) {
        window.open(selectedMenuItem.link, '_blank');
      }
    }
  };

  useEffect(() => {
    // Update the imageKey whenever selectedMenuItem changes
    setImageKey((prevKey) => prevKey + 1);
    // Reset imageLoaded to false when selectedMenuItem changes
    setImageLoaded(false);
  }, [selectedMenuItem]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Modal"
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          width: contentWidth,
          height: '40rem',
          overflow: 'auto',
          padding: 'none',
          paddingTop: 'none',
          border: 'none',
          background: 'none',
          ...(selectedMenuItem?.name === "About Chef Fatih" && { marginTop: "2rem" }),
        },
      }}
    >
      {selectedMenuItem !== null && (
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            cursor: selectedMenuItem.link ? 'pointer' : 'default',
          }}
        >
          {selectedMenuItem.name === "Order" ? <Order /> : (
            <>
              {getImageForMenuItem() && (
                <img
                key={imageKey + getImageForMenuItem().key} 
                 onLoad={handleImageLoad}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  onClick={handleLinkClick}
                  src={getImageForMenuItem().src}
                  alt={selectedMenuItem.name}
                  style={{ width: "auto", minHeight: '600px', objectFit: 'contain' }}
                  loading="lazy"
                />
              )}
              {selectedMenuItem.name !== "Order" && isHovered && selectedMenuItem.link && (
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
                  Go to {selectedMenuItem.name} page
                </div>
              )}

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
            </>
          )}
        </div>
      )}
    </Modal>
  );
};

export default MenuItemModal;
