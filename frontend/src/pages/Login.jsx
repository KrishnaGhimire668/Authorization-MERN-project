import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { getData } from "../context/userContext";
import Google from "../assets/googleLogo.png"

const Login = () => {
  const {setUser} = getData()
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await axios.post(
        `http://localhost:5500/user/login`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res.data.success) {
        navigate('/')
        setUser(res.data.user)
        localStorage.setItem('accessToken', res.data.accessToken)
        toast.success(res.data.message || "Logged in successfully");
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Something went wrong";
      toast.error(errorMsg);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-green-100 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-green-600">
            Login into your account
          </h1>
          <p className="text-gray-600">
            Start organizing your thoughts and ideas today
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-6 pb-0 text-center">
            <h2 className="text-2xl font-semibold text-green-600">Login</h2>
            <p className="text-sm text-gray-500 mt-1">
              Welcome back! Please enter your details.
            </p>
          </div>

          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Email</label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="m@example.com"
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>


              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium leading-none">Password</label>
                  <Link to="/forgot-password" intrinsic="true" className="text-xs text-green-600 hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>


              <div className="pt-4 space-y-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    "Login"
                  )}
                </button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-300"></span>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">Or continue with</span>
                  </div>
                </div>

                <button 
                  type="button" 
                  onClick={() => window.open("http://localhost:5500/auth/google", "_self")} 
                  className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 border border-gray-300 rounded-md transition-all shadow-sm"
                >
                  <img src={Google} alt="Google" className="w-5 h-5"/>
                  Login with Google
                </button>
              </div>
            </form>
          </div>


          <div className="p-6 pt-0 text-center">
             <p className="text-sm text-gray-500">
                Don't have an account?{" "}
                <Link to="/signup" className="text-green-600 hover:underline font-medium">
                  Signup here
                </Link>
              </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;