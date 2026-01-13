const path = require('node:path');
const fs = require('node:fs');


const stream = fs.createReadStream(
    path.join(__dirname, 'big.txt'), 
    {
        highWaterMark: 1024,
    }
);

let counter = 0; 

stream.on('data', (chunk) => {
    counter++;
    console.log(`Получен кусок № ${counter}`);
    console.log(chunk);
    console.log(`Размер ${chunk.length} байт`);
});

stream.on('end', () => {
    console.log(`Чтение файла завершенно. Всего кусков: ${counter}`);
});

