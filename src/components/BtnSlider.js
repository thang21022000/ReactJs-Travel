import React from "react";
import './Slider2.css'

export default function BtnSlider({ direction, moveSlide }) {
  // console.log({direction}, moveSlide);
  return (
    <button
      onClick={moveSlide}
      className={direction === "next" ? "btn-slide next" : "btn-slide prev"}
    >
      <i className={direction === "next" ? "fas fa-arrow-right" : "fas fa-arrow-left"}></i>
    </button>
  );
}