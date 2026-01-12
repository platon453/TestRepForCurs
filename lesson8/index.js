const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const PORT = 3000;

const MIME_TYPES = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascirpt",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".json": "application/json",
  ".mp4": "video/mp4",
};

const server = http.createServer((request, response) => {
  console.log(`Запрос: ${request.url}`);

  let url;

  if (request.url === "/") { 
    url = "/index.html";
  } else {
    url = `${request.url}.html`;
  }
  // Формируем путь к файлку на диске
  const filePath = path.join(__dirname, "public", url);

  // Определяем расширения файла на диске.. (обращ к extname)

  const extname = path.extname(filePath);

  console.log(extname);

  const contentType = MIME_TYPES[extname] || "text/plain"; // || или дефолт текст value

  console.log(contentType);

  // Создаем поток чтения
  const fileStream = fs.createReadStream(filePath);

  // Сразу ставим правильный хедер
  response.setHeader("Content-type", contentType);

  // .pipe завершает, response.end(); писать не надо!!!
  fileStream.pipe(response);

  fileStream.on("error", (err) => {
    response.statusCode = 404;
    response.end();
  });
});
server.listen(PORT);
console.log(`Server is already run on adress http://localhost:${PORT}`);
