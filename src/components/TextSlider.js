import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SliderComponent = () => {
  const slides = [
    "Manage your tasks efficiently",
    "Track progress easily",
    "Stay organized with Todo App"
  ];

  return (
    <Slider autoplay infinite>
      {slides.map((text, index) => (
        <div key={index} className="p-4 text-center bg-gray-100">
          <h2 className="text-lg font-bold">{text}</h2>
        </div>
      ))}
    </Slider>
  );
};

export default SliderComponent;
