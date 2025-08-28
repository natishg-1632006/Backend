const express=require("express");
const jwt=require("jsonwebtoken");
const app=express();
app.use(express.json());

app.post("/login",(req,res)=>{
    let {username,password}=req.body;
    if(username=="admin" && password=="admin@123"){
        let token=jwt.sign({username},"SECREATKEY",{
            expiresIn:"1h"
        });
        res.send(token);
    }
});


app.post("/verify",(req,res)=>{
    let token=req.body.token;
    if(!token) return res.send("No token found");
    jwt.verify(token,"SECREATKEY",(err,decode)=>{
        if(err) return res.send("Invalid token");
        console.log(decode);
        res.sendStatus(200);
    });
});

app.listen(3000);
//