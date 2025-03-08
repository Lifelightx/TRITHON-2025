import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  LogIn,
  Menu,
  X,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { StoreContext } from "../Context";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {url,token,setToken,setUser} = useContext(StoreContext)
  const navItems = ["Home", "About", "Products", "Contact"];
  console.log(token)
  const openSignInModal = () => {
    setShowSignInModal(true);
    setShowSignUpModal(false);
    setMenuOpen(false);
  };

  const openSignUpModal = () => {
    setShowSignUpModal(true);
    setShowSignInModal(false);
    setMenuOpen(false);
  };

  const closeModals = () => {
    setShowSignInModal(false);
    setShowSignUpModal(false);
  };

  const switchToSignUp = () => {
    setShowSignInModal(false);
    setShowSignUpModal(true);
  };

  const switchToSignIn = () => {
    setShowSignUpModal(false);
    setShowSignInModal(true);
  };
  const navigate= useNavigate();

  const signInFormik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: (values,{resetForm}) => {
      console.log("Sign In Data:", values);
      axios.post(`${url}/api/auth/login`,values)
      .then(res=> {
        setToken(res.data.token)
        localStorage.setItem("token",res.data.token)
        setUser(res.data)
      })
      .catch(err =>console.log(err))
      resetForm();
      closeModals();
      navigate("/");
    },
  });

  const signUpFormik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Full Name is required"),
      phone: Yup.string()
        .matches(/^\d{10}$/, "Phone must be a 10-digit number")
        .required("Phone is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: (values,{resetForm}) => {
      console.log("Sign Up Data:", values);
      axios.post(`${url}/api/auth/register`, values)
      .then( res =>  console.log(res))
      .catch(err => console.log(err))
      resetForm();
      closeModals();
      navigate("/");
    },
  });
  const handlLogout = ()=>{
    localStorage.removeItem("token")
    setToken("")
    setUser(null)
    navigate("/")
  }
  return (
    <>
      <nav className="bg-white shadow-md sticky z-50 top-0 py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-2xl font-bold text-[#bf4221]">
              Utkal Crafts
            </span>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-8">
            {navItems.map((item, index) => (
              <li key={index}>
                <a
                  className="text-gray-700 hover:text-[#bf4221] font-medium transition-colors duration-200"
                  href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>

          {/* Auth Buttons */}
          {!token?
          <div className="hidden md:flex items-center space-x-4">
            <button
              className="px-4 py-2 text-[#bf4221] border border-[#bf4221] rounded hover:bg-[#bf4221]/10 transition-colors duration-200 flex items-center"
              onClick={openSignInModal}
            >
              <LogIn size={16} className="mr-2" />
              Sign In
            </button>
            <button
              className="px-4 py-2 bg-[#bf4221] text-white rounded hover:bg-[#a3361a] transition-colors duration-200 flex items-center"
              onClick={openSignUpModal}
            >
              <User size={16} className="mr-2" />
              Sign Up
            </button>
          </div>:<button
              className="px-4 py-2 bg-[#bf4221] text-white rounded hover:bg-[#a3361a] transition-colors duration-200 flex items-center"
              onClick={handlLogout}
            >
              <User size={16} className="mr-2" />
              Log out
            </button>
          }
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-600"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <ul className="md:hidden bg-white shadow-md py-4 px-6 absolute w-full left-0 top-16 z-10">
            {navItems.map((item, index) => (
              <li key={index} className="py-2">
                <a
                  className="text-gray-700 hover:text-[#bf4221] font-medium block"
                  href={`/${item.toLowerCase()}`}
                >
                  {item}
                </a>
              </li>
            ))}
            <div className="mt-4 space-y-2">
              <button
                className="w-full px-4 py-2 text-[#bf4221] border border-[#bf4221] rounded hover:bg-[#bf4221]/10 transition-colors duration-200 flex items-center justify-center"
                onClick={openSignInModal}
              >
                <LogIn size={16} className="mr-2" />
                Sign In
              </button>
              <button
                className="w-full px-4 py-2 bg-[#bf4221] text-white rounded hover:bg-[#a3361a] transition-colors duration-200 flex items-center justify-center"
                onClick={openSignUpModal}
              >
                <User size={16} className="mr-2" />
                Sign Up
              </button>
            </div>
          </ul>
        )}
      </nav>

      {/* Sign In Modal */}
      {showSignInModal && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex  items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-[#bf4221]">Sign In</h2>
              <button
                onClick={closeModals}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <form
              className="p-6 space-y-4"
              onSubmit={signInFormik.handleSubmit}
            >
              {/* Email Input */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    onChange={signInFormik.handleChange}
                    onBlur={signInFormik.handleBlur}
                    value={signInFormik.values.email}
                    className="pl-10 w-full p-2 border border-gray-300 rounded focus:ring-[#bf4221] focus:border-[#bf4221]"
                    placeholder="Your email"
                  />
                  {/* ✅ Show error only if field is touched */}
                  {signInFormik.touched.email && signInFormik.errors.email && (
                    <div className="text-red-500 text-sm mt-1 font-medium">
                      {signInFormik.errors.email}
                    </div>
                  )}
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={16} className="text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    onChange={signInFormik.handleChange}
                    onBlur={signInFormik.handleBlur}
                    value={signInFormik.values.password}
                    className="pl-10 w-full p-2 border border-gray-300 rounded focus:ring-[#bf4221] focus:border-[#bf4221]"
                    placeholder="Your password"
                  />
                  {/* ✅ Show error only if field is touched */}
                  {signInFormik.touched.password &&
                    signInFormik.errors.password && (
                      <div className="text-red-500 text-sm mt-1 font-medium">
                        {signInFormik.errors.password}
                      </div>
                    )}

                  {/* Show/Hide Password Toggle */}
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff size={16} className="text-gray-400" />
                    ) : (
                      <Eye size={16} className="text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                className="w-full bg-[#bf4221] text-white py-2 px-4 rounded hover:bg-[#a3361a] transition-colors duration-200"
              >
                Sign In
              </button>
            </form>

            <div className="px-6 pb-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <button
                  className="text-[#bf4221] hover:underline font-medium"
                  onClick={switchToSignUp}
                >
                  Sign Up
                </button>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Sign Up Modal */}
      {showSignUpModal && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-[#bf4221]">Sign Up</h2>
              <button
                onClick={closeModals}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <form className="p-6 space-y-4" onSubmit={signUpFormik.handleSubmit}>
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    onChange={signUpFormik.handleChange}
                    onBlur={signUpFormik.handleBlur}
                    value={signUpFormik.values.name}
                    className="pl-10 w-full p-2 border border-gray-300 rounded focus:ring-[#bf4221] focus:border-[#bf4221]"
                    placeholder="Your full name"
                    
                  />
                  {signUpFormik.touched.name &&
                    signUpFormik.errors.name && (
                      <div className="text-red-500 text-sm mt-1 font-medium">
                        {signUpFormik.errors.name}
                      </div>
                    )}

                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    onChange={signUpFormik.handleChange}
                    onBlur={signUpFormik.handleBlur}
                    value={signUpFormik.values.phone}
                    className="pl-10 w-full p-2 border border-gray-300 rounded focus:ring-[#bf4221] focus:border-[#bf4221]"
                    placeholder="Your phone number"
                    
                  />
                  {signUpFormik.touched.phone &&
                    signUpFormik.errors.phone && (
                      <div className="text-red-500 text-sm mt-1 font-medium">
                        {signUpFormik.errors.phone}
                      </div>
                    )}
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="signup-email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="signup-email"
                    name="email"
                    onChange={signUpFormik.handleChange}
                    onBlur={signUpFormik.handleBlur}
                    value={signUpFormik.values.email}
                    className="pl-10 w-full p-2 border border-gray-300 rounded focus:ring-[#bf4221] focus:border-[#bf4221]"
                    placeholder="Your email"
                    
                  />
                  {signUpFormik.touched.email &&
                    signUpFormik.errors.email && (
                      <div className="text-red-500 text-sm mt-1 font-medium">
                        {signUpFormik.errors.email}
                      </div>
                    )}
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="signup-password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={16} className="text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="signup-password"
                    name="password"
                    onBlur={signUpFormik.handleBlur}
                    onChange={signUpFormik.handleChange}
                    value={signUpFormik.values.password}
                    className="pl-10 w-full p-2 border border-gray-300 rounded focus:ring-[#bf4221] focus:border-[#bf4221]"
                    placeholder="Create password"
                    
                  />
                  {signUpFormik.touched.password &&
                    signUpFormik.errors.password && (
                      <div className="text-red-500 text-sm mt-1 font-medium">
                        {signUpFormik.errors.password}
                      </div>
                    )}
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff size={16} className="text-gray-400" />
                    ) : (
                      <Eye size={16} className="text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={16} className="text-gray-400" />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirm-password"
                    name="confirmPassword"
                    onBlur={signUpFormik.handleBlur}
                    onChange={signUpFormik.handleChange}
                    value={signUpFormik.values.confirmPassword}
                    className="pl-10 w-full p-2 border border-gray-300 rounded focus:ring-[#bf4221] focus:border-[#bf4221]"
                    placeholder="Confirm password"
                    
                  />
                  {signUpFormik.touched.confirmPassword &&
                    signUpFormik.errors.confirmPassword && (
                      <div className="text-red-500 text-sm mt-1 font-medium">
                        {signUpFormik.errors.confirmPassword}
                      </div>
                    )}
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={16} className="text-gray-400" />
                    ) : (
                      <Eye size={16} className="text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="terms"
                  type="checkbox"
                  className="h-4 w-4 text-[#bf4221] focus:ring-[#bf4221] border-gray-300 rounded"
                  required
                />
                <label
                  htmlFor="terms"
                  className="ml-2 block text-sm text-gray-700"
                >
                  I agree to the{" "}
                  <a href="#" className="text-[#bf4221] hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-[#bf4221] hover:underline">
                    Privacy Policy
                  </a>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-[#bf4221] text-white py-2 px-4 rounded hover:bg-[#a3361a] transition-colors duration-200"
              >
                Create Account
              </button>
            </form>

            <div className="px-6 pb-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <button
                  className="text-[#bf4221] hover:underline font-medium"
                  onClick={switchToSignIn}
                >
                  Sign In
                </button>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default Navbar;
