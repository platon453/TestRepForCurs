const http = require('node:http');

const PORT = 3000;

const serverHttp = http.createServer (async (request, response) => {
    if (request.method === 'GET' && request.url === '/') {
        response.setHeader('Content-type', 'text/html; charset=utf-8');
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
            body.push(chunk);
            console.log(`Получили кусочек имени вот он: ${chunk}`);
        });

        request.on('end', () => {
            const pursedBody = Buffer.concat(body).toString('utf-8');

            const decodedSting = decodeURIComponent(pursedBody);

            console.log(`Полное тело запроса ${decodedSting}`);

            response.setHeader('Content-type', 'text/html; charset=utf-8');
            response.statusCode = 200;

            response.end(`Данные получены, Вы прислали: ${decodedSting}`);
        });
    } else if (request.method === 'GET' && (request.url === '/servers' || request.url === '/users')) {
        const data = await fetch('https://gusic.xyz/stats');
        console.log(`Получили response обьект: ${data}`);
        const jsonData = await data.json();
        console.log(`Достали из него json: ${jsonData}`);

        response.setHeader('Content-type', 'text/html; charset=utf-8');
        response.statusCode = 200;

        if (request.url === '/servers') {
            response.end(`<h1>Количество серверов на данный момент: ${jsonData.servers}</h1>`);
        } else if (request.url === '/users') {
            response.end(`<h1>Количество пользователей на данный момент: ${jsonData.users}</h1>`);
        }
    } else if (request.method === 'GET' && request.url === '/weather') {
        const data = await fetch('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true');
        const jsonData = await data.json();

        response.setHeader('Content-type', 'text/html; charset=utf-8');
        response.statusCode = 200;

        response.end(`
        <div style="font-family:system-ui; text-align:center; padding:3rem; background:#0f172a; color:#e2e8f0;">
        <div style="font-size:3.2rem; font-weight:bold; color:#38bdf8;">
        ${jsonData.current_weather.temperature}°
        </div>
        <div style="font-size:1.3rem; color:#94a3b8; margin-top:0.5rem;">
        ветер ${jsonData.current_weather.windspeed} км/ч
        </div>
        </div>
    `);
}
});
serverHttp.listen(PORT, () => {
    console.log(`Server is already run on adress http://localhost:${PORT}`);      
});
