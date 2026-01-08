const path = require('node:path');
const http = require('node:http');
const fs = require('node:fs/promises'); // модуль для чтения удаления 

const PORT = 3000;
const sendHtml = async (fileName, responce, statusCode) => {
    try {
        const fullPathHtml = path.join(__dirname, "front", `${fileName}.html`);
        const page = await fs.readFile(fullPathHtml, "utf-8");
        responce.setHeader("Content-type", "text/html; charset=utf-8");

        responce.statusCode = statusCode;
        responce.end(page);

    } catch (error) {
        console.log(`На каком та этапе блока try в функции ${sendHtml} возникла оошибка с:`, error);
        responce.statusCode = 500;
        responce.end("Ошибка сервера!");
    }
};

const sendJson = async (fileName, responce, statusCode) => {
    try {
        const fullPathJson = path.join(__dirname, "dirJson", `${fileName}.json`);
        const data = await fs.readFile(fullPathJson, "utf-8");
        responce.setHeader("Content-type", "application/json; charset=utf-8");

        responce.statusCode = statusCode;
        responce.end(data);
        

    } catch (error) {
        console.log(`На каком та этапе блока try в функции ${sendJson} возникла оошибка с:`, error);
        responce.statusCode = 500;
        responce.end("Ошибка сервера!");
    }
};

const server = http.createServer(async (request, responce) => {
    try {
        if (request.url === '/') {
            await sendHtml("index", responce, 200);
        } else if (request.url === '/contact') {
            await sendHtml("contact", responce, 200)
        } else if (request.url === '/api/info') {
            await sendJson("infoApi", responce, 200);    
        } else if (request.url === '/discord') {
            await sendJson("infoDiscord", responce, 200);
        } else {
            await sendHtml("404", responce, 404);
        }
    } catch (error) {
        console.log(`На каком та этапе блока try в функции ${server} возникла ошибка с:`, error);
        responce.statusCode = 500;
        responce.end("Ошибка сервера");
    }
});

server.listen(PORT);
console.log(`Server is already run on adres http://localhost:${PORT}`);