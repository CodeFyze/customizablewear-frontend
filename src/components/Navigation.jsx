import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaBoxOpen,
  FaShoppingCart,
  FaInfoCircle,
} from "react-icons/fa";
import logo from "../assets/images/logo.jpeg";
import { useSelector } from "react-redux";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const items = useSelector((state) => state.cart);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/">
              <img className="h-10 md:h-6 " src={logo} alt="logo" />
              <span className="font-bold items-center  border-b-[3px] hover:border-[#e57312] transition duration-500">
                rofessoR
              </span>
              &nbsp;
              <span className="font-bold border-b-[3px] hover:border-[#4bf6d4] transition duration-800">Store</span>
            </Link>
        
          </div>
          <div className="hidden sm:block sm:ml-6">
            <div className="flex space-x-4">
              <NavLink to="/" icon={<FaHome />} text="Home" />
              <NavLink to="/products"  text="Products" />
              <NavLink to="/about"  text="About" />
              <NavLink to="/contact"  text="Contact" />
              <NavLink to="/Signup"  text="Sign Up" />
              <NavLink to="/login"  text="Login" />
            </div>
          </div>
          <div
            className={`absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 ${
              isOpen ? "hidden" : "flex"
            }`}
          >
            <Link to="/cart" className="flex items-center hidden lg:flex">
              <div className="relative">
                <FaShoppingCart className="h-6 w-6 sm:h-8 sm:w-8" />
                {items.length > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                    {items.length}
                  </span>
                )}
              </div>
            </Link>
          </div>
          <div className="-mr-2 flex sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
            >
              {isOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isOpen ? "block" : "hidden"} sm:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <NavLinkMobile to="/" text="Home" onClick={toggleMenu} />
          <NavLinkMobile to="/products" text="Products" onClick={toggleMenu} />
          <NavLinkMobile to="/about" text="About" onClick={toggleMenu} />
          <NavLinkMobile to="/contact" text="Contact" onClick={toggleMenu} />
          <NavLinkMobile to="/cart" text="Cart" onClick={toggleMenu} />
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, icon, text }) => (
  <Link
    to={to}
    className="flex items-center text-gray-700 hover:text-orange-500 transition duration-300 relative group"
  >
    <span className="mr-2">{icon}</span>
    <span>{text}</span>
    <span className="absolute bottom-0 left-0 w-full bg-[#4bf6d4] h-0.5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
  </Link>
);

const NavLinkMobile = ({ to, text, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="block py-2 px-3 text-base font-medium text-gray-500 hover:text-gray-800 transition duration-150 relative group"
  >
    <span>{text}</span>
    <span className="absolute bottom-0 left-0 w-full bg-orange-500 h-0.5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
  </Link>
);

export default Navigation;
