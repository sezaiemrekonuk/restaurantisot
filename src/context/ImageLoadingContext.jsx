// ImageLoadingContext.js
import React, { createContext, useState, useContext } from 'react';

const ImageLoadingContext = createContext();

const ImageLoadingProvider = ({ children }) => {
  const [areImagesLoaded, setAreImagesLoaded] = useState(false);
  const [preloadedImages, setPreloadedImages] = useState({});

  const markImagesAsLoaded = () => {
    setAreImagesLoaded(true);
  };

  const setImages = (images) => {
    setPreloadedImages(images);
  };

  return (
    <ImageLoadingContext.Provider value={{ areImagesLoaded, markImagesAsLoaded, preloadedImages, setImages }}>
      {children}
    </ImageLoadingContext.Provider>
  );
};

export default ImageLoadingProvider;
export { ImageLoadingContext };
