import React from "react";

const Earnings = () => {
  const data = [
    { month: "January", earnings: "$5,000" },
    { month: "February", earnings: "$6,200" },
    { month: "March", earnings: "$7,800" },
    { month: "April", earnings: "$4,500" },
    { month: "May", earnings: "$8,100" },
    { month: "June", earnings: "$9,300" },
  ];

  const totalEarnings = data.reduce((total, entry) => {
    const amount = parseFloat(entry.earnings.replace(/[^0-9.-]+/g, ""));
    return total + amount;
  }, 0);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Earnings</h1>

      {/* Total Earnings Card */}
      <div className="bg-gray-600 text-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-medium">Total Earnings</h2>
        <p className="text-4xl font-bold mt-2">${totalEarnings.toLocaleString()}</p>
      </div>

      {/* Earnings Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full table-auto">
          <thead className="bg-gray-600 text-white">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium">Month</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Earnings</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100`}
              >
                <td className="px-4 py-3 text-gray-700 text-sm">{entry.month}</td>
                <td className="px-4 py-3 text-gray-700 text-sm">{entry.earnings}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Earnings;
