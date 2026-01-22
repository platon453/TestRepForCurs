const path = require("node:path");
const http = require("node:http");
const fs = require("node:fs/promises");
const os = require("node:os");

const PORT = 3000;
const UPLOAD_DIR = path.join(__dirname, "public", "uploads");

const getLocalIp = () => {
    const interfaces = os.networkInterfaces();

    for (const name of Object.keys(interfaces)) {
        for (const interface of interfaces[name]) {
            if (interface.family === "IPv4" && !interface.internal) {
                return interface.address;
            }
        }
    }

    return "localhost";
}

// Верхняя булка: Граница (Boundary) и Заголовки (Имя файла, тип).
// Начинка: Сама картинка (файл) - бинарные данные
// Нижняя булка: Граница конца
// Комбинация символов для работы с пустой строкой - \r\n\r\n

const sendFile = async (filePath, response, contentType) => {
    try {
        const data = await fs.readFile(filePath);
        response.setHeader("Content-Type", contentType);
        response.statusCode = 200;
        response.end(data);
    } catch (err) {
        response.statusCode = 404;
        response.end("Not Found");
    }
};

const server = http.createServer(async (request, response) => {
    // Разрешаем CORS и JSON (для удобства)
    response.setHeader("Access-Control-Allow-Origin", "*");

    // 1. ОТДАЕМ HTML (Главная страница)
    if (request.method === 'GET' && request.url === '/') {
        await sendFile(
            path.join(__dirname, "public", "index.html"),
            response,
            "text/html; charset=utf-8"
        );
    }

    // 2. API: СПИСОК ФАЙЛОВ
    else if (request.method === 'GET' && request.url === '/api/files') {
        try {
            // Читаем папку uploads
            await fs.mkdir(UPLOAD_DIR, { recursive: true }); // Создадим, если нет
            const files = await fs.readdir(UPLOAD_DIR);

            // Отдаем массив имен файлов как JSON
            response.setHeader("Content-Type", "application/json");
            response.end(JSON.stringify(files));
        } catch (err) {
            response.statusCode = 404;
            response.end(JSON.stringify({ error: "Ошибка чтения папки" }));
        }
    }

    // 3. СКАЧИВАНИЕ ФАЙЛОВ (Отдача статики из uploads)
    else if (request.method === 'GET' && request.url.startsWith('/uploads/')) {
        // url выглядит как /uploads/видео.mp4
        // декодируем URL (чтобы русские буквы работали)
        // replace(ищем для замены, на что заменить)

        const fileName = decodeURIComponent(request.url.replace('/uploads/', ''));

        // /home/user/Lesson11/public/uploads/video.mp4
        const filePath = path.join(UPLOAD_DIR, fileName);

        await sendFile(filePath, response, "application/octet-stream");
    }

    // 4. ЗАГРУЗКА ФАЙЛА
    else if (request.method === 'POST' && request.url === '/upload') {
        console.log("Загрузка файла...");
        const chunks = [];

        request.on('data', (chunk) => chunks.push(chunk));

        request.on('end', async () => {
            const fullBuffer = Buffer.concat(chunks);

            // Buffer { 0x, 6f, 7e } !== '\r\n\r\n'
            // Buffer { 0x, 6f, 7e } === Buffer { 0x, 6f, 7e }

            // --- Парсинг имени и файла ---
            const contentType = request.headers['content-type'];

            if (!contentType || !contentType.includes('boundary=')) {
                response.statusCode = 400;
                return response.end("Нет boundary");
            }

            const boundary = Buffer.from(`--${contentType.split('boundary=')[1]}`);
            const doubleNewline = Buffer.from('\r\n\r\n');

            // indexOf(doubleNewline) - 4

            const headersEndIndex = fullBuffer.indexOf(doubleNewline);

            if (headersEndIndex === -1) return response.end("Ошибка парсинга");

            // subarray(start, end) - start - 0 end - 2
            // subarray(0, 2)

            // Достаем имя
            const headersSection = fullBuffer.subarray(0, headersEndIndex).toString();
            const fileNameMatch = headersSection.match(/filename="(.+?)"/);

            const originalName = path.basename(fileNameMatch[1]); // защита пути

            // indexOf(boundary, fileStart)

            // Достаем тело
            const fileStart = headersEndIndex + 4;
            const fileEnd = fullBuffer.indexOf(boundary, fileStart);
            const fileData = fullBuffer.subarray(fileStart, fileEnd - 2);

            // Сохраняем
            try {
                await fs.mkdir(UPLOAD_DIR, { recursive: true });
                await fs.writeFile(path.join(UPLOAD_DIR, originalName), fileData);

                response.statusCode = 200;
                response.end("Сохранено");
            } catch (err) {
                console.error(err);
                response.statusCode = 500;
                response.end("Ошибка сохранения");
            }
        });
    }

    // 5. УДАЛЕНИЕ ФАЙЛА
    else if (request.method === 'DELETE' && request.url.startsWith('/api/files/')) {
        // url выглядит как /api/files/video.mp4
        // basename(request.url) - video.mp4.
        // ЗАЩИТА: Оставляем только имя, убираем слэши и точки
        const safeFileName = decodeURIComponent(path.basename(request.url));
        const filePath = path.join(UPLOAD_DIR, safeFileName);

        try {
            // fs.unlink - это команда "Удалить файл"
            await fs.unlink(filePath);

            response.statusCode = 200;
            response.end("Файл удален");
        } catch (err) {
            console.error(err);
            // Если файла нет или ошибка доступа
            response.statusCode = 404;
            response.end("Ошибка удаления файла");
        }
    } else {
        response.statusCode = 404;
        response.end("Ничего не найдено");
    }
});

server.listen(PORT, '0.0.0.0');
console.log(`http://${getLocalIp()}:${PORT}`);