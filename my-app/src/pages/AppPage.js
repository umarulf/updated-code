import React from "react";
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Graph from "../components/Graph";
import Form from "../components/Form";
import './AppPage.css';

function AppPage() {
  // Function to handle logout (if needed)
  const handleLogout = () => {
    // Additional logout logic can be added here (e.g., clearing local storage)
    console.log("User logged out");
  };

  return (
    <div className="App bg-black">
      <div className="container mx-auto max-w-3xl text-center drop-shadow-lg text-gray-800 border  bg-slate-400">
        <h1 className="text-4xl py-8 mb-4 bg-blue-500 text-white rounded">
          Expense Manager
        </h1>
  
        {/* Logout Button */}
        <div className="logout-button">
          <Link to="/" onClick={handleLogout}>
            <button className="border py-2 px-4 text-white bg-red-500 hover:bg-red-600 rounded-md">
              Logout
            </button>
          </Link>
        </div>
  
        {/* Grid columns */}
        <div className=" grid grid-cols-1 gap-4">
          <Form></Form>
          {/* Chart */}
          <Graph></Graph>
          {/* Form */}
        </div>
      </div>
    </div>
  );
  
}

export default AppPage;


// og