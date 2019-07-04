//jshint esversion:6

const express= require("express");
const bodyparser= require("body-parser");
 const app= express();
const request= require("request");
 app.use(bodyparser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){

// console.log(req.body.crypto);
var crypto= req.body.crypto;
var fiat=req.body.fiat;
var amount=req.body.amount;
var baseurl="https://apiv2.bitcoinaverage.com/indices/global/ticker/";
var finalurl= baseurl + crypto + fiat ;
var option={

url: "https://apiv2.bitcoinaverage.com/convert/global",
method: "Get",
qs: {

from: crypto,
to:fiat,
amount: amount
}
};
request(option,function(error,response,body){

  var data= JSON.parse(body);
  var price= data.price;
 var cdate= data.time;
console.log(price);
 res.write("<p> <h2>The current date and time is :"+cdate+"</h2></p>");
  res.write("<h1>The price of "+amount+"  "+crypto+"  "+" is : "+price+"   "+fiat+"</h1>");
  res.send();
});

});

 app.listen(3000,function(){

console.log("server is running on port 3000");

 });
