import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RxHamburgerMenu } from 'react-icons/rx';
import { IoMdClose } from 'react-icons/io';
import { useAuth } from '../Context/AuthProvider';
import Cookies from 'js-cookie';

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { profile,setIsAuthenticated, isAuthenticated } = useAuth();
  // console.log(profile);
  // console.log(isAuthenticated);
  
  
  
  const toggleMenu = () => {
    setShow(!show);
  };
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        "http://localhost:4001/api/user/logout",
        { withCredentials: true }
      );
    
      Cookies.remove('token'); // Remove token from local storage
      setIsAuthenticated(false);
      navigateTo("/login");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to logout");
    }
  };

  // Check for admin role using the correct profile structure
  const isAdmin = profile?.profile?.role === 'admin';

  return (
    <nav className="navbar max-w-screen-2xl h-16 container bg-white shadow-lg shadow-gray-200 mx-auto md:px-20 px-4 flex justify-between items-center">
      {/* Navbar Logo */}
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost text-2xl">
          <span className="text-blue-500 -mr-1">Blog</span>Ish
        </Link>
      </div>

      {/* Desktop Links */}
      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal px-1 font-medium text-base gap-4">
          <li><Link to="/Home" className="hover:text-blue-500 duration-300">Home</Link></li>
          <li><Link to="/Blog" className="hover:text-blue-500 duration-300">Blogs</Link></li>
          <li><Link to="/Creator" className="hover:text-blue-500 duration-300">Creators</Link></li>
          <li><Link to="/About" className="hover:text-blue-500 duration-300">About</Link></li>
          <li><Link to="/Contact" className="hover:text-blue-500 duration-300">Contact</Link></li>
        </ul>
      </div>

      {/* Mobile Hamburger Icon */}
      <div className="lg:hidden">
        <button 
          onClick={toggleMenu}
          className="text-2xl"
          aria-label={show ? "Close menu" : "Open menu"}
          aria-expanded={show}
        >
          {show ? <IoMdClose /> : <RxHamburgerMenu />}
        </button>
      </div>

      {/* Desktop End Links */}
      <div className="navbar-end hidden md:flex gap-8">
        {isAuthenticated && isAdmin && (
          <Link to="/dashboard" className="bg-blue-400 text-white font-semibold hover:bg-blue-700 duration-300 px-4 py-2 rounded-md">
            DASHBOARD
          </Link>
        )}
        {isAuthenticated ? (
          <button 
            onClick={() => setIsAuthenticated(false)} 
            className="bg-red-400 text-white hover:bg-red-600 duration-300 px-4 py-2 rounded-md"
          >
            LOGOUT
          </button>
        ) : (
          <Link to="/Login" className="bg-green-400 text-white hover:bg-green-600 duration-300 px-4 py-2 rounded-md">
            LOGIN
          </Link>
        )}
      </div>

      {/* Mobile Menu */}
      {show && (
        <div 
          className="lg:hidden absolute top-20 left-0 w-full bg-white shadow-lg z-10 flex flex-col items-center space-y-4 py-4"
          role="dialog"
          aria-modal="true"
        >
          <Link to="/" onClick={toggleMenu}>Home</Link>
          <Link to="/Blog" onClick={toggleMenu}>Blogs</Link>
          <Link to="/Creator" onClick={toggleMenu}>Creators</Link>
          <Link to="/About" onClick={toggleMenu}>About</Link>
          <Link to="/Contact" onClick={toggleMenu}>Contact</Link>
          
          {isAuthenticated && isAdmin && (
            <Link 
              to="/dashboard" 
              className="bg-blue-400 text-white font-semibold hover:bg-blue-700 duration-300 px-4 py-2 rounded-md" 
              onClick={toggleMenu}
            >
              DASHBOARD
            </Link>
          )}
          {isAuthenticated ? (
            <button 
              onClick={() => {
                handleLogout
                setIsAuthenticated(false);
                toggleMenu();
              }} 
              className="bg-red-400 text-white hover:bg-red-600 duration-300 px-4 py-2 rounded-md"
            >
              LOGOUT
            </button>
          ) : (
            <Link 
              to="/Login" 
              className="bg-green-400 text-white hover:bg-green-600 duration-300 px-4 py-2 rounded-md" 
              onClick={toggleMenu}
            >
              LOGIN
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;