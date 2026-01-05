const fetchData = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Данные загруженны!");
        }, 2000);
    });
};

const processData = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Данные обработаны!");
        }, 1000);
    });
};

const saveData = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Данные обработаны!");
        }, 1000);
    });
};

const startProcess = async () => {
    
}


