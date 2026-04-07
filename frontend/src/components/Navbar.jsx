import { BookOpen, User, BookA, LogOut, ChevronDown } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getData } from "../context/userContext";
import axios from "axios";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, setUser } = getData();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const accessToken = localStorage.getItem('accessToken');

  const logoutHandler = async () => {
    try {
      const res = await axios.post(`http://localhost:5500/user/logout`, {}, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      if (res.data.success) {
        setUser(null);
        toast.success(res.data.message);
        localStorage.clear();
        setIsDropdownOpen(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Logout failed");
    }
  };

  return (
    <nav className="p-2 border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
        
        {/* Logo Section */}
        <div className="flex gap-2 items-center">
          <BookOpen className="h-6 w-6 text-green-800" />
          <h1 className="font-bold text-xl">
            <span className="text-green-600">Notes</span>App
          </h1>
        </div>

        {/* Links & Auth Section */}
        <div className="flex gap-7 items-center">
          <ul className="hidden md:flex gap-7 items-center text-gray-700 font-semibold">
            <li className="hover:text-green-600 cursor-pointer transition-colors">Features</li>
            <li className="hover:text-green-600 cursor-pointer transition-colors">Pricing</li>
            <li className="hover:text-green-600 cursor-pointer transition-colors">About</li>
          </ul>

          <div className="relative">
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 focus:outline-none"
                >
                  <div className="h-9 w-9 rounded-full bg-green-600 flex items-center justify-center text-white font-bold border-2 border-green-100 overflow-hidden">
                    {user?.avatar ? (
                      <img src={user.avatar} alt="User" className="h-full w-full object-cover" />
                    ) : (
                      user?.username?.charAt(0).toUpperCase() || "U"
                    )}
                  </div>
                  <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Custom Dropdown Menu */}
                {isDropdownOpen && (
                  <>
                    {/* Backdrop to close dropdown when clicking outside */}
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setIsDropdownOpen(false)}
                    ></div>
                    
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-lg shadow-xl z-20 overflow-hidden py-1">
                      <div className="px-4 py-2 border-b border-gray-50">
                        <p className="text-sm font-bold text-gray-800 truncate">{user?.username || "Account"}</p>
                        <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                      </div>

                      <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-green-50 transition-colors text-left">
                        <User size={16} className="text-gray-400" /> Profile
                      </button>
                      
                      <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-green-50 transition-colors text-left">
                        <BookA size={16} className="text-gray-400" /> My Notes
                      </button>

                      <div className="border-t border-gray-50 my-1"></div>
                      
                      <button 
                        onClick={logoutHandler}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                      >
                        <LogOut size={16} /> Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link 
                to="/login" 
                className="bg-green-600 text-white px-5 py-2 rounded-md font-semibold hover:bg-green-700 transition-all shadow-sm"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;