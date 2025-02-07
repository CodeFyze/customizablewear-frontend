import React from "react";

const Orders = () => {
  const orders = [
    {
      id: "ORD12345",
      product: "Wireless Earbuds",
      date: "2023-12-25",
      status: "Delivered",
      price: "$49.99",
    },
    {
      id: "ORD12346",
      product: "Smartphone",
      date: "2023-12-24",
      status: "Shipped",
      price: "$699.00",
    },
    {
      id: "ORD12347",
      product: "Gaming Laptop",
      date: "2023-12-23",
      status: "Processing",
      price: "$1,299.00",
    },
    {
      id: "ORD12348",
      product: "Smart Watch",
      date: "2023-12-22",
      status: "Cancelled",
      price: "$199.00",
    },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Orders</h1>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-600 text-white">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium">Order ID</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Product</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Date</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Status</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Price</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr
                key={order.id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100`}
              >
                <td className="px-4 py-2 text-sm text-gray-700">{order.id}</td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {order.product}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">{order.date}</td>
                <td
                  className={`px-4 py-2 text-sm font-medium ${
                    order.status === "Delivered"
                      ? "text-green-600"
                      : order.status === "Shipped"
                      ? "text-blue-600"
                      : order.status === "Cancelled"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {order.status}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {order.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
