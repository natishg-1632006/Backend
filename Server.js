//step 1: npm init will used for create a new file
//step 2: creating a server

// const http=require('http');
// const fs=require('fs');
// const server=http.createServer((req, res)=>{
//     // res.write(`<h1>Node</h1>`);
//     // if(req.url=="/"){
//     //     res.write(`<h1>Home page</h1>`);
//     // }else if(req.url=="/About"){
//     //     res.write(`<h1>About page</h1>`);
//     // }else{
//     //     res.write(`<h1>404 Page not found</h1>`);
//     // }
//     fs.readFile('index.html',(err,data)=>{
//         if(err){
//             res.write("Error in loading");
//         }else{
//             res.writeHead(200,{'Content-type':'text/html'});
//             res.write(data);
//         }
//          res.end();
//     })
   
// });

// server.listen(3000,()=>{
//     console.log("Server"); 
// });

//file handling

// const fs=require('fs');
// fs.writeFile('output.txt','Hello',(err)=>{
//     if(err)throw err;
//     console.log('file has been created');
// })

// const http=require("http");
// const server=http.createServer((req,res)=>{
//    if(req.url=="/"){
//      res.write(`<h1>welcome to node home</h1>`);
//    }
//    else if(req.url=="/About"){
//      res.write(`<h1>welcome to node About</h1>`);
//    }
//    else{
//      res.write(`<h1>404 Page not found</h1>`);
//    }
//     res.end();
// });

// server.listen(3000,()=>{
//     console.log("server");
    
// })

//Day-2 of backend
//http://localhost:3000
//GET will used for fetch the data
//POST to insert the data
//PUT to edit the data
//DELET to delet the data
//PATCH to edit the data not used

// Default method of server is GET
// Default method of browser is GET

// const http=require('http');
// http.createServer((req,res)=>{
//   console.log(req.method);
//   res.end("Server called");
// }).listen(3000);

// const http=require('http');
// const data=[];
// http.createServer((req,res)=>{
//   if(req.method=="POST"){
//     console.log(req.body);
//     data.push(req.body);
//     console.log(data)
//     req.statusCode=200;
//     res.end("data insetred")
//   }
// }).listen(3000);

const http=require('http');

const data=[];

http.createServer((req,res)=>{
  if(req.method=="POST"){
    let body='';
    req.on('data',chunk=>{
      body+=chunk;
    });

    req.on('end',()=>{
      let finalData=JSON.parse(body);
      data.push(finalData);
      console.log(data);
      res.statusCode=200;
      res.end("Data inserted");
    });
  }

  if(req.method=="GET"){
      if(req.url=="/rollNo"){
        let body='';
        req.on('data',chunk=>{
          body+=chunk;
        })
  
        req.on('end',()=>{
          if(body){
            let finalData=JSON.parse(body);
            if(finalData.rollNo){
              let result=data.find(s=>s.rollNo===finalData.rollNo);
              res.end(JSON.stringify(result || {}));
              return;
            }
          }
        });
      }
      else{
            res.end(JSON.stringify(data));
        
      }
  }

  if(req.method=="DELETE"){
          let body='';
      req.on('data',chunk=>{
        body+=chunk;
      })
      req.on('end',()=>{
          let finalData=JSON.parse(body);
            let result=data.findIndex(s=>s.rollNo=finalData.rollNo);
              data.splice(result,1);
              console.log(data);              
              res.end("Data Deleted");
        });
  }

  if(req.method=="PUT"){
    let body="";
    req.on('data',chunk=>{
      body+=chunk;
    })

    req.on('end',()=>{
      let finalData=JSON.parse(body);
      let result=data.findIndex(s=>s.rollNo=finalData.rollNo);
      data[result]=finalData;
      console.log(data);
      res.end("Data Updated");

    })
  }

}).listen(3000);











































// let arr=["EVEN","ODD"];
// console.log(arr[5%2]);
