import jwt from "jsonwebtoken";
import Usuario from "../modells/Usuario.js";

const checkAuth = async (req, res, next) => {
   
  let token;
  
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        
        token = req.headers.authorization.split(" ")[1];
        
      const decoded = jwt.verify(token, process.env.JWT_SECRET);//FIRMAR jwt
      req.usuario = await Usuario.findById(decoded.id).select('-password -confirmado -token -__v');
      //console.log(req.usuario);
      return next();

      
    } catch (error) {
      return res.status(404).json({ msg: "Hubo un error" });
    }
  }

  if(!token){
    const error = new Error("token NO VALIDO !!!");
    return res.status(401).json({ msg: error.message });
  
  }
   next();
};

export default checkAuth;
