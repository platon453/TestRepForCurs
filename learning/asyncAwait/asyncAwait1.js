const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const processFile = async () => {
    try {
        
        console.log("Upload....") //1

        console.log(`Ждем выполнения ${await wait(2000)} ура функция сработала через 2сек`);
        
        console.log(`Ждем выполнения ${await wait(3000)} ура функция сработала через 3сек`)
        // setTimeout(() => console.log("1. MACROTASK DETECTED!"), 1000); //3
        
        setTimeout(() => console.log(`2. MACROTASK DETECTED! завершилось за ${ms} `), 2000); //4

    } catch (error) {
        console.log(`Возникла непредвиденная ошибка ${error}`);
    }
}

processFile();