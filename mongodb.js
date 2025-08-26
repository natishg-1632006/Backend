const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/studentData")
.then(()=>console.log("MongoDB connected"))
.catch(err=>console.log("DB Connection Error:",err));

const studentSchema=new mongoose.Schema({
    name:String,
    age:Number,
    department:String,
    rollNo:String
})

const Student=mongoose.model("Student",studentSchema);

app.post('/insert',async (req,res)=>{
    const {name,age,department,rollNo}=req.body;
    const newStudent=new Student({name,age,department,rollNo});
    try{
        await newStudent.save();
        res.status(200).send("Student inserted");
    }
    catch(error){
        res.status(400).send("Error in Student");
    }
})

app.get("/getAllData",async(req,res)=>{
    try{
        const data=await Student.find();
        res.send(data);
    }
    catch(error){
        res.status(500).send("Error in fetching data");
    }
})

app.get("/getByRollNo",async(req,res)=>{
    try{
        const {rollNo}=req.body;
        const data=await Student.findOne({rollNo});
        if(data){
            res.send(data)
        }
        else{
            res.status(404).send("Student not found");
        }
    }
    catch(error){
        res.status(500).send("Error in fetching data");
    }
})

app.get("/getByRollNoByParams/:rollNo",async(req,res)=>{
    try{
        const {rollNo}=req.params;
        const data=await Student.findOne({rollNo});
        if(data){
            res.send(data)
        }
        else{
            res.status(404).send("Student not found");
        }
    }
    catch(error){
        res.status(500).send("Error in fetching data");
    }
})

app.get("/getByRollNoByQuery",async(req,res)=>{
    try{
        const {rollNo}=req.query;
        const data=await Student.findOne({rollNo});
        if(data){
            res.send(data)
        }
        else{
            res.status(404).send("Student not found");
        }
    }
    catch(error){
        res.status(500).send("Error in fetching data");
    }
})

app.delete("/deleteData",async (req,res)=>{
    const {rollNo}=req.body;
    try {
        const deleteCount=await Student.deleteOne({rollNo});
        if(deleteCount.deletedCount>0){
            res.send("Data deleted Successfully");
        }
        else{
            res.send("Data not found to delete")
        }
    } catch (error) {
        res.send("Error in deleting data");
    }
})

// Edit data

app.put("/updateData",async(req,res)=>{
    const{rollNo,name,age,department}=req.body;
    try{
        const updatedata=await Student.findOneAndUpdate(
            {rollNo},
            {name,age,department},
            {new:true}
        )
        if(updatedata){
            res.send("Student updated");
        }
        else{
            res.send("student not found");
        }
    }catch(error){
            res.send("Error in edit data");
    }
})

app.listen(3000);