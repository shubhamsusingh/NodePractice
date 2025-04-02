// core Modules:- HTMLOutputElement,https,fs,path,Os
const http=require('http');
const server=http.createServer((req,res)=>{
    const url=req.url;
    if(url=='/'){
        res.write('<html><head><title></title></head><body><form action="message" method="POST"><input></input><button type="submit">send</button></form></body></html>');
        return res.end();
    }
    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<head><title>My first Page</title></head>');
    res.write('<body>');
    res.write('<h1>Hello from my Node.js Server!</h1>');
    res.write('</body>');
    res.end();
    console.log(req);
});

server.listen(3000);