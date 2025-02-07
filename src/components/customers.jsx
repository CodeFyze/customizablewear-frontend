import React from "react";

const Customers = () => {
  const customers = [
    {
      id: "CUST001",
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1234567890",
      orders: 5,
      status: "Active",
    },
    {
      id: "CUST002",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+9876543210",
      orders: 2,
      status: "Inactive",
    },
    {
      id: "CUST003",
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      phone: "+1112223333",
      orders: 8,
      status: "Active",
    },
    {
      id: "CUST004",
      name: "Robert Brown",
      email: "robert.brown@example.com",
      phone: "+4445556666",
      orders: 3,
      status: "Inactive",
    },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Customers</h1>

      {/* Customers Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full table-auto">
          <thead className="bg-gray-600 text-white">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium">ID</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Name</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Email</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Phone</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Orders</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, index) => (
              <tr
                key={customer.id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100`}
              >
                <td className="px-4 py-3 text-gray-700 text-sm">{customer.id}</td>
                <td className="px-4 py-3 text-gray-700 text-sm">
                  {customer.name}
                </td>
                <td className="px-4 py-3 text-gray-700 text-sm">
                  {customer.email}
                </td>
                <td className="px-4 py-3 text-gray-700 text-sm">
                  {customer.phone}
                </td>
                <td className="px-4 py-3 text-gray-700 text-sm">
                  {customer.orders}
                </td>
                <td
                  className={`px-4 py-3 text-sm font-medium ${
                    customer.status === "Active"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {customer.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customers;
