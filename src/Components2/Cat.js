import React from "react";

const Cat = ({ mouse }) => {
  const catStyle = {
    position: "absolute",
    top: mouse.y - 20,
    left: mouse.x - 20,
    width: "50px",
    height: "50px",
    background: "gray",
    borderRadius: "10px",
  };

  return (
    <div style={catStyle}>
      X: {mouse.x} Y: {mouse.y}
    </div>
  );
};

export default Cat;
