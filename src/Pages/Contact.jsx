import React, { useState } from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';


const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Show toast message
    toast.success('Thank you for your message!');
    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="bg-gray-100 py-16">
     
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Contact Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 shadow-lg rounded-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Get in Touch</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-gray-600">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-[#fc8019]"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-600">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-[#fc8019]"
                  placeholder="Your Email"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-600">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-[#fc8019]"
                  rows="4"
                  placeholder="Your Message"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-[#fc8019] text-white rounded-lg hover:bg-[#e57312] transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <div className="bg-white p-8 shadow-lg rounded-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Contact Information</h3>
              <ul className="text-gray-600">
                <li className="mb-4">
                  <strong>Address:</strong> 123 Main Street, Nawabshah, Pakistan
                </li>
                <li className="mb-4">
                  <strong>Phone:</strong> +92300-1234567
                </li>
                <li className="mb-4">
                  <strong>Email:</strong> majidalijkhion@gmail.com
                </li>
              </ul>
            </div>
            <div className="bg-white p-8 shadow-lg rounded-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-200 rounded-full hover:bg-gray-300 transition duration-300"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="https://www.twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-200 rounded-full hover:bg-gray-300 transition duration-300"
                >
                  <FaTwitter />
                </a>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-200 rounded-full hover:bg-gray-300 transition duration-300"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-200 rounded-full hover:bg-gray-300 transition duration-300"
                >
                  <FaLinkedinIn />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
