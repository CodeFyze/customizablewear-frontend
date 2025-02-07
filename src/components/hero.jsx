import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import header from "../assets/images/header.webp";
import Banner1 from "../assets/images/Slideimgs/customizable wear cover.png";
import Banner2 from "../assets/images/Slideimgs/customizable wear cover-two.png";
import Banner3 from "../assets/images/Slideimgs/customizable wear cover-three.png";
import "swiper/css";

const Hero = () => {
  return (
    <Swiper
      className="mySwiper h-[80vh]"
      modules={[Autoplay]}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      loop={true}
      speed={1000}
    >
      {/* First Slide with Content */}
      <SwiperSlide>
        <div className="hero py-20 h-full">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between h-full px-6 md:px-10">
            {/* Text Content */}
            <div className="w-full md:w-1/2 text-center md:text-left mb-10 md:mb-0">
              <h6 className="text-2xl text-gray-700">Welcome To .........</h6>
              <h3 className="text-3xl md:text-6xl font-bold text-gray-900 mt-4">
                Professor Store
              </h3>
              <button className="px-6 py-3 rounded-full text-white font-bold mt-8 bg-yellow-500 hover:bg-yellow-600 transition duration-300">
                Order Now
              </button>
            </div>
            
            {/* Image Container */}
            <div className="w-full md:w-1/2 flex justify-center md:justify-end h-full">
              <img
                src={header}
                className="rounded-lg transition-transform duration-500 hover:rotate-3 hover:scale-110 object-cover h-full"
                alt="header"
              />
            </div>
          </div>
        </div>
      </SwiperSlide>

      {/* Image Slides */}
      {[Banner1, Banner2, Banner3].map((banner, index) => (
        <SwiperSlide key={index}>
          <div className="h-full w-full flex items-center justify-center">
            <img
              src={banner}
              className="w-full h-full object-cover"
              alt={`Banner ${index + 1}`}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Hero;