import React from 'react'
import { BsEmojiSmile } from "react-icons/bs";
import { SiAirplayvideo } from "react-icons/si";
import { FaRegUser } from "react-icons/fa";

const GuideCards = () => {
    return (
        <div className=' w-full pt-3 flex flex-col'>
            <div className=' w-full px-4 py-2'>
                <h3 className='text-xl  md:text-2xl text-center md:text-start font-bold'>The Ecommerce  Company Work</h3>
            </div>
            <div className=' w-full px-4 py-2 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-2 md:gap-4'>
                <div className="bg-white shadow-xl rounded-lg p-6 text-center">
                    <div className="text-5xl text-center text-[#ED5F1E] flex justify-center"><BsEmojiSmile /></div>
                    <h3 className="text-xl font-bold text-[#ED5F1E] mt-4">100,00 Happy Customers</h3>
                    <p className="text-black mt-2">We are proud to serve over 100,000 happy customers throughout the comp</p>
                    <button className="mt-4 px-4 py-2 bg-[#ED5F1E] text-white font-semibold rounded-lg hover:bg-orange-700 transition">
                        View Reviews
                    </button>
                </div>
                
                <div className="bg-white shadow-xl rounded-lg p-6 text-center">
                    <div className="text-5xl text-center text-[#ED5F1E] flex justify-center"><SiAirplayvideo /></div>
                    <h3 className="text-xl font-bold text-[#ED5F1E] mt-4">Add Your Logo With Ease</h3>
                    <p className="text-black mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe rem vel</p>
                    <button className="mt-4 px-4 py-2 bg-[#ED5F1E] text-white font-semibold rounded-lg hover:bg-orange-700 transition">
                       Watch the Guide
                    </button>
                </div>
                
                <div className="bg-white shadow-xl rounded-lg p-6 text-center">
                    <div className="text-5xl text-center text-[#ED5F1E] flex justify-center"><FaRegUser /></div>
                    <h3 className="text-xl font-bold text-[#ED5F1E] mt-4">Over 10 Employees?</h3>
                    <p className="text-black mt-2">We are proud to serve over 100,000 happy customers throughout the comp</p>
                    <button className="mt-4 px-4 py-2 bg-[#ED5F1E] text-white font-semibold rounded-lg hover:bg-orange-700 transition">
                      Request a Quote
                    </button>
                </div>

            </div>

        </div>
    )
}

export default GuideCards
