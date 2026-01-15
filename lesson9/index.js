const http = require('node:http');


const PORT = 3000;

const server = http.createServer(async (request, response) => {
    if (request.method === 'GET' && request.url === '/') {
        response.setHeader('Content-Type', 'text/html; charset=utf-8');
        response.statusCode = 200;

        response.end(`
            <form action="/save" method="POST">
                <input name="username" placeholder="Ваше имя" />
                <button type="submit">Отправить</button>
            </form>
            `);
    } else if (request.method === 'POST' && request.url === '/save') {
        const body = [];

        request.on('data', (chunk) => {
            body.push(chunk); // запихиваем chunk в конец массива body[]
            console.log(`Прилетел кусочек данных: ${chunk}`);
        });

        request.on('end', () => {
            // Соеденяет буферы + возращает обьед буфер
            const parsedBody = Buffer.concat(body).toString('utf-8');

            const decodedSting = decodeURIComponent(parsedBody);

            console.log(`Полное тело запроса: ${decodedSting}`);

            response.setHeader('Content-Type', 'text/html; charset=utf-8');
            response.statusCode = 200; 
            
            response.end(`Данные получены! Вы прислали ${decodedSting}`);
            
        });
    } else if (request.method === 'GET' && (request.url === '/servers' || request.url === '/users')) {
        const data = await fetch('https://gusic.xyz/stats'); // Получаем Response обьект
        const jsonData = await data.json(); // Получаем сам json

        response.setHeader('Content-Type', 'text/html; charset=utf-8');
        response.statusCode = 200;

        if (request.url === '/servers') {
            response.end(`<h1>Количество серверов на данный момент: ${jsonData.servers}</h1>`);
        } else if (request.url === '/users') {
            response.end(`<h1>Количество пользователей на данный момент: ${jsonData.users}</h1>`);
        }
        
    } else if (request.method === 'GET' && request.url === '/weather') {

    }
});

server.listen(PORT);
console.log(`Server is already run on adress http://localhost:${PORT}`); 