const path = require('node:path');
const http = require('node:http');
const fs = require('node:fs/promises');

const PORT = 3000;


const sendHtml = async (fileName, responce, statusCode) => {
    try {
        const fullPath = path.join(__dirname, "public", `${fileName}.html`);
        const data = await fs.readFile(fullPath, "utf-8");

        responce.setHeader("Content-type", "text/html; charset=utf-8");
        responce.statusCode = statusCode;
        responce.end(data);
    } catch (error) {
        console.log(`На каком та этапе блока try в функции ${sendHtml} возникла оошибка с:`, error);
        responce.statusCode = 500;
        responce.end("Ошибка сервера!");
    }
};

const server = http.createServer (async(request, responce) => {
    try {
        if (request.url === '/') {
            await sendHtml("index", responce, 200);
        } else if (request.url === '/rules') {
            await sendHtml("rules", responce, 200);
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
console.log(`Server is already run on adress http://localhost:${PORT}`);