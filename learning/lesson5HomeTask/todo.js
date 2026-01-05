const delay = (ms) => {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
};

const processData = async () => {
    try {
    console.log("Загружаем данные....");

    await delay(3000);
    console.log(`Данные загружены!`);
    
    console.log("Программа завершается....");
    await delay(2000);
    console.log("Программа успешно завершилась!");
    
    } catch (error) {
        console.log("Произошло непрдивененная ошибка", error);
    }
};

processData();