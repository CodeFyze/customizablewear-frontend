import React, { useState } from "react";
import {
  FaBars,
  FaBox,
  FaChartBar,
  FaUsers,
  FaShoppingCart,
  FaTimes,
} from "react-icons/fa";
import Orders from "./orders";
import Products from "./products";
import Earnings from "./earnings";
import Customers from "./customers";

const SellerDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Dashboard"); // Track the active tab

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Orders":
        return <div className="p-4"><Orders /></div>;
      case "Products":
        return <div className="p-4"><Products/></div>;
      case "Earnings":
        return <div className="p-4"><Earnings /></div>;
      case "Customers":
        return <div className="p-4"><Customers/></div>;
      case "Dashboard":
        return (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <DashboardCard
              title="Orders"
              value="120"
              icon={<FaShoppingCart className="text-indigo-600" />}
            />
            <DashboardCard
              title="Products"
              value="45"
              icon={<FaBox className="text-green-600" />}
            />
            <DashboardCard
              title="Earnings"
              value="$8,500"
              icon={<FaChartBar className="text-orange-600" />}
            />
            <DashboardCard
              title="Customers"
              value="300"
              icon={<FaUsers className="text-purple-600" />}
            />
          </div>
        );
      default:
        return <div className="p-4">Select an option from the menu</div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div
        className={`fixed top-0 left-0 z-40 h-full bg-white shadow-lg transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 sm:translate-x-0 sm:w-64`}
      >
        <div className="flex items-center justify-between p-4 bg-indigo-600">
          <h2 className="text-white text-xl font-bold">Seller Dashboard</h2>
          <button className="text-white sm:hidden" onClick={toggleSidebar}>
            <FaTimes />
          </button>
        </div>
        <nav className="p-4">
          <ul className="space-y-4">
            <MenuItem
              icon={<FaChartBar />}
              text="Dashboard"
              isActive={activeTab === "Dashboard"}
              onClick={() => setActiveTab("Dashboard")}
            />
            <MenuItem
              icon={<FaShoppingCart />}
              text="Orders"
              isActive={activeTab === "Orders"}
              onClick={() => setActiveTab("Orders")}
            />
            <MenuItem
              icon={<FaBox />}
              text="Products"
              isActive={activeTab === "Products"}
              onClick={() => setActiveTab("Products")}
            />
            <MenuItem
              icon={<FaChartBar />}
              text="Earnings"
              isActive={activeTab === "Earnings"}
              onClick={() => setActiveTab("Earnings")}
            />
            <MenuItem
              icon={<FaUsers />}
              text="Customers"
              isActive={activeTab === "Customers"}
              onClick={() => setActiveTab("Customers")}
            />
          </ul>
        </nav>
      </div>
      <div className="flex flex-col flex-grow sm:ml-64">
        {/* Header */}
        <header className="flex items-center justify-between p-4 bg-white shadow-md sm:hidden">
          <h2 className="text-lg font-semibold">{activeTab}</h2>
          <button onClick={toggleSidebar} className="text-indigo-600">
            <FaBars />
          </button>
        </header>
        <main className="flex-grow p-4">{renderContent()}</main>
      </div>
    </div>
  );
};

const MenuItem = ({ icon, text, isActive, onClick }) => (
  <li>
    <button
      onClick={onClick}
      className={`flex items-center p-2 w-full text-left ${
        isActive ? "text-indigo-600 bg-gray-100" : "text-gray-700"
      } hover:text-indigo-600 hover:bg-gray-100 rounded-lg transition`}
    >
      <span className="mr-2">{icon}</span>
      {text}
    </button>
  </li>
);

const DashboardCard = ({ title, value, icon }) => (
  <div className="flex items-center p-4 bg-white shadow rounded-lg">
    <div className="p-3 bg-gray-100 rounded-full">{icon}</div>
    <div className="ml-4">
      <h3 className="text-lg font-medium text-gray-700">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  </div>
);

export default SellerDashboard;
