// core Modules:- HTMLOutputElement,https,fs,path,Os
const http=require('http');
const server=http.createServer((req,res)=>{
    console.log(req);
});

server.listen(3000);