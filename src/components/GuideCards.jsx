import React from 'react'
import { BsEmojiSmile } from "react-icons/bs";
import { SiAirplayvideo } from "react-icons/si";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineComment } from "react-icons/md";
import { MdSlowMotionVideo } from "react-icons/md";
import { IoIosStar } from "react-icons/io"

const GuideCards = () => {
    return (
        <div className=' w-full  flex flex-col'>
            <div className=' w-full px-4 py-2'>
                <h3 className='text-xl  md:text-2xl text-center md:text-start font-bold'>The Ecommerce  Company Work</h3>
            </div>
            <div className=' w-full px-4 py-2 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-2 md:gap-4'>
                <div className="relative bg-white shadow-xl rounded-lg p-6 text-center">
                    <div className='absolute right-0 top-0 w-14 h-14 rounded-bl-full rounded-tr-lg bg-[#172751]'> </div>

                    <div className="text-5xl text-center text-[#ED5F1E] flex justify-start"><BsEmojiSmile  className='bg-black text-white p-2 rounded-md'/></div>
                    <h3 className="text-xl font-bold text-black mt-4">100,00 Happy Customers</h3>
                    <p className="text-gray-600 mt-2">We are proud to serve over 100,000 happy customers throughout the comp</p>
                    <button className="mt-4 px-4 py-2 bg-[#091638] text-white font-semibold rounded-lg hover:bg-orange-700 transition">
                    <IoIosStar className='inline-block' />   View Top Reviews
                    </button>
                </div>
                
                <div className="relative bg-white shadow-xl rounded-lg p-6 text-center">
                <div className='absolute right-0 top-0 w-14 h-14 rounded-bl-full  bg-[#172751]'> </div>
                    <div className="text-5xl text-center text-[#ED5F1E] flex justify-start"><SiAirplayvideo  className='bg-black text-white p-2 rounded-md'/></div>
                    <h3 className="text-xl font-bold text-black mt-4">Add Your Logo With Ease</h3>
                    <p className="text-gray-600 mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe rem vel</p>
                    <button className="mt-4 px-4 py-2 bg-[#091638] text-white font-semibold rounded-lg hover:bg-orange-700 transition">
                   < MdSlowMotionVideo className='inline-block' />   Watch the Guide
                    </button>
                </div>
                
                <div className="relative bg-white shadow-xl rounded-lg p-6 text-center">
                <div className='absolute right-0 top-0 w-14 h-14 rounded-bl-full rounded-tr-lg bg-[#172751]'> </div>
                    <div className="text-5xl text-center text-[##091638] flex justify-start "><FaRegUser  className='bg-black text-white p-2 rounded-md'/></div>
                    <h3 className="text-xl font-bold text-black mt-4">Over 10 Employees?</h3>
                    <p className="text-gray-600 mt-2">We are proud to serve over 100,000 happy customers throughout the comp</p>
                    <button className="mt-4 px-4 py-2 bg-[#091638] text-white font-semibold rounded-lg hover:bg-orange-700 transition">
                    <MdOutlineComment className='inline-block' />   Request a Quote
                    </button>
                </div>

            </div>

        </div>
    )
}

export default GuideCards
