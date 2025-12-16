const fileSize = 4500;
const isPremium = false;
let status = "Загружаем файл!..";
console.log(status);

if (fileSize === 0) {
    console.log("Файл пуст");
} else if (fileSize > 5000 && !isPremium) {
    console.log("Файл слишком большой! или у тебя нет подписки");
} else {
    console.log("Загружем.....");
    status = ("Файл успешно загружен!");
}
console.log(status);