const loadImage = () => {
    return new Promise ((resolve, reject) => {
        setTimeout(() => {
            resolve("Изображение загружено!");
        }, 1000);
    });
};

const processImage = () => {
    return new Promise ((resolve, reject) => {
        setTimeout(() => {
            resolve("Изображение обработано!");
        }, 1000);
    });
};

const saveImage = () => {
    return new Promise ((resolve, reject) => {
        setTimeout(() => {
            resolve("Изображение сохранено!");
        }, 1000);
    });
};

loadImage("URL")
    .then((result) => {
        console.log(result);
        console.log("Вызываем func processImage");
        return processImage();
    })
    .then((editPhoto) => {
        console.log(editPhoto);
        console.log("Вызываем func saveImage");
        return saveImage();
    })
    .then((savedEditedImage) => {
        console.log(savedEditedImage);
        return savedEditedImage;
        
    })
    .catch((error) => {
        console.log("Что то пошло не так", error);
    });
