import React, { useState, useEffect, useContext } from "react";
import Logo from "../../assets/Modals/logo.jpeg";
import Hero from "../../assets/Modals/hero.webp";
import Modal from "react-modal";
import Yelp from '../../assets/Modals/yelp.webp';
import Catering from '../../assets/Modals/ez.webp';
import GiftCards from "../../assets/Modals/giftcard.webp";
import Contact from "../../assets/Modals/contact.webp";
import MenuItemModal from "../Modal/Modal.jsx";
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase.js';
import ImageSlider from "../Footer/Footer.jsx";
import ClipLoader from "react-spinners/ClipLoader";

Modal.setAppElement("#root");

const Menu = [
  { id: 0, name: "About Chef Fatih" },
  { id: 1, name: "Reservations", link: "https://www.yelp.com/biz/isot-mediterranean-cuisine-philadelphia-3" },
  { id: 2, name: "Menu", link: "/#" },
  { id: 3, name: "Catering", link: "https://www.ezcater.com/catering/isot-restaurant-3" },
  { id: 4, name: "Order"},
  { id: 5, name: "Gift Cards" },
  { id: 6, name: "Contact" },
  { id: 7, name: "Press", link: "/#about" },
];

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(true);

  const getDownloadUrl = async (imagePath) => {
    const imageRef = ref(storage, imagePath);
    try {
      const url = await getDownloadURL(imageRef);
      return url;
    } catch (error) {
      console.error('Error getting download URL:', error);
      return null;
    }
  };

  const openModal = (menuId) => {
    setIsModalOpen(true);
    setSelectedMenuItem(Menu[menuId]);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMenuItem(null);
  };
  
  const closeImageModal = () => {
    setIsImageModalOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMenuOpen(false);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchImageUrl = async () => {
      const imagePath = 'images/hero.webp'; // Replace with the actual path of the uploaded image
      const url = await getDownloadUrl(imagePath);
      setImageUrl(url);
    };

    fetchImageUrl();
  }, []);

  return (
    <>
      {!imageUrl ? (
        <div className="flex items-center justify-center h-screen" style={{backgroundColor:"#D63024"}}>
          <ClipLoader size={60} color={'#ffffff'} loading={!imageUrl} />
        </div>
      ) : (
        <>
          <div className={`fixed top-0 left-0 w-full ${isModalOpen && window.innerWidth > 850 ? 'filter blur-md brightness-50' : ''}`} style={{ zIndex: "100", backgroundColor: "#D63024" }}>
            <div className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200" style={{ backgroundColor: "#D63024" }}>
              <div className="container py-3 sm:py-0">
                <div className={`flex justify-between items-center`} style={{justifyContent: window.innerWidth > 850 ? "space-evenly" : "space-between"}}>
                  <div>
                    <a href="#" className="font-bold text-2xl sm:text-3xl flex gap-2" style={{ fontFamily: "Sevillana" }}>
                      <img loading="lazy" src={Logo} alt="Logo" className="w-20" style={{objectFit:"cover", borderRadius:"2rem", marginLeft:"10px"}}/>
                    </a>
                  </div>
                  <div className={`flex  items-center gap-4` }>
                    <ul className={`hidden sm:flex items-center gap-4 list ${window.innerWidth <= 10000 ? 'hidden' : ''}`}>
                      {Menu.map((menu) => (
                        <li key={menu.id} style={{ cursor: "pointer" }}>
                          <a
                            className="relative inline-block py-4 px-4 text-black transition-all duration-300  group"
                            onClick={() => openModal(menu.id)}
                          >
                            <span className="relative" style={{ fontFamily: "Roboto", fontSize: menu.name === "Menu" && "20px" }}>
                              {menu.name}
                              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black transition-all duration-300 transform scale-x-0 origin-left group-hover:scale-x-100"></div>
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="sm-hidden cursor-pointer icon" onClick={toggleMenu} style={{marginRight:"5px"}}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            {isMenuOpen && (
              <ul className={`block absolute top-16 left-0 right-0 bg-white dark:bg-gray-900 dark:text-white`} style={{backgroundColor:"white"}}>
                {Menu.map((menu) => (
                  <li key={menu.id} style={{ cursor: "pointer" }}>
                    <a
                      className="block py-4 px-4 text-black transition-all duration-300 group"
                      onClick={() => {
                        toggleMenu();
                        openModal(menu.id);
                      }}
                    >
                      <span className="relative" style={{ fontFamily: "Roboto" }}>
                        {menu.name}
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black transition-all duration-300 transform scale-x-0 origin-left group-hover:scale-x-100"></div>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="relative min-h-full w-full h-96 sm:h-80 md:h-96 lg:h-[500px] xl:h-[600px] 2xl:h-[700px] mt-10" style={{ backgroundColor: "#D63024" }}>
            <div className="absolute left-8 text-white text-left writing" style={{position:"absolute", top:"10rem", zIndex:"1000"}}>
              <p className="text-4xl sm:text-5xl pristina-font leading-tight">
                <span className="block">We are introducing Turkish hospitality</span>
                <span className="block">to the city of Philadelphia…</span>
              </p>
            </div>
            <img
              src={Hero}
              alt="Hero"
              className="object-cover w-full h-full"
              style={{ height: "50rem" }}
              loading="lazy"
            />
          </div>
          <MenuItemModal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            selectedMenuItem={selectedMenuItem}
            menuItems={Menu}
          />
          <Modal
            isOpen={isImageModalOpen}
            onRequestClose={closeImageModal}
            contentLabel="Image Modal"
            style={{
              overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex:"2000"
              },
              content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
                width: 'auto', // Adjust as needed
                height: '80%', // Adjust as needed
                overflow: 'auto',
                padding: 'none',
                paddingTop: 'none',
                border: 'none',
                background: 'none',
              },
            }}
          >
            <button
              onClick={closeImageModal}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#fff',
                fontSize: '20px',
              }}
            >
              &#10005;
            </button>
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Additional Image"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            )}
          </Modal>
        </>
      )}
    </>
  );
};

export default Navbar;
