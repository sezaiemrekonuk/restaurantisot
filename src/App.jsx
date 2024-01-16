import React from "react";
import MainComp from "./components/main/mainComp.jsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ImageLoadingProvider from "./context/ImageLoadingContext.jsx";
import "./index.css";
import './style.css';
// Import css files
import './styles/tailwind.css';
import Payment from "../src/pages/Payment.jsx"
import Cancel from "./pages/Error.jsx";
import Success from "./pages/Success.jsx";
import Scanner from "./components/Scanner/Scanner.jsx"
import Login from "./pages/Login.jsx";
import Admin from "./pages/Admin.jsx";
import Campaign from "./pages/Campaign.jsx";
import Footer from "./components/Footer/Footer.jsx";


const App = () => {



  return (
    

<>
<BrowserRouter>
<Routes>
    <Route path="/">
    <Route
              index
              element={
                 <ImageLoadingProvider>
                  <MainComp/>
                  </ImageLoadingProvider>
                
              }
            />
    <Route path="/payments" element={<Payment />}/>
    <Route path="/cancel" element={<Cancel />}/>
    <Route path="/success" element={<Success />}/>
    <Route path="/scan" element={<Scanner />}/>
    <Route path="/login" element={<Login />}/>
    <Route path="/admin" element={<Admin />}/>
    <Route path="/campaign" element={<Campaign />}/>
    </Route>
   
    </Routes>
    </BrowserRouter>
</>
  );
};

export default App;
