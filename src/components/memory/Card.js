import React from "react";
import ReactCardFlip from "react-card-flip";

export default function Card({ image, size, fliped, onClick, clickDisabled }) {
  return (
    <div
      onClick={fliped ? null : onClick}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        cursor: clickDisabled || fliped ? "default" : "pointer",
      }}
      className="card-container"
    >
      <ReactCardFlip isFlipped={!fliped}>
        <img
          src={image.path}
          width={size}
          height={size}
          alt="Thanks for picking me!"
        />
        <img
          src="./images/flipped.jpg"
          width={size}
          height={size}
          alt="Pick me please!"
        />
      </ReactCardFlip>
    </div>
  );
}
