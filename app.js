//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app=express();
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
  res.sendFile(__dirname+"/signup.html");
});

app.post("/failure",(req,res)=>{
  res.redirect("/");
});

app.post("/",(req,res)=>{
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  const data = {
    members:[{
      email_address:email,
      status:"subscribed",
      merge_fields: {
        FNAME:firstName,
        LNAME:lastName
      }
    }]
  };

  const jsonData = JSON.stringify(data);

  const url="https://us14.api.mailchimp.com/3.0/lists/32ac61a1cb";
  const options={
    method:"POST",
    auth:"islamzedd:542819a710a374a59f1742cb98b5b15e-us14"
  };
  const request=https.request(url,options,(response)=>{
    if(response.statusCode == 200){
      res.sendFile(__dirname+"/success.html");
    }
    else{
      res.sendFile(__dirname+"/failure.html");
    }

    response.on("data",(data)=>{
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();
});

app.listen(process.env.PORT || 3000,()=>{
  console.log("Listening on port 3000");
});


//542819a710a374a59f1742cb98b5b15e-us14

//list-id
//32ac61a1cb
