const path = require('path');
const http = require('node:http');
const fs = require('node:fs/promises');



const PORT = 3000;
const sendFile = async (fileName, responce, statusCode) => {
    const fullPath = path.join(__dirname, "public", `${fileName}.html`);
    const page = await fs.readFile(fullPath, "utf-8");

    responce.statusCode = statusCode;
    responce.end(page);
};

const server = http.createServer(async (request, responce) => {
    responce.setHeader("Content-type", "text/html; charset=utf-8");

    if (request.url === "/") {
        await sendFile("index", responce, 200);
    } else if (request.url === "/about") {
        await sendFile("about", responce, 200);
    } else {
        await sendFile("404", responce, 404);
    }
});

server.listen(PORT);
console.log(`Server is already runing on adres: http://localhost:${PORT} .....`);