const path = require('node:path');
const http = require('node:http');
const fs = require('node:fs/promises'); // модуль для чтения удаления 

const PORT = 3000;
const sendFile = async (fileName, responce, statusCode) => {
    try {
        const fullPathHtml = path.join(__dirname, "front", `${fileName}.html`);
        const page = await fs.readFile(fullPathHtml, "utf-8");

        responce.statusCode = statusCode;
        responce.end(page);

    } catch (error) {
        console.log(`На каком та этапе блока try в функции ${sendFile} возникла оошибка с:`, error);
    }
};

const server = http.createServer(async (request, responce) => {
    try {
        responce.setHeader("Content-type", "text/html; charset=utf-8");

        if (request.url === '/') {
            await sendFile("index", responce, 200);
        } else if (request.url === '/contact') {
            await sendFile("contact", responce, 200)
        } else if (request.url === '/api/info') {
            responce.setHeader("Content-type", "application/json; charset=utf-8");
            responce.statusCode = 200;

            const infoOfMyPc = {
                "serverName": "MyPC",
                "version": "1.0.0",
                "status": "working",
            }
            responce.write(JSON.stringify(infoOfMyPc));
            responce.end();
    
        } else {
            await sendFile("404", responce, 404);
        }
    } catch (error) {
        console.log(`На каком та этапе блока try в функции ${server} возникла ошибка с:`, error);
    }
});

server.listen(PORT);
console.log(`Server is already run on adres http://localhost:${PORT}`);