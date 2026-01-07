const http = require('http');
const PORT = 3000;

const server = http.createServer(async (request, response) => {
    // Ставим заголовок к нашему ответа для запроса нашего клиента
    //setHeader функция принимает в себя арг (Названия заголовка), принимает значение этого заголовка.
    response.setHeader("Content-type", "text/plain; charset=utf8"); 
    
    //http:localhost:3000
    if (request.url === "/") {
        response.statusCode = 200;
        response.write("Главная страница сайта");
        response.end();
    } else if (request.url === "/about") {
        //Страница о нас
        response.statusCode = 200;
        response.write("Это стартовая страница нашего обменника!");
        response.end();
    } else if (request.url === "/stats") {
        const data = await fetch("https://gusic.xyz/stats");

        // мы получаем jsonData + подождали когда разрешится Promise data.json()
        const jsonData = await data.json(); 
            
        response.setHeader("Content-type", "application/json; charset=utf8"); 

        statusCodeStats = response.statusCode = 200;
        
        response.write(JSON.stringify(jsonData));
        
        response.end();
    } else if (request.url === "/api/info") {
        response.setHeader("Content-type", "application/json; charset=utf8");
        response.statusCode = 200;
        const dataOfPc = {
            "serverName": "MyPc",
            "version": "1.0.0",
            "status": "working"
        }
        response.write(JSON.stringify(dataOfPc));
        response.end();

    } else {
        response.statusCode = 404;
        response.write("Такой страницы не существует!");
        response.end();
    }
});
server.listen(PORT);
console.log("Server is already running....");