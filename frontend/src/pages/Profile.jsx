import React from "react";
import { useNavigate } from "react-router-dom";
import { getData } from "../context/userContext";
import { User, Mail, ShieldCheck, Calendar, ArrowLeft } from "lucide-react";

const Profile = () => {
  const { user } = getData();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 relative">
      <div className="absolute top-8 left-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-green-700 hover:text-green-800 transition-colors font-semibold"
        >
          <ArrowLeft size={20} /> Back
        </button>
      </div>
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-green-600 h-32 relative">
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
            <div className="h-24 w-24 rounded-full bg-white p-1 shadow-lg">
              <div className="h-full w-full rounded-full bg-green-100 flex items-center justify-center text-green-600 overflow-hidden">
                {user?.avatar ? (
                  <img src={user.avatar} alt="Profile" className="h-full w-full object-cover" />
                ) : (
                  <User size={40} />
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-16 pb-8 px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900">{user?.username || "Guest User"}</h2>
          <p className="text-gray-500 mb-6">{user?.isGuest ? "Temporary Guest Account" : "Verified Member"}</p>
          
          <div className="space-y-4 text-left">
            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
              <div className="bg-white p-2 rounded-md shadow-sm">
                <Mail size={18} className="text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Email Address</p>
                <p className="text-gray-700 font-semibold">{user?.email || "No email provided"}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
              <div className="bg-white p-2 rounded-md shadow-sm">
                <ShieldCheck size={18} className="text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Account Status</p>
                <p className="text-gray-700 font-semibold">{user?.isVerified ? "Verified" : "Unverified"}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
              <div className="bg-white p-2 rounded-md shadow-sm">
                <Calendar size={18} className="text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Joined On</p>
                <p className="text-gray-700 font-semibold">
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Today"}
                </p>
              </div>
            </div>
          </div>

          <button className="mt-8 w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold transition-all shadow-md active:scale-95">
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
