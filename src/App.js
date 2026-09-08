import "./App.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { AllRoutes } from "./routes/AllRoutes";
import { useState } from "react";


function App() {
  
  return (
    <div className="App">
      <Navbar />
    
      <AllRoutes />
     
      <Footer />

    
    </div>
  );
}

export default App;
