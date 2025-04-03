import React, { useRef } from 'react';
import storeImage from '../assets/images/abt.png';
import { FaArrowRightLong } from "react-icons/fa6";

const About = () => {


  return (
    <div className=" container mx-auto my-8 px-4">
      <h1 className="text-2xl md:text-4xl text-start mt-2 font-bold mb-4 text-gray-900">
           About <span className='text-[#002DA1]'>  Us</span>
          </h1>
      <div className="flex flex-col gap-2 sm:flex md:flex-row items-center justify-between">
      <div className=" w-full sm:w-4/5 md:w-1/2 h-96 sm:h-80 md:h-96 lg:h-96 flex justify-center ">
      
            <img
              src={storeImage}
              className=" w-full md:w-4/5 lg:w-3/5 h-98  transition-transform duration-500"
              alt="header"
              // style={{borderBottomRightRadius:'200px'}}
            />
          </div>
        <div className="h-auto w-full  md:w-1/2 mb-8 md:mb-0 px-10">
          <h1 className="text-2xl md:text-4xl text-center mt-2 font-bold mb-4 text-gray-900">
            Welcome to <span className='text-[#002DA1]'> Professor Store</span> 
          </h1>
          <p className="text-lg text-center sm:text-start text-gray-800 leading-relaxed">
            At Professor Store, we are dedicated to providing a diverse range of high-quality products to meet all your needs. Our mission is to deliver excellence in both products and customer service.
          </p>
          <p className="text-lg text-center sm:text-start text-gray-800 leading-relaxed mt-4">
            From electronics to fashion, home goods to personal care, our store is your one-stop shop for everything you need. We carefully select our products to ensure you receive the best value and quality.
          </p>
          <p className="text-lg text-center sm:text-start text-gray-800 leading-relaxed mt-4">
            Our commitment to excellence extends beyond our product range. We strive to create a seamless and enjoyable shopping experience for our customers. Thank you for choosing Professor Store.
          </p>
          <button className="my-3 mx-auto sm:mx-auto md:mx-0 sm:my-3  flex items-center gap-5 font-medium  bg-[#091638] text-white px-3 py-3 rounded-md hover:bg-orange-600 "><span>Learn More </span> <FaArrowRightLong className="font-light" /></button>
        </div>
       
      </div>
    </div>
  );
};

export default About;
