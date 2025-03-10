const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req,res,next) =>{
const token = req.header('Authorization')?.replace('Bearer ','');
if(!token) return res.status(401).json({message:"Access denied"});
try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id);
    next();
}
catch(err){
    res.status(400).json({message:'Invalid token'});
}
};

const isAdmin = (req,res,next) => {
    if(req.user.role !== 'admin'){
        return res.status(403).json({message:'Access denied , Admin access required'});
    }
    next();
};
module.exports={ authMiddleware,isAdmin };