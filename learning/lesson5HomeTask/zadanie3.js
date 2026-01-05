const sleep = (ms) => {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
};

const cookDinner = async () => {
    try {
        console.log("Программа по готовке еды запущенна....");

        const isGasOn = true;
        if (!isGasOn) {
            throw new Error("Нет газа!");
        }
        await sleep(1000);
        console.log("Включаю плиту...");

        await sleep(2000);
        console.log("Режу овощи...");

        await sleep(3000);
        console.log("Варю суп...");

        console.log("Ужин готов");
        console.log("Программа по готовке еды успешно завершилась");
    } catch(error) {
        console.log("Программа выполнилась с ошибкой", error.message);
    }
}
cookDinner();
