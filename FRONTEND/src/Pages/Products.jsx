import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { StoreContext } from '../Context';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); // Current page state
  const [totalPages, setTotalPages] = useState(1); // Total pages
  const { url } = useContext(StoreContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // API call with pagination
        const response = await axios.get(`${url}/api/products?pageNumber=${page}`);
        setProducts(response.data.products);
        setFilteredProducts(response.data.products);
        setTotalPages(response.data.pages); // Setting total pages from the API
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, url]); // Re-fetch products when the page changes

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    
    // Filter products based on search term
    const filtered = products.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.craftType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.region.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setFilteredProducts(filtered);
    setPage(1); // Reset to first page when searching
  };

  const clearSearch = () => {
    setSearchTerm('');
    setFilteredProducts(products);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Artisan Crafts Collection</h1>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-2 max-w-lg mx-auto">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, description, craft type or region..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors duration-200"
          >
            Search
          </button>
          {searchTerm && (
            <button
              type="button"
              onClick={clearSearch}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
            >
              Clear
            </button>
          )}
        </div>
      </form>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <Link to={`/details/${product._id}`} className="block">
              <img 
                src={`${url}${product.images[0]}`}
                alt={product.name} 
                className="w-full h-48 object-cover"
              />
              
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-1">{product.name}</h2>
                
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400 mr-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs text-gray-600">({product.numReviews})</span>
                </div>
                
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
                
                <div className="flex items-center justify-between mt-2">
                  <span className="text-lg font-bold text-green-600">₹{product.price.toFixed(2)}</span>
                  <span className="text-sm text-gray-500">{product.region}</span>
                </div>
                
                <div className="mt-4">
                  <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">{product.craftType}</span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-center mt-12 space-x-4">
        <button
          onClick={handlePrevious}
          disabled={page === 1}
          className={`flex items-center px-5 py-2.5 rounded-lg border border-gray-200 bg-white text-orange-700 font-medium hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 ${
            page === 1 ? 'opacity-50 cursor-not-allowed hover:bg-white hover:border-gray-200' : ''
          }`}
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </button>

        <div className="flex items-center space-x-1 text-sm">
          <span className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 font-medium">
            Page {page}
          </span>
          <span className="text-gray-500">of</span>
          <span className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 font-medium">
            {totalPages}
          </span>
        </div>

        <button
          onClick={handleNext} 
          disabled={page === totalPages}
          className={`flex items-center px-5 py-2.5 rounded-lg border border-gray-200 bg-white text-orange-700 font-medium hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 ${
            page === totalPages ? 'opacity-50 cursor-not-allowed hover:bg-white hover:border-gray-200' : ''
          }`}
        >
          Next
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Products;