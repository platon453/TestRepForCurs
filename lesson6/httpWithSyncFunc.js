const http = require("http"); // создали модуль http
const PORT = 3000; // деклалируем порт для подключения

const server = http.createServer((request, response) => {
    console.log("Someone go to our server!");

    response.writeHead(200, { "Content-Type": "text/plain" }); // Статус, Заголовок

    response.write("Hello this is a server on NodeJs"); // body

    response.end();
});

const delay = (ms) => {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}; 

const proceesServerListen = async () => {
    try {
        console.log("Process is starting....");
        
        await delay(2000);
        console.log("The Node.js server is starting...");

        await delay(1500);
        server.listen(PORT); // Запуск сервера
        console.log("The server is ready to work!");

    } catch (error) {
        console.log("Ups an error occurred with", error);
    } 
}

proceesServerListen();





