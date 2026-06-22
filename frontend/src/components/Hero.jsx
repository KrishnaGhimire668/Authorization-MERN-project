import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Zap, Play, X, CheckCircle, Star } from "lucide-react";
import { getData } from "../context/userContext";

const Hero = () => {
  const navigate = useNavigate();
  const { user } = getData();
  const [showDemo, setShowDemo] = useState(false);

  return (
    <div className="relative w-full md:min-h-[700px] min-h-screen bg-green-50 overflow-hidden flex items-center justify-center">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center space-y-8 text-center">
            
            <div className="space-y-4">
              <div className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800 border border-green-200 mx-auto">
                <Zap className="w-3 h-3 mr-1 fill-green-600" />
                New: AI-powered note organization
              </div>

              <h1 className="text-green-600 text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                Your thoughts, organized and accessible
                <span className="text-gray-900 block md:inline">
                  {" "}
                  everywhere
                </span>
              </h1>

              <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl leading-relaxed">
                Capture ideas, organize thoughts, and collaborate seamlessly.
                The modern note-taking app that grows with you and keeps your
                ideas secure in the cloud.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full px-4">
              <button
                onClick={() => navigate("/dashboard")}
                className="group flex items-center justify-center h-12 px-8 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md transition-all shadow-md active:scale-95 w-full sm:w-auto"
              >
                {user ? "Go to Workspace" : "Start Taking Notes"}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button 
                onClick={() => setShowDemo(true)}
                className="flex items-center justify-center h-12 px-8 bg-white border border-gray-300 hover:border-green-600 hover:text-green-600 text-gray-700 font-semibold rounded-md transition-all shadow-sm w-full sm:w-auto"
              >
                <Play className="mr-2 h-4 w-4" /> Platform Tour
              </button>
            </div>

            <p className="text-sm font-medium text-green-800/80">
              Free forever • No credit card required • 2 minutes setup
            </p>
          </div>
        </div>
      </section>

      {/* Demo Modal */}
      {showDemo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden relative animate-in fade-in zoom-in duration-300 border-2 border-green-500/20">
            <button 
              onClick={() => setShowDemo(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors z-10"
            >
              <X size={18} className="text-slate-600" />
            </button>
            
            <div className="p-10 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="text-green-600" size={32} />
              </div>
              
              <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Platform Overview</h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                {user 
                  ? `Welcome back, ${user.username}! You're currently using the cloud-powered workspace with full synchronization.`
                  : "Join thousands of users organizing their professional life with our cloud-ready workspace. Create an account to unlock all features."
                }
              </p>
              
              <div className="space-y-4 mb-10 text-left bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-green-500" size={20} />
                  <span className="text-slate-700 font-medium">Full Cloud Sync & Persistence</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-green-500" size={20} />
                  <span className="text-slate-700 font-medium">Cross-device Note Management</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-green-500" size={20} />
                  <span className="text-slate-700 font-medium">Encrypted Data Storage</span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                {user ? (
                  <button 
                    onClick={() => navigate("/dashboard")}
                    className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-green-700 transition-all shadow-lg shadow-green-100 active:scale-[0.98]"
                  >
                    Enter My Workspace
                  </button>
                ) : (
                  <>
                    <button 
                      onClick={() => navigate("/signup")}
                      className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-green-700 transition-all shadow-lg shadow-green-100 active:scale-[0.98]"
                    >
                      Create Free Account
                    </button>
                    <button 
                       onClick={() => navigate("/login")}
                       className="w-full bg-white text-green-600 border-2 border-green-600 py-4 rounded-2xl font-bold text-lg hover:bg-green-50 transition-all active:scale-[0.98]"
                    >
                      Sign In
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
