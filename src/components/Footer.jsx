import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 place-items-center md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div className="text-center md:text-start">
            <h2 className="text-lg font-bold mb-4">About Us</h2>
            <p className="text-gray-400">
              We are a leading Professor Store providing a wide range of products to our customers.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold mb-4">Quick Links</h2>
            <ul className="text-gray-400 text-center md:text-start">
              <li className="mb-2">
                <Link to="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/shop" className="hover:underline">
                  Shop
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/about" className="hover:underline">
                  About
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/contact" className="hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div >
            <h2 className="text-lg text-center md:text-start font-bold mb-4">Contact Us</h2>
            <ul className="text-gray-400 text-center md:text-start">
              <li className="mb-2">
                <a href="tel:+1234567890" className="hover:underline">
                  +923093108513
                </a>
              </li>
              <li className="mb-2">
                <a href="mailto:majidalijkhio@gmail.com" className="hover:underline">
                  majidalijkhio@gmail.com
                </a>
              </li>
              <li className="mb-2">123 Main Street, Nawabshah, Pakistan </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold mb-4">Stay Connected</h2>
            <div className="flex items-center space-x-4">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-700 rounded-full  hover:bg-[#e57312]"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-700 rounded-full hover:bg-[#e57312]"
              >
                <FaTwitter />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-700 rounded-full hover:bg-[#e57312]"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-700 rounded-full  hover:bg-[#e57312]"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-lg font-bold mb-4">Subscribe to our Newsletter</h2>
              <form className="flex flex-col sm:flex-row">
                <input
                  type="email"
                  className="p-2 rounded-l-md bg-gray-700 border border-gray-600 text-white"
                  placeholder="Your email address"
                />
                <button
                  type="submit"
                  className="p-2 bg-[#fc8019] text-white rounded-r-md hover:bg-[#e57312] transition duration-300"
                >
                  Subscribe
                </button>
              </form>
            </div>

            <div className="text-gray-400 text-center md:text-right">
              <p>&copy; 2024 Your Professor Majid All Rights Reserved.</p>
              <p>
                <Link to="/privacy" className="hover:underline">
                  Privacy Policy
                </Link>{" "}
                |{" "}
                <Link to="/terms" className="hover:underline">
                  Terms of Service
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
