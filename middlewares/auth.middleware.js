
const jwt=require("jsonwebtoken");
const config=require("../configs/auth.config");

verifyToken=(req,res,next)=>{

    let token=req.headers["x-access-token"];

    //if no token passed by user, throw error.
    if(!token){
        return res.status(403).send({
            message:"No token provided"
        });
    }
    
    //Do the verification of the token
    jwt.verify(token,config.secret,(err,decoded)=>{
        if(err){
            return res.status(401).send({
                message:"unathorised!"
            });
        }
        console.log("decoded");
        req.user_email=decoded.user_email;
        next();
    })
}

module.exports={verifyToken};