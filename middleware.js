const express=require('express');
const app=express();
app.use(express.json());

app.post("/data",middleWare,sendData)

function sendData(req,res){
    const data=req.body;
    res.json({message:'Data received',data:data});
}

function middleWare(req,res,next){
    console.log("MiddleWare Executed");
    next();
}

app.listen(8000);