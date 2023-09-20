const {create,auth, update, findAll, findOne, Delete}=require("../Controllers/user.controller");

const {checkDuplicateUserEmail}=require("../middlewares/duplicate.middleware");
const {verifyToken}=require("../middlewares/auth.middleware");

module.exports=function(app){

    app.post("/api/v1/create",checkDuplicateUserEmail, create);

    app.post("/api/v1/signin",auth);

    app.put("/api/v1/update/:id", verifyToken, update);
    app.get("/api/v1/users/", verifyToken,findAll);
    app.get("/api/v1/user/:id",verifyToken,findOne);
    app.delete("/api/v1/user/:id", verifyToken,Delete);
}