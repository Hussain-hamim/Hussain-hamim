import React from "react";
import Lottie from "lottie-react";
import starsAnimation from "../assets/Stars.json";

const ContactFooterWrap = ({ children }) => {
  return (
    <div className="relative overflow-hidden">
      {/* Lottie background - spans contact + footer height */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <Lottie
          animationData={starsAnimation}
          loop
          rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
          style={{ width: "100%", height: "100%", minHeight: "100%" }}
        />
        <div className="absolute inset-0 bg-black/60" aria-hidden />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default ContactFooterWrap;
