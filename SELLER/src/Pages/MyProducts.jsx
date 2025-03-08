import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Trash, Edit } from "lucide-react";
import { motion } from "framer-motion";
import { useContext } from "react";
import { StoreContext } from "../Context";

function MyProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const {url,token} = useContext(StoreContext)
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const  data  = await axios.get(`${url}/api/products/seller`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
      });
      console.log(data)
      setProducts(data.products);
    } catch (error) {
      toast.error("Failed to fetch products.");
    }
    setLoading(false);
  };

  const deleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`${url}/api/products/${id}`);
        toast.success("Product deleted successfully.");
        fetchProducts();
      } catch (error) {
        toast.error("Failed to delete product.");
      }
    }
  };

  const updateProduct = (id) => {
    // Redirect to product update form or handle update logic here
    toast.info("Update functionality to be implemented.");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Products</h1>
      {loading ? (
        <p>Loading...</p>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <motion.div
              key={product._id}
              className="border p-4 rounded shadow"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-40 object-cover rounded mb-2"
              />
              <h2 className="text-lg font-bold">{product.name}</h2>
              <p className="text-gray-600">${product.price}</p>
              <p className="text-sm text-gray-500 mb-2">
                {product.description}
              </p>
              <div className="flex justify-between">
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => deleteProduct(product._id)}
                >
                  <Trash />
                </button>
                <button
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => updateProduct(product._id)}
                >
                  <Edit />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
}

export default MyProducts;
