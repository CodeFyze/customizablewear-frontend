import React from 'react';
import GirlOne from '../assets/images/herogirl-1.png'
import GirlTwo from '../assets/images/herogirl2.png'




const Hero = () => {
  return (



    <div className="hero py-0 md:py-20  h-full relative"
      style={{ background: 'linear-gradient(92.79deg, #90AFFF 12.33%, rgba(144, 175, 255, 0.5) 61.17%, rgba(144, 175, 255, 0.5) 67.21%, #90AFFF 98.37%)', }}
    >
      <div className="container  mx-auto flex flex-col  md:flex-row  h-full px-6 md:px-10 font-sans">
        <div className=' md:h-96  w-full md:w-1/2 flex flex-col items-center md:items-start pt-5 md:pt-0 '>
         
            <h2 className='font-sans text-[#091638] pb-1 md:pb-6 text-2xl  text-center md:text-start md:text-5xl lg:text-6xl text-wrap font-bold '>Quality Workwear <br /> Made for You</h2>
            <h5 className='font-sans text-[#091638] pb-1 md:pb-6 text-2xl  text-center md:text-start md:text-4xl lg:text-5xl font-semibold text-wrap leading-10 '>Get Custom <br /> Embroidery Today</h5>
            <button className='bg-[#000000] text-[#FFFFFF] mb-10 md:mb-0 px-10 py-3 border-white border-[1px] rounded-md hover:bg-transparent hover:text-black transition-all hover:duration-300'>Shop Now</button>
          

        </div>
        <div className='md:mb-0 static sm:static md:absolute md:right-0 md:bottom-0 md:h-full   w-full md:w-1/2 flex -space-x-24 '>
          <div className=' '>
          <img src={GirlOne} className='object-fit  w-full h-full' alt="" srcset="" />
           
          </div>
          <div className='-px'>
          
          <img src={GirlTwo}  className='object-fit  w-full h-full' alt="" srcset="" />
          </div>


        </div>
      </div>
    </div>



  );
};

export default Hero;