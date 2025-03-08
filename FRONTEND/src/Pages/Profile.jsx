import React, { useContext, useState } from "react";
import { StoreContext } from "../Context";
import { 
  User, 
  Phone, 
  Mail, 
  Clock, 
  MapPin,
  PenLine,
  Save,
  X
} from "lucide-react";
import { format } from "date-fns";

function Profile() {
  const { user } = useContext(StoreContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const [newAddress, setNewAddress] = useState("");
  const [showAddressModal, setShowAddressModal] = useState(false);

  // Initialize the edited user data when entering edit mode
  const handleEditToggle = () => {
    if (!isEditing) {
      setEditedUser({
        name: user?.name || "",
        phone: user?.phone || "",
        email: user?.email || "",
      });
    }
    setIsEditing(!isEditing);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({
      ...editedUser,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Here you would make an API call to update the user profile
    // For example: await axios.put(`${url}/api/users`, editedUser, { headers: { Authorization: `Bearer ${token}` } });
    
    // For now, we'll just toggle out of edit mode
    setIsEditing(false);
  };

  // Format date to a readable string
  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "PPP");
    } catch (error) {
      return "N/A";
    }
  };

  // Get first letter of name for the profile image placeholder
  const getInitial = (name) => {
    return name && name.length > 0 ? name.charAt(0).toUpperCase() : "U";
  };

  // Handle adding a new address
  const handleAddAddress = () => {
    if (newAddress.trim()) {
      // Here you would make an API call to add the address
      // For example: await axios.post(`${url}/api/users/address`, { address: newAddress }, { headers: { Authorization: `Bearer ${token}` } });
      
      setNewAddress("");
      setShowAddressModal(false);
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#bf4221] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-[#bf4221] to-[#e36f4f] text-white p-6">
          <div className="flex items-center">
            {/* Profile Picture/Initial */}
            <div className="mr-4">
              {user.profileImage ? (
                <img
                  src={user.profileImage}
                  alt={user.name}
                  className="h-24 w-24 rounded-full object-cover border-4 border-white"
                />
              ) : (
                <div className="h-24 w-24 rounded-full bg-white text-[#bf4221] flex items-center justify-center text-4xl font-bold border-4 border-white">
                  {getInitial(user.name)}
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-white/80 flex items-center mt-1">
                <Mail size={16} className="mr-2" />
                {user.email}
              </p>
            </div>
            
            {/* Edit Button */}
            <button
              onClick={handleEditToggle}
              className={`p-2 rounded-full ${isEditing ? "bg-white text-[#bf4221]" : "bg-white/20 hover:bg-white/30"}`}
              title={isEditing ? "Cancel editing" : "Edit profile"}
            >
              {isEditing ? <X size={20} /> : <PenLine size={20} />}
            </button>
          </div>
        </div>

        {/* Profile Details */}
        <div className="p-6">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={editedUser.name}
                    onChange={handleInputChange}
                    className="pl-10 w-full p-2 border border-gray-300 rounded focus:ring-[#bf4221] focus:border-[#bf4221]"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={editedUser.phone}
                    onChange={handleInputChange}
                    className="pl-10 w-full p-2 border border-gray-300 rounded focus:ring-[#bf4221] focus:border-[#bf4221]"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={editedUser.email}
                    onChange={handleInputChange}
                    className="pl-10 w-full p-2 border border-gray-300 rounded focus:ring-[#bf4221] focus:border-[#bf4221]"
                    disabled
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
              </div>
              
              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={handleEditToggle}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded mr-2 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#bf4221] text-white rounded hover:bg-[#a3361a] flex items-center"
                >
                  <Save size={16} className="mr-2" />
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              {/* User Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-700 mb-2">Personal Information</h2>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <User className="mr-3 text-[#bf4221] mt-0.5" size={18} />
                        <div>
                          <p className="text-sm text-gray-500">Full Name</p>
                          <p className="font-medium">{user.name}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Phone className="mr-3 text-[#bf4221] mt-0.5" size={18} />
                        <div>
                          <p className="text-sm text-gray-500">Phone Number</p>
                          <p className="font-medium">{user.phone}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Mail className="mr-3 text-[#bf4221] mt-0.5" size={18} />
                        <div>
                          <p className="text-sm text-gray-500">Email Address</p>
                          <p className="font-medium">{user.email}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-700 mb-2">Account Information</h2>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <Clock className="mr-3 text-[#bf4221] mt-0.5" size={18} />
                        <div>
                          <p className="text-sm text-gray-500">Member Since</p>
                          <p className="font-medium">{formatDate(user.createdAt)}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className={`mr-3 h-5 w-5 rounded-full ${user.isActive ? "bg-green-500" : "bg-red-500"} flex items-center justify-center mt-0.5`}>
                          <div className="h-2 w-2 rounded-full bg-white"></div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Account Status</p>
                          <p className="font-medium">{user.isActive ? "Active" : "Inactive"}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Addresses */}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-700">Saved Addresses</h2>
                  <button 
                    onClick={() => setShowAddressModal(true)}
                    className="text-sm px-3 py-1 bg-[#bf4221]/10 text-[#bf4221] rounded hover:bg-[#bf4221]/20 font-medium"
                  >
                    Add New
                  </button>
                </div>
                
                {user.addresses && user.addresses.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-4">
                    {user.addresses.map((address, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded border border-gray-200 flex">
                        <MapPin className="text-[#bf4221] mr-2 flex-shrink-0 mt-0.5" size={18} />
                        <p className="text-gray-700">{address}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-50 p-4 rounded border border-gray-200 text-center">
                    <MapPin className="mx-auto text-gray-400 mb-2" size={24} />
                    <p className="text-gray-500">No addresses saved yet</p>
                    <button 
                      onClick={() => setShowAddressModal(true)}
                      className="mt-2 text-[#bf4221] hover:underline text-sm font-medium"
                    >
                      Add your first address
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Add Address Modal */}
      {showAddressModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold">Add New Address</h3>
              <button 
                onClick={() => setShowAddressModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-4">
              <textarea
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
                placeholder="Enter your full address"
                className="w-full p-3 border border-gray-300 rounded resize-none h-32 focus:ring-[#bf4221] focus:border-[#bf4221]"
              ></textarea>
              
              <div className="flex justify-end mt-4 space-x-3">
                <button
                  onClick={() => setShowAddressModal(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddAddress}
                  className="px-4 py-2 bg-[#bf4221] text-white rounded hover:bg-[#a3361a]"
                  disabled={!newAddress.trim()}
                >
                  Save Address
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;