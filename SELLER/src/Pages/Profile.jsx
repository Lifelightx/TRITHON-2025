import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { StoreContext } from "../context"; 

const Profile = () => {
  const { token, url } = useContext(StoreContext); 
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSellers = async () => {
      if (!token) {
        setError("No authentication token found");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${url}/api/sellers/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setSellers(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch sellers");
      } finally {
        setLoading(false);
      }
    };

    fetchSellers();
  }, [token, url]);

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Seller List</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">Business</th>
              <th className="border p-2">Approved</th>
              <th className="border p-2">Active</th>
            </tr>
          </thead>
          <tbody>
            {sellers.map((seller) => (
              <tr key={seller._id} className="text-center">
                <td className="border p-2">{seller.name}</td>
                <td className="border p-2">{seller.email}</td>
                <td className="border p-2">{seller.phone}</td>
                <td className="border p-2">{seller.businessName}</td>
                <td className="border p-2">
                  {seller.isApproved ? "✅ Yes" : "❌ No"}
                </td>
                <td className="border p-2">
                  {seller.isActive ? "🟢 Active" : "🔴 Inactive"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Profile;
