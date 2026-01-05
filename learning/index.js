console.log('Start'); //1

// Макрозадача
setTimeout(() => console.log('Timeout'), 0); //4

// Микрозадача
Promise.resolve().then(() => console.log('Promise')); //3

// Синхронный код
console.log('End'); //2