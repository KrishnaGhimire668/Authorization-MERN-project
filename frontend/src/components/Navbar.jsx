import { BookOpen, User, BookA, LogOut, ChevronDown, Check, Star, Info, X } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getData } from "../context/userContext";
import axios from "axios";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../config/api";

const Navbar = () => {
  const { user, setUser } = getData();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null); // 'features', 'pricing', 'about'

  const accessToken = localStorage.getItem('accessToken');

  const logoutHandler = async () => {
    try {
      const res = await axios.post(`${API_BASE_URL}/user/logout`, {}, {
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

  const Modal = ({ title, icon: Icon, children, onClose }) => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-8 relative animate-in fade-in slide-in-from-bottom-4 duration-300">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors">
          <X size={20} />
        </button>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-green-100 text-green-600 rounded-xl">
            <Icon size={24} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        </div>
        {children}
        <button 
          onClick={onClose}
          className="mt-8 w-full py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all shadow-md active:scale-95"
        >
          Got it
        </button>
      </div>
    </div>
  );

  return (
    <nav className="p-2 border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
        
        {/* Logo Section */}
        <Link to="/" className="flex gap-2 items-center">
          <BookOpen className="h-6 w-6 text-green-800" />
          <h1 className="font-bold text-xl">
            <span className="text-green-600">Notes</span>App
          </h1>
        </Link>

        {/* Links & Auth Section */}
        <div className="flex gap-7 items-center">
          <ul className="hidden md:flex gap-7 items-center text-gray-700 font-semibold">
            <li 
              onClick={() => setActiveModal('features')}
              className="hover:text-green-600 cursor-pointer transition-colors"
            >
              Features
            </li>
            <li 
              onClick={() => setActiveModal('pricing')}
              className="hover:text-green-600 cursor-pointer transition-colors"
            >
              Pricing
            </li>
            <li 
              onClick={() => setActiveModal('about')}
              className="hover:text-green-600 cursor-pointer transition-colors"
            >
              About
            </li>
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

                {isDropdownOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setIsDropdownOpen(false)}
                    ></div>
                    
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-lg shadow-xl z-20 overflow-hidden py-1">
                      <div className="px-4 py-2 border-b border-gray-50">
                        <p className="text-sm font-bold text-gray-800 truncate">{user?.username || "Account"}</p>
                        <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                      </div>

                      <Link 
                        to="/profile"
                        onClick={() => setIsDropdownOpen(false)}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-green-50 transition-colors text-left"
                      >
                        <User size={16} className="text-gray-400" /> Profile
                      </Link>
                      
                      <Link 
                        to="/dashboard"
                        onClick={() => setIsDropdownOpen(false)}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-green-50 transition-colors text-left"
                      >
                        <BookA size={16} className="text-gray-400" /> My Notes
                      </Link>

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

      {/* Nav Modals */}
      {activeModal === 'features' && (
        <Modal title="Features" icon={Star} onClose={() => setActiveModal(null)}>
          <div className="space-y-4">
            <div className="flex gap-3">
              <Check className="text-green-600" />
              <p><strong>Cloud Sync:</strong> Access your notes everywhere.</p>
            </div>
            <div className="flex gap-3">
              <Check className="text-green-600" />
              <p><strong>Demo Mode:</strong> Try the app without an account.</p>
            </div>
            <div className="flex gap-3">
              <Check className="text-green-600" />
              <p><strong>Secure Auth:</strong> Powered by Google OAuth.</p>
            </div>
          </div>
        </Modal>
      )}

      {activeModal === 'pricing' && (
        <Modal title="Pricing" icon={Check} onClose={() => setActiveModal(null)}>
          <div className="text-center p-6 bg-green-50 rounded-2xl">
            <h3 className="text-4xl font-black text-green-600">$0</h3>
            <p className="text-gray-600 mt-2">Free Forever</p>
            <p className="text-sm text-gray-400 mt-4 italic">No credit card. No hidden fees. Just note taking.</p>
          </div>
        </Modal>
      )}

      {activeModal === 'about' && (
        <Modal title="About" icon={Info} onClose={() => setActiveModal(null)}>
          <p className="text-gray-600 leading-relaxed">
            NotesApp is designed for speed and simplicity. We built it to help you capture your thoughts the moment they happen, whether you're logged in or just visiting.
          </p>
        </Modal>
      )}
    </nav>
  );
};

export default Navbar;