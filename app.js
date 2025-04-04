// core Modules:- HTMLOutputElement,https,fs,path,Os
const http=require('http');

const routes=require('./routes')
const server=http.createServer(routes.handler);
console.log(routes.message);
server.listen(3000);