const fetchOrder = async (id) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve (`Заказ с ID: ${id} загружаем `);
        }, 2000);
    });
};

const processOrder = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve (`Заказ обработан`);
        }, 1000);
    });
};

const shipOrder = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve (`Заказ отправлен`)
        }, 1000);
    });
};

const startOrderProcess = async (id) => {
    try {
        console.log(`Запуск программы!`);
        const orderMessage = await fetchOrder(id);
        console.log(orderMessage);
    } catch {

    }
}

startOrderProcess(200000);