const http = require('node:http');
const path = require('node:path');
const fs = require('node:fs/promises');

const PORT = 3000;

/**
 * Форматирует данные IP в единый формат
 */
function formatIpData(data) {
    const [lat, lon] = data.loc ? data.loc.split(',') : ['0', '0'];
    return {
        ip: data.ip || 'N/A',
        city: data.city || 'Unknown',
        region: data.region || 'Unknown',
        country: data.country || 'XX',
        org: data.org ? data.org.split(' ').slice(1).join(' ') : 'Unknown',
        timezone: data.timezone || 'UTC',
        lat: parseFloat(lat),
        lon: parseFloat(lon)
    };
}

const server = http.createServer(async (request, response) => {
    const url = request.url;

    // Главная страница — отдаём статичный HTML
    if (url === '/' || url === '/index.html') {
        try {
            const templatePath = path.join(__dirname, 'client', 'index.html');
            const html = await fs.readFile(templatePath, 'utf-8');
            
            response.setHeader('Content-Type', 'text/html; charset=utf-8');
            response.statusCode = 200;
            response.end(html);
        } catch (error) {
            console.error(error);
            response.statusCode = 500;
            response.end('<h1>Ошибка при загрузке страницы</h1>');
        }
    }
    
    // API: получить IP сервера
    else if (url === '/api/serverip') {
        try {
            const apiRes = await fetch('https://ipinfo.io/json');
            const data = await apiRes.json();
            const formatted = formatIpData(data);
            
            response.setHeader('Content-Type', 'application/json; charset=utf-8');
            response.setHeader('Access-Control-Allow-Origin', '*');
            response.statusCode = 200;
            response.end(JSON.stringify(formatted));
        } catch (error) {
            console.error(error);
            response.statusCode = 500;
            response.setHeader('Content-Type', 'application/json');
            response.end(JSON.stringify({ error: 'Ошибка при получении данных' }));
        }
    }
    
    // 404 для остальных роутов
    else {
        response.statusCode = 404;
        response.end('Not Found');
    } 
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);      
})