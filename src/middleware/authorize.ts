import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import appConfig from "../config"
import { roles } from "../utils/rbacConfig";

export const authorize = (permission: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
      // Extract the token from the Authorization header
      const token = req.headers["authorization"]?.split(" ")[1]; // Bearer <token>
  
      if (!token) {
        return res.status(401).json({ message: "No token provided" });
      }
  
      // Decode and verify the JWT token
      jwt.verify(token, appConfig.JWT_TOKEN_SECRET, (err:any, decoded :any) => {
        if (err) {
          return res.status(403).json({ message: "Invalid or expired token" });
        }
  
        // Ensure decoded payload contains role and other necessary fields
        const user = decoded as { id: string; email: string; role: string } | undefined;
  
        if (!user || !user.role) {
          return res.status(403).json({ message: "User role not found in token" });
        }
  
        // Check if user has the required permission
        const rolePermissions = roles[user.role]?.can || [];
  
        if (!rolePermissions.includes(permission)) {
          return res.status(403).json({ message: "Access denied: Insufficient permissions" });
        }
  
        // Proceed to the next middleware
        next();
      });
    };
  };