import React from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from './Context/AuthProvider';

// Layout Components
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';

// Page Components
import Home from './Pages/Home';
import Creators from './Pages/Creators';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Detail from './Pages/Detail';

// Dashboard Components
import Dashboard from './Pages/Dashboard';
import MyProfile from './Dashboard/MyProfile';
import Blogcreate from './Dashboard/Blogcreate';
import Myblog from './Dashboard/Myblog';
import Updateblog from './Dashboard/Updateblog';
import Blogs from './Components/Blogs';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

const MainContent = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  
  // Pages that should hide navbar and footer
  const hideNavFoot = [
    "/dashboard",
    "/login",
    "/register",
    "/blogcreate",
    "/profile",
    "/blog/update"
  ].some(path => location.pathname.startsWith(path));

  return (
    <>
      {!hideNavFoot && <Navbar />}
      
      <main className="min-h-screen">
        <Routes>
          {/* Public Routes */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/creator" element={<Creators />} />
          <Route path="/blog" element={<Blogs />} />
          <Route path="/blog/detail/:id" element={<Detail />} />
          <Route path="/Home/detail/:id" element={<Detail />} />
          
          {/* Authentication Routes */}
          <Route
            path="/login"
            element={
              isAuthenticated ? <Navigate to="/" replace /> : <Login />
            }
          />
          <Route
            path="/register"
            element={
              isAuthenticated ? <Navigate to="/" replace /> : <Register />
            }
          />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              isAuthenticated ? <Home /> : <Navigate to="/login" replace />
            }
          />
          
          {/* Protected Dashboard Routes */}
          <Route
            path="/Home"
            element={
              <ProtectedRoute>
              <Home/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/blogcreate"
            element={
              <ProtectedRoute>
                <Blogcreate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/myblog"
            element={
              <ProtectedRoute>
                <Myblog />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <MyProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/blog/update/:id"
            element={
              <ProtectedRoute>
                <Updateblog />
              </ProtectedRoute>
            }
          />

          {/* Catch-all route - redirects to home if authenticated, login if not */}
          <Route
            path=""
            element={
              <Navigate to={isAuthenticated ? "/" : "/login"} replace />
            }
          />
        </Routes>
      </main>

      {!hideNavFoot && <Footer />}
    </>
  );
};

export default MainContent;