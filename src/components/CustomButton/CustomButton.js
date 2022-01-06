import React from "react";

export default function CustomButton({ textButton, disabled, onClick, className }) {
  return (
    <>
      <button
        className={className}
        disabled={disabled}
        onClick={onClick}
      >
        {textButton}
      </button>
    </>
  );
}