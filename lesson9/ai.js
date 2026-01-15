const http = require('node:http');
const PORT = 3000;

// Общие стили для всех страниц
const getLayout = (title, content) => `
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
        :root {
            --bg: #050505;
            --card-bg: rgba(255, 255, 255, 0.03);
            --border: rgba(255, 255, 255, 0.1);
            --text: #ffffff;
            --muted: rgba(255, 255, 255, 0.5);
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            background: var(--bg); 
            color: var(--text); 
            font-family: 'Inter', sans-serif; 
            display: flex; 
            justify-content: center; 
            align-items: center; 
            min-height: 100vh;
            overflow: hidden;
        }
        .container { animation: fadeIn 0.8s ease-out; width: 100%; max-width: 500px; padding: 20px; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        
        .card {
            background: var(--card-bg);
            border: 1px solid var(--border);
            backdrop-filter: blur(20px);
            padding: 40px;
            border-radius: 32px;
            text-align: center;
        }
        h1 { font-weight: 800; letter-spacing: -0.05em; font-size: 2.5rem; margin-bottom: 8px; }
        p { color: var(--muted); margin-bottom: 32px; font-size: 0.9rem; }
        
        .stat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 20px; }
        .stat-item { 
            padding: 20px; 
            background: rgba(255,255,255,0.02); 
            border: 1px solid var(--border); 
            border-radius: 20px; 
        }
        .stat-value { font-size: 1.5rem; font-weight: 600; display: block; margin-top: 8px; }
        .stat-label { font-size: 0.75rem; text-transform: uppercase; color: var(--muted); letter-spacing: 0.1em; }
        
        .btn-back { 
            margin-top: 30px; display: inline-flex; align-items: center; gap: 8px;
            color: var(--muted); text-decoration: none; font-size: 0.8rem; transition: 0.3s;
        }
        .btn-back:hover { color: #fff; }

        input {
            width: 100%; padding: 16px 24px; background: var(--card-bg); border: 1px solid var(--border);
            border-radius: 100px; color: #fff; outline: none; margin-bottom: 16px; font-family: inherit;
        }
        button {
            width: 100%; padding: 16px; background: #fff; color: #000; border: none;
            border-radius: 100px; font-weight: 600; cursor: pointer; transition: 0.3s;
        }
        button:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(255,255,255,0.1); }
    </style>
</head>
<body>
    <div class="container">${content}</div>
    <script>lucide.createIcons();</script>
</body>
</html>
`;

const serverHttp = http.createServer(async (request, response) => {
    response.setHeader('Content-type', 'text/html; charset=utf-8');

    if (request.method === 'GET' && request.url === '/') {
        response.end(getLayout('Главная', `
            <div class="card">
                <i data-lucide="cloud" size="48" style="margin-bottom: 20px; opacity: 0.8"></i>
                <h1>Вход</h1>
                <p>Введите данные для доступа в облако</p>
                <form action="/save" method="POST">
                    <input name="username" placeholder="Ваше имя" required />
                    <button type="submit">Продолжить</button>
                </form>
            </div>
        `));

    } else if (request.method === 'GET' && request.url === '/weather') {
        const data = await fetch('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true');
        const jsonData = await data.json();
        const weather = jsonData.current_weather;

        response.end(getLayout('Погода', `
            <div class="card">
                <h1>Погода</h1>
                <p>Берлин, текущие показатели</p>
                <div class="stat-grid">
                    <div class="stat-item">
                        <i data-lucide="thermometer" size="20" color="#fff"></i>
                        <span class="stat-value">${weather.temperature}°C</span>
                        <span class="stat-label">Температура</span>
                    </div>
                    <div class="stat-item">
                        <i data-lucide="wind" size="20" color="#fff"></i>
                        <span class="stat-value">${weather.windspeed} <small>км/ч</small></span>
                        <span class="stat-label">Ветер</span>
                    </div>
                </div>
                <a href="/" class="btn-back"><i data-lucide="arrow-left" size="14"></i> На главную</a>
            </div>
        `));

    } else if (request.method === 'GET' && (request.url === '/servers' || request.url === '/users')) {
        const data = await fetch('https://gusic.xyz/stats');
        const jsonData = await data.json();
        const isServer = request.url === '/servers';

        response.end(getLayout('Статистика', `
            <div class="card">
                <i data-lucide="${isServer ? 'server' : 'users'}" size="40" style="margin-bottom: 16px"></i>
                <h1>${isServer ? jsonData.servers : jsonData.users}</h1>
                <p>${isServer ? 'Активных серверов' : 'Пользователей онлайн'}</p>
                <a href="/" class="btn-back"><i data-lucide="arrow-left" size="14"></i> На главную</a>
            </div>
        `));

    } else if (request.method === 'POST' && request.url === '/save') {
        const body = [];
        request.on('data', chunk => body.push(chunk));
        request.on('end', () => {
            const parsedBody = Buffer.concat(body).toString('utf-8');
            const decoded = decodeURIComponent(parsedBody.split('=')[1]); // Достаем только имя

            response.end(getLayout('Успех', `
                <div class="card">
                    <i data-lucide="check-circle" size="48" color="#00ff88"></i>
                    <h1 style="margin-top: 20px">Готово</h1>
                    <p>Добро пожаловать, ${decoded}!</p>
                    <a href="/" class="btn-back">Вернуться</a>
                </div>
            `));
        });
    }
});

serverHttp.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});