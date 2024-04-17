// import React, { useState } from "react";

// const Mouse = ({ children }) => {
//   const [position, setPosition] = useState({ x: 0, y: 0 });

//   function handleMouseMove(event) {
//     setPosition({ x: event.clientX, y: event.clientY });
//   }

//   return (
//     <div style={{ height: "100vh" }} onMouseMove={handleMouseMove}>
//       {children(position)}
//     </div>
//   );
// };

// export default Mouse;

import React, { useState } from "react";

const Mouse = ({ children }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  function handleMouseMove(event) {
    setPosition({ x: event.clientX, y: event.clientY });
  }

  return (
    <div style={{ height: "100vh" }} onMouseMove={handleMouseMove}>
      {children(position)}
    </div>
  );
};

export default Mouse;
