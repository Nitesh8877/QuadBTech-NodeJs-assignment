const express=require('express');
const bodyParser=require('body-parser');


const app=express();


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

require("./routes/user.routes")(app);

app.listen(4004,()=>{
    console.log(`Appliction started on the port no: 4004`);
})