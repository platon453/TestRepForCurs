const http = require("http"); // Подключаем всстроенный http модуль Node.js
const PORT = 3000;

const server = http.createServer((request, responce) => {
  // Обращаемся к модулю http и вызываем метод .createServer который принимает в себя
  // callback функцию в которой лежит 2 аргумента req и res
  // requsest - письмо от браузера (запрос)
  // responce - бланк для нашего ответа (ответ на запрос от браузера)

  console.log("Someone go to my server"); // каждое обращение к серверу будет выводить в консоль это сообщение
  console.log(request.method);

  // Формирем заголовок ответа,(примает в себя 2 арг) статус 200 (OK), тип контента - текст
  responce.writeHead(200, { "Content-type": "text/plain; charset=utf8" });

  // Отправляем тело(body) ответа, строку, которая будет отображена на странице клиента.
  responce.write("Привет из node.js");

  // Сигнал, что мы заканчиваем ответ, и отдаем его браузеру и клиенту. Иначе зависнет
  responce.end();
});

server.listen(PORT);
console.log("Server is starting....");
