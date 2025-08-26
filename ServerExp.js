const express=require("express");//used to import the express 
const app=express();//it will convert the class  to object to get all the method
const serverFun=require("./ServerFun");
//app.post()
//app.get()
//app.put()
//app.delete()
//app.listen()

app.use(express.json());//it will used for convert the string to json format

app.post("/insert",serverFun.insertData);
app.get("/getAllData",serverFun.getData);
app.get("/getDataByRollNo",serverFun.getDataByRollNo);
app.get("/getDataByName",serverFun.getDataByName);
app.delete("/deleteData",serverFun.deleteData);
app.put("/editData",serverFun.editData);

app.get('/paramscheck/:id',(req,res)=>{
    console.log(req.params.id);
    res.send("params checked");
})

app.get("/querycheck",(req,res)=>{
    console.log(req.query);
    res.send("Query params checked") 
})

app.listen(3000);


// npm i mongoose