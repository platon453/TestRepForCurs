const http = require('node:http');
const path = require('node:path');
const fs = require('node:fs/promises');

const PORT = 3000;

const server = http.createServer(async (request, response) => {
    if (request.url === '/getip') {
        try {
            const apiRes = await fetch('https://ipinfo.io/json');
            const data = await apiRes.json();

            const templatePath = path.join(__dirname, 'client', 'index.html');
            let html = await fs.readFile(templatePath, 'utf-8');

            html = html 
                .replace('{{IP}}', data.ip)
                .replace('{{CITY}}', data.city)
                .replace('{{REGION}}', data.region)
                .replace('{{COUNTRY}}', data.country)
                .replace('{{ORG}}', data.org.split(' ').slice(1).join(' '))
                .replace('{{TIMEZONE}}', data.timezone);
            
            response.setHeader('Content-type', 'text/html; charset=utf-8');
            response.statusCode = 200;
            response.end(html);
        } catch (eror) {
            console.error(eror);
            response.statusCode = 500;
            response.end('<h1>Ошибка при получении данных</h1>');
        }
    } else {
        response.statusCode = 404;
        response.end("Not Found");
    } 
});

server.listen(PORT, () => {
    console.log(`Server is already run on adress http://localhost:${PORT}`);      
})