import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/signup";
import Basicinfo from "./pages/basicinfo";
import Propertydetails from "./pages/propertydetails";
import Generalinfo from  "./pages/generalinfo";
import Locationinfo from "./pages/locationinfo";
import Login from "./pages/login";
import Web from "./pages/web";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/web" element={<Web />} />
        
        <Route path="/basicinfo" element={<Basicinfo />} />
        <Route path="/propertydetails" element={<Propertydetails />} />
        <Route path="/generalinfo" element={<Generalinfo />} />
        <Route path="/locationinfo" element={<Locationinfo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
