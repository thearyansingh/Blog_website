import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Home from './Pages/Home';
import Creators from './Pages/Creators';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Dashboard from './Pages/Dashboard';
import MainBlog from './Pages/MainBlog';
import { useAuth } from './Context/AuthProvider';

export default function MainContent() {
  const location = useLocation();
  const hideNavFoot = ["/Dashboard", "/Login", "/Register"].includes(location.pathname);
  const { Blogs } = useAuth();
  
  console.log(Blogs);

  return (
    <>
      {!hideNavFoot && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Blog" element={<MainBlog />} />
        <Route path="/Creators" element={<Creators />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
      {!hideNavFoot && <Footer />}
    </>
  );
}
