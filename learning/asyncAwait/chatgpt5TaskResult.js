// Функция для имитации загрузки заказа
const fetchOrder = async (id) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Заказ с ID: ${id} загружен!`); // Возвращаем сообщение после 2 секунд
        }, 2000);
    });
};

// Функция для имитации обработки заказа
const processOrder = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Заказ обработан!"); // Возвращаем сообщение после 1 секунды
        }, 1000);
    });
};

// Функция для имитации отправки заказа
const shipOrder = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Заказ отправлен!"); // Возвращаем сообщение после 1 секунды
        }, 1000);
    });
};

// Асинхронная функция для управления процессом
const startOrderProcess = async (orderId) => {
    try {
        // Ждем, пока загрузится заказ
        console.log("Запуск процесса...");
        const orderMessage = await fetchOrder(orderId);
        console.log(orderMessage); // Логируем, что заказ загружен

        // // Ждем, пока заказ будет обработан
        // const processMessage = await processOrder();
        // console.log(processMessage); // Логируем, что заказ обработан

        // // Ждем, пока заказ будет отправлен
        // const shipMessage = await shipOrder();
        // console.log(shipMessage); // Логируем, что заказ отправлен

        // console.log("Процесс завершен!");
    } catch (error) {
        console.log("Произошла ошибка:", error); // Ловим и логируем ошибку, если она возникла
    }
};

// Запускаем процесс с заказом с ID 1
startOrderProcess(1);
