import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Zap } from "lucide-react";

const Hero = () => {
  const navigate = useNavigate();

  const user = null;

  return (
    <div className="relative w-full md:min-h-[700px] min-h-screen bg-green-50 overflow-hidden flex items-center justify-center">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center space-y-8 text-center">
            {user && (
              <h1 className="font-bold text-2xl text-gray-800">
                Welcome {user.username}
              </h1>
            )}

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
                onClick={() => navigate("/create-todo")}
                className="group flex items-center justify-center h-12 px-8 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md transition-all shadow-md active:scale-95 w-full sm:w-auto"
              >
                Start Taking Notes
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button className="flex items-center justify-center h-12 px-8 bg-white border border-gray-300 hover:border-green-600 hover:text-green-600 text-gray-700 font-semibold rounded-md transition-all shadow-sm w-full sm:w-auto">
                Watch Demo
              </button>
            </div>

            <p className="text-sm font-medium text-green-800/80">
              Free forever • No credit card required • 2 minutes setup
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
