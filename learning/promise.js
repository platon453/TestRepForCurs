const loadImage = () => {
    return new Promise ((resolve, reject) => {
        setTimeout(() => {
            resolve("Изображние загружено!");
        }, 3000);
    });
};

const processImage = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Изборажение обработано!");
        }, 3000);
    });
};

const saveImage = () => {
    return new Promise ((resolve, reject) => {
        setTimeout(() => {
            resolve("Изображение сохраненно!");
        }, 5000);
    });
};

const startProgram = "!... Программа запустилась ...!";
console.log(startProgram);

const syncOperation1 = "1. Синхрнная операция выполняется";
console.log(syncOperation1);

const syncOperation2 = "2. Синхронная операция выполняется";
console.log(syncOperation2);

loadImage("URL")
    .then ((result) => {
        console.log(result);
        console.log("Вызываю func обработки изображния");   
        return processImage();
    })
    .then((editPhoto) => {
        console.log(editPhoto);
        console.log("Вызываю func saveImage");
        return saveImage();
    })
    .then ((saveEditedImage) => {
        console.log(saveEditedImage);
        console.log("!... Программа завершилась...!");
        return "SUCCESS";
    })
    .then((finalResult) => {
        console.log("Финальный результат:", finalResult);
    })
    .catch ((error) => {
        console.log("Что-то пошло не так", error);
    })



