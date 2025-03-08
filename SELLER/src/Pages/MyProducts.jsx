import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { 
  Trash2, 
  Edit, 
  Info, 
  ChevronLeft, 
  ChevronRight, 
  Package, 
  Grid, 
  List, 
  Star, 
  Tag,
  MapPin,
  Box
} from "lucide-react";
import { StoreContext } from "../Context";

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [viewMode, setViewMode] = useState("grid"); // grid or table
  const { url, token } = useContext(StoreContext);

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${url}/api/products/seller?pageNumber=${currentPage}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(data.products);
      setTotalPages(data.pages);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error(error.response?.data?.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`${url}/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Product deleted successfully");
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error(error.response?.data?.message || "Failed to delete product");
    }
  };

  const confirmDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      handleDeleteProduct(id);
    }
  };

  const handleEditProduct = (id) => {
    // Navigate to edit product page or open modal
    // This would typically be implemented with React Router
    toast.info(`Editing product ${id}`);
    // Example with React Router: navigate(`/products/edit/${id}`);
  };

  const renderGridView = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div 
            key={product._id} 
            className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl"
          >
            <div className="relative h-48 bg-gray-100">
              {product.images && product.images.length > 0 ? (
                <img 
                  src={product.images[0]} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <Package size={48} className="text-gray-400" />
                </div>
              )}
              {product.isFeatured && (
                <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md text-xs font-medium flex items-center">
                  <Star size={14} className="mr-1" /> Featured
                </div>
              )}
            </div>
            
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h3>
                <span className="font-bold text-indigo-600">₹{product.price.toLocaleString()}</span>
              </div>
              
              <p className="text-sm text-gray-600 line-clamp-2 mb-3">{product.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-xs rounded-md">
                  <Tag size={12} className="mr-1" /> {product.category}
                </span>
                <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-xs rounded-md">
                  <MapPin size={12} className="mr-1" /> {product.region}
                </span>
                <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-xs rounded-md">
                  <Box size={12} className="mr-1" /> 
                  Stock: {product.countInStock}
                </span>
              </div>
            </div>
            
            <div className="flex border-t border-gray-200">
              <button 
                onClick={() => handleEditProduct(product._id)}
                className="flex-1 py-3 bg-white text-indigo-600 font-medium hover:bg-indigo-50 transition-colors flex items-center justify-center"
              >
                <Edit size={16} className="mr-2" /> Edit
              </button>
              <div className="w-px bg-gray-200"></div>
              <button 
                onClick={() => confirmDelete(product._id, product.name)}
                className="flex-1 py-3 bg-white text-red-600 font-medium hover:bg-red-50 transition-colors flex items-center justify-center"
              >
                <Trash2 size={16} className="mr-2" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderTableView = () => {
    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Product</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Category</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Price</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Stock</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Region</th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50">
                <td className="px-4 py-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0 mr-3">
                      {product.images && product.images.length > 0 ? (
                        <img
                          className="h-10 w-10 rounded-md object-cover"
                          src={product.images[0]}
                          alt={product.name}
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-md bg-gray-200 flex items-center justify-center">
                          <Package size={16} className="text-gray-500" />
                        </div>
                      )}
                    </div>
                    <div className="font-medium text-gray-800">{product.name}</div>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-gray-600">{product.category}</td>
                <td className="px-4 py-4 text-sm font-medium text-gray-800">₹{product.price.toLocaleString()}</td>
                <td className="px-4 py-4 text-sm text-gray-600">{product.countInStock}</td>
                <td className="px-4 py-4 text-sm text-gray-600">{product.region}</td>
                <td className="px-4 py-4 text-right">
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => handleEditProduct(product._id)}
                      className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
                      aria-label="Edit product"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => confirmDelete(product._id, product.name)}
                      className="p-1 text-red-600 hover:text-red-800 transition-colors"
                      aria-label="Delete product"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">My Products</h1>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-md ${viewMode === "grid" ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-600'}`}
              aria-label="Grid view"
            >
              <Grid size={20} />
            </button>
            <button 
              onClick={() => setViewMode("table")}
              className={`p-2 rounded-md ${viewMode === "table" ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-600'}`}
              aria-label="Table view"
            >
              <List size={20} />
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">Loading products...</div>
        </div>
      ) : products.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <Package size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-800 mb-2">No products found</h3>
          <p className="text-gray-600 mb-6">You haven't added any products yet. Start creating your first product now.</p>
          <button className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors">
            Add Your First Product
          </button>
        </div>
      ) : (
        <>
          {viewMode === "grid" ? renderGridView() : renderTableView()}
          
          {/* Pagination */}
          <div className="mt-8 flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Showing page {currentPage} of {totalPages}
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`p-2 rounded-md ${
                  currentPage === 1 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
                aria-label="Previous page"
              >
                <ChevronLeft size={20} />
              </button>
              
              {/* Page numbers - showing a limited range */}
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-10 h-10 rounded-md ${
                      currentPage === pageNum
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-md ${
                  currentPage === totalPages 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
                aria-label="Next page"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MyProducts;