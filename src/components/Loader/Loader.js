import React from "react";

const Loader = ({ textLoader }) => {
  return (
    <div className="loader-container">
      <div className="d-flex column justify-content-center align-items-center">
        <h2 className="loader-title">{textLoader}</h2>
        <div className="loader mx-2"></div>
      </div>
    </div>
  );
};

export default Loader;