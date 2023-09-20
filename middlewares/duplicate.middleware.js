const db=require("../models");
const User=db.users;

checkDuplicateUserEmail=(req,res,next)=>{

    console.log("Inside the checking if the duplicate email exists");

    User.findOne({
        where:{
            user_email:req.body.user_email
        }
    })
     .then(email=>{
            //Check Email
            if(email){
                res.status(400).send({
                    message:"Failed! Email is already in use!"
                })
                return ;
            }
          next();
        });

};


module.exports={checkDuplicateUserEmail};