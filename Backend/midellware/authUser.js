import jwt from "jsonwebtoken";
import User from "../Modal/UserModal.js";

// Authentication Middleware
export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    console.log("Middleware", token);
    
    if (!token) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Find the user in the database
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Attach user to request object
    req.user = user;

    // Call the next middleware
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// Authorization Middleware
export const isAdmin = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(403).json({ error: "User role not found, access denied" });
    }

    // Ensure the user's role is one of the allowed roles
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: `User with role ${req.user.role} is not allowed` });
    }

    next();
  };
};
