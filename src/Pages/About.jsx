import React, { useRef } from 'react';
import storeImage from '../assets/images/header.webp';

const About = () => {


  return (
    <div className="container mx-auto my-28 px-4">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="w-full md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Welcome to Professor Store
          </h1>
          <p className="text-lg text-gray-800 leading-relaxed">
            At Professor Store, we are dedicated to providing a diverse range of high-quality products to meet all your needs. Our mission is to deliver excellence in both products and customer service.
          </p>
          <p className="text-lg text-gray-800 leading-relaxed mt-4">
            From electronics to fashion, home goods to personal care, our store is your one-stop shop for everything you need. We carefully select our products to ensure you receive the best value and quality.
          </p>
          <p className="text-lg text-gray-800 leading-relaxed mt-4">
            Our commitment to excellence extends beyond our product range. We strive to create a seamless and enjoyable shopping experience for our customers. Thank you for choosing Professor Store.
          </p>
        </div>
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <img
              src={storeImage}
              className="w-3/4 md:w-4/5 lg:w-3/5 rounded-lg transition-transform duration-500 hover:rotate-3 hover:scale-110"
              alt="header"
            />
          </div>
      </div>
    </div>
  );
};

export default About;
