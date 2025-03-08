import React, { useState, useEffect } from "react";

const mockSellers = [
  { id: 1, name: "Seller A", email: "a@example.com", status: "Pending" },
  { id: 2, name: "Seller B", email: "b@example.com", status: "Pending" },
  { id: 3, name: "Seller C", email: "c@example.com", status: "Pending" },
];

 const ManageSellers = () => {
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    // Simulating API fetch
    setTimeout(() => {
      setSellers(mockSellers);
    }, 500);
  }, []);

  const updateStatus = (id, status) => {
    setSellers((prevSellers) =>
      prevSellers.map((seller) =>
        seller.id === id ? { ...seller, status } : seller
      )
    );
  };

  return (
    <div className="p-5 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: "#bf4221" }} >Manage Sellers</h2>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-700">
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sellers.map((seller, index) => (
              <tr key={seller.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <td className="p-4 text-gray-800 font-medium">{seller.name}</td>
                <td className="p-4 text-gray-600">{seller.email}</td>
                <td className={`p-4 font-semibold ${seller.status === "Approved" ? "text-green-600" : seller.status === "Dismissed" ? "text-red-600" : "text-yellow-600"}`}>{seller.status}</td>
                <td className="p-4 text-center">
                  {seller.status === "Pending" && (
                    <div className="flex justify-center space-x-3">
                      <button onClick={() => updateStatus(seller.id, "Approved")} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md shadow-md transition">Approve</button>
                      <button onClick={() => updateStatus(seller.id, "Dismissed")} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow-md transition">Dismiss</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageSellers;