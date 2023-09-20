const db=require("../models");
const config=require("../configs/auth.config.js");

const User=db.users;

var jwt=require('jsonwebtoken');
var bcrypt=require('bcryptjs');

exports.create=(req,res)=>{
console.log("Inside the sign up call")
    User.create({
        user_id:req.body.user_id,
        user_name:req.body.user_name,
        user_email:req.body.user_email,
        user_password:bcrypt.hashSync(req.body.user_password,8),
        user_image:req.body.user_image,
        total_orders:req.body.total_orders,
    })
    .then((user)=>{
            res.status(201).send({
                        message:"User create Successfully !",
                        data:user
                    })
                })
    .catch(err=>{
        res.status(500).send({
            message:err.message
        })
    })
}

exports.auth = (req, res) => {
    
    User.findOne({
        where: {
            user_email: req.body.user_email
        }
    })
    .then(user => {
        if(!user) {
            return res.status(404).send({ message: "User not found"});
        }
        var passwordIsValid = bcrypt.compareSync(req.body.user_password, user.user_password);
        if(!passwordIsValid) {
            return res.status(401).send({
                message: "Invalid Password"
            })
        }

        var token = jwt.sign({id: user.email}, config.secret, {
            expiresIn: 86400 //24 hours
        });

        res.status(200).send({
            user_id: user.id,
            user_email: user.user_email,
            user_name: user.user_name,
            user_image:user.user_image,
            total_orders:user.total_orders,
            accessToken: token
        });
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
};



exports.findAll = (req, res) => {
    let user_email = req.query.user_email;
    let promise;
    if(user_email) {
        promise = User.findAll({
            where: {
                user_email: user_email
            }
        });
    }else{

        promise = User.findAll();
    }

    promise
    .then(users => {
        res.status(200).send(users);
    })
    .catch(err => {
        res.status(500).send({
            message: "Some internal error while fetching the user"
        })
    })
}

exports.findOne = (req, res) => {
    const userId = req.params.id; //1

    User.findByPk(userId)
    .then(user => {
        if(!user){
            return res.status(400).send({
                message:"user not found"
            })
        }
        res.status(200).send(user);
    })
    .catch(err => {
        res.status(500).send({
            message: "Some internal error while fetching the user based on id"
        })
    })
}


exports.update = (req, res) => {

    const user = {
        user_id:req.body.user_id,
        user_name:req.body.user_name,
        user_email:req.body.user_email,
        user_password:bcrypt.hashSync(req.body.user_password,8),
        user_image:req.body.user_image,
        total_orders:req.body.total_orders,
    };
    const userId = req.params.id

    User.update(user, {
        where: {user_id: userId}
    })
    .then(userDetails => {
        User.findByPk(userId)
        .then(user => {
            if(!user){
                res.status(402).send({
                    message:"user not found for given id "
                })
            }
            res.status(200).send(user);
        })
        .catch(err => {
            res.status(500).send({
                message: "Some internal error while fetching the user based on id"
            })
        })
    })
    .catch(err => {
        res.status(500).send({
            message: "Some internal error while updating the user based on id"
        })
    })
}


exports.Delete = (req, res) => {
    const userId = req.params.id;

    User.destroy({
        where: {
            user_id: userId
        }
    })
    .then(result => {
        if(!result){
            res.status(403).send({
                message:"user not found for given user_id"
            })
        }
        res.status(200).send({
            message: "Successfully deleted the user"
        })
    })
    .catch(err => {
        res.status(500).send({
            message: "Some internal error while deleting the user based on id"
        })
    })
}