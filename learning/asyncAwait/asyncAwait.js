const wait = (ms) => {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
};

const precessFile = async () => {
    try {
        console.log("Загружаю...");
        await wait(1000);

        const diskFull = false;
        if (diskFull) {
            throw new Error("Место нет на дисе!");
        }

        console.log("Успех");
    } catch (error) {
        console.log("Ой!, Ошибка", error.message);
    }
};

precessFile();