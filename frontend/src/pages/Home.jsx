import React from "react";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import ProtectedRoute from "../components/ProtectedRoute";

const Home = () => {
  return (
    <div className="text-bold ">
      <ProtectedRoute>
        <Navbar />
        <Hero />
      </ProtectedRoute>
    </div>
  );
};

export default Home;
