import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import "./ImageSlider.css"; // Import a CSS file for styling

const slideStyles = {
  width: "100%",
  height: "100%",
  borderRadius: "10px",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const rightArrowStyles = {
  position: "absolute",
  top: "50%",
  transform: "translate(0, -50%)",
  right: "32px",
  fontSize: "25px",
  color: "#fff",
  zIndex: 1,
  cursor: "pointer",
  zIndex: "2000"
};

const leftArrowStyles = {
  position: "absolute",
  top: "50%",
  transform: "translate(0, -50%)",
  left: "32px",
  fontSize: "25px",
  color: "#fff",
  zIndex: 1,
  cursor: "pointer",
  zIndex: "2000"
};

const sliderStyles = {
  position: "relative",
  height: "100%",
  overflow: "hidden", // Added overflow property
  backgroundColor: "#000", // Set a background color to match the background
};

const dotsContainerStyles = {
  position: "absolute",
  bottom: "3rem", // Adjust bottom value as needed
  left: 0,
  right: 0,
  display: "flex",
  justifyContent: "center",
  zIndex: "1000"
};

const dotStyle = {
  margin: "0 3px",
  cursor: "pointer",
  fontSize: "10px",
  zIndex: "3000"
};

const ImageSlider = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const controls = useAnimation(); // Create animation controls

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    updateAnimation(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    updateAnimation(newIndex);
  };

  const goToSlide = (slideIndex) => {
    updateAnimation(slideIndex);
  };

  const updateAnimation = (newIndex) => {
    controls.start({ opacity: 0, transition: { duration: 0 } }).then(() => {
      setCurrentIndex(newIndex);
      controls.start({ opacity: 1, transition: { duration: 0.5 } });
    });
  };

  useEffect(() => {
    controls.start({ opacity: 1, transition: { duration: 0.5 } });
  }, [currentIndex, controls]);

  const slideStylesWidthBackground = {
    ...slideStyles,
    backgroundImage: `url(${slides[currentIndex].url})`,
  };

  return (
    <motion.div
      id="sliderContainer"
      className="slider-container"
      style={{ ...sliderStyles }}
    >
      <div>
        <div onClick={goToPrevious} style={leftArrowStyles}>
          ❰
        </div>
        <div onClick={goToNext} style={rightArrowStyles}>
          ❱
        </div>
      </div>
      <motion.div
        style={slideStylesWidthBackground}
        initial={{ opacity: 0 }}
        animate={controls}
      ></motion.div>
      <div style={dotsContainerStyles}>
        {slides.map((slide, slideIndex) => (
          <div
            style={dotStyle}
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
          >
            ●
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ImageSlider;
