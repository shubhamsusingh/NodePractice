
// core Modules:- HTMLOutputElement,https,fs,path,Os
const fs = require('fs');
const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if (url == '/') {
        res.write('<html><head><title></title></head><body><form action="/message" method="POST"><input  type="text" name="message"></input><button type="submit">send</button></form></body></html>');
        return res.end();
    }
    if (url == '/message' && method == "POST") {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        req.on('end', () => {
            const parseBody = Buffer.concat(body).toString();
            const message = parseBody.split('=')[1];
            fs.writeFile('message.txt', message, (err) => {
                if (err) {
                    console.error(err);
                    res.statusCode = 500;
                    res.write('<html><body><h1>Error writing to file</h1></body></html>');
                    return res.end();
                }
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });

        });
        // fs.writeFileSync('message.txt',"dummy");
         return;
    }

    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My first Page</title></head>');
    res.write('<body>');
    res.write('<h1>Hello from my Node.js Server!</h1>');
    res.write('</body>');
    res.end();
    console.log(req);


   
};
// module.exports = requestHandler;
module.exports={
    handler:requestHandler,
    message:'app running '
}

