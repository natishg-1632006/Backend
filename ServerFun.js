let data=[]

function insertData(req,res){
    console.log("[INFO] Entered into  insert Data");
    const result=data.find((d)=>d.rollNo==req.body.rollNo);
    if(!result){
        console.log("[INFO] No Duplicate Data found");
        data.push(req.body)
        console.log("data:",data);
        res.send("Data inserted");
        console.log("[SUCCESS] Data inserted successfylly");
        
    }
    else{
        console.log("[INFO] Duplicate Data found");
        res.send("already inserted");
    }
}

function getData(req,res){
    console.log("All Data:",data);
    res.send(data);
}

function getDataByRollNo(req,res){
    const result=data.findIndex(d=>d.rollNo==req.body.rollNo)
    if(result!==-1){
        console.log("Filtered Roll Number:",data[result]);
        res.status(200).send("Found Roll number")   
    }
    else{
        console.log("Roll Number not found");
        res.status(404).send("Roll number not found");
        
    }
}

// Filter data by name

function getDataByName(req,res){
    const result=data.filter(d=>d.name==req.body.name);
    if (result.length>0) {
        console.log("Data found:",result);
        res.status(200).send("Name found")
    }
    else{
        console.log("Name not found");
        res.status(404).send("Name not found");
    }
}

function deleteData(req,res){
    const result=data.findIndex(d=>d.rollNo==req.body.rollNo);
    if(result!==-1){
        data.splice(result,1);
        res.status(200).send("Data Deleted")   
    }
    else{
        res.status(200).send("Data not found to delete")
    }
}

function editData(req,res){
    const result=data.findIndex(d=>d.rollNo==req.body.rollNo);
    if(result!==-1){
        data[result]=req.body;
        console.log("Data Updated");
        res.send("Data updated");
    }
    else{
        console.log("Data not found");
        res.send("Data not found for update");
    }
}

module.exports={insertData,getData,getDataByRollNo,getDataByName,deleteData,editData};
