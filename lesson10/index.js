const path = require("node:path");
const http = require("node:http");
const fs = require("node:fs/promises");

const PORT = 3000;

const sendFile = async (fileName, response, statusCode) => {
    const fullPath = path.join(__dirname, "client", `${fileName}.html`);
    const page = await fs.readFile(fullPath, 'utf-8');

    response.statusCode = statusCode;
    response.end(page);
}

const server = http.createServer(async (request, response) => {
    response.setHeader("Content-Type", "text/html; charset=utf-8");

    if (request.url === '/') {
        await sendFile("index", response, 200);
    } else if (request.method === 'POST' && request.url === '/upload') {
        console.log("Началась загрузка файла...");

        let totalSize = 0;

        request.on('data', (chunk) => {
            //console.log(chunk);
            console.log(`Получен новый кусочек файла: ${chunk.length}`);
            totalSize += chunk.length;
        });

        request.on('end', () => {
            console.log(`Загрузка файла зверешена, файл весит: ${totalSize}`);

            response.setHeader('Content-type', 'text/plain; charset=utf-8');
            response.statusCode = 200;
            response.end();
        })
    }
});

server.listen(PORT, () => {
    console.log(`Server is already run on adress http://localhost:${PORT}`);      
});
