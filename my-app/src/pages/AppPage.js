import React from "react";
import Graph from "../components/Graph";
import Form from "../components/Form";
 
function AppPage() {
  return (
  <div className="App">
    <div className="container mx-auto max-w-6xl text-center drop-shadow-lg text-gray-800">
      <h1 className="text-4xl py-8 mb-10 bg-blue-500 text-white rounded  ">Expense Manager</h1>
 
      {/* grid columns */}
      <div className="grid md:grid-cols-2 gap-4">
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