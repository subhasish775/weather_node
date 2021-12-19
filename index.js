const http = require("http");
const fs = require("fs");
const requests = require("requests");
const indexFile = fs.readFileSync("index.html", "utf-8");

const replaceVal = (tempVal, orgVal)=>{
 let temperature = tempVal.replace("{%tempval%}", orgVal.main.temp);
  temperature = temperature.replace("{%tempmin%}", orgVal.main.temp_min);
  temperature = temperature.replace("{%tempmax%}", orgVal.main.temp_max);
  temperature = temperature.replace("{%location%}", orgVal.name);
  temperature = temperature.replace("{%country%}", orgVal.sys.country);
  temperature = temperature.replace("{tempstatus}"), orgVal.weather[0].main; 
  return temperature;
};

const server = http.createServer((req,res)=>{
    if(req.url =="/"){
        requests("https://api.openweathermap.org/data/2.5/weather?q=Pune&appid=0f275e83f82c27a783c667ed995374a4")
        .on("data", (chunk)=>{
            const objdata = JSON.parse(chunk);
            const arrData = [objdata];
            const realTimeData = arrData.map((val)=> replaceVal(indexFile,val)).join("");
            res.write(realTimeData);
            // console.log(realTimeData);
                
            
            // console.log(arrData[0].main.temp);
            // json --> object ---> Array 
        })
        .on("end", (err)=>{
            if(err) return console.log("connection closed  due to errors",err);
            res.end();
        });
    }
});
server.listen(8000, "127.0.0.1");