import User from "../models/userSchema.model.js";
import jwt from "jsonwebtoken";


export const auth = (req, res, next) => {
try{
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token) {

   const user=  jwt.verify(token, process.env.JWT_SECRET)
    req.user = user;
    next();
  }
  
  else {
        return res.status(401).json({ message: "Access token is missing" });
  }

}
catch (error) {
    console.log("Authentication Error");
  console.error(error);
  return res.status(403).json({ message: error.message || "Forbidden" });
  }
 
    
  };

