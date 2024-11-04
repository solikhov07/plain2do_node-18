// SlidingWindow.js
import React from "react";
import "../styles.css";

const SlidingWindow = ({ isOpen, content, onClose }) => {
  return (
    isOpen && (
      <div className="overlay" onClick={onClose}>
        <div className="sliding-window" onClick={(e) => e.stopPropagation()}>
          <span className="close-btn" onClick={onClose}>
            &times;
          </span>
          {content}
        </div>
      </div>
    )
  );
};

export default SlidingWindow;
