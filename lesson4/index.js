// const user1 = {
//     name: "Platon",
//     sayHiStandart1: function () {
//         setTimeout (function() {
//             console.log(user1.name);
//         }, 1000);
//     }
// }
// console.log(user1.sayHiStandart1());

// const user = {
//     name: "Platon",
//     sayHiStandart: function() {
//         setTimeout(() => {
//             console.log(this.name);
//         }, 1000);
//     }
// }
// console.log(user.sayHiStandart());

// const platon = {
//     name: "Platon",
//     sayHi: function() {
//         console.log(`Привет, я  ${platon.name}`);
//     }
// };

// const polina = {
//     name: "Polina",
//     sayHi: function() {
//         console.log(`Привет, я ${polina.name}`);
//     }
// };

// platon.sayHi(); //Привет, я  Platon
// polina.sayHi(); //Привет, я Polina

// function createUser(name) {
//     return {
//         name: name,
//         sayHi: function() {
//             console.log(`Привет, я ${this.name}`);

//         }
//     };
// }

// const platon1 = createUser("Platon");
// const Polina1 = createUser("Polina");
// const testUserEvgeniy = createUser("Evgeniy");
// platon.sayHi(); //Привет, я  Platon
// polina.sayHi(); //Привет, я Polina
// testUserEvgeniy.sayHi(); //Привет, я Evgeniy

// TODO 1: Создать функцию formatSize, которая принимает один параметр bytes (число)
// Функция должна форматировать размер файла в удобочитаемый вид

// TODO 2: Внутри функции проверить: если bytes меньше 1024
//         Вернуть строку с байтами (просто число)

// TODO 3: Если bytes больше или равен 1024:
//         Вычислить мегабайты: bytes / 1024 / 1024
//         Вернуть строку с мегабайтами и суффиксом " MB"

// TODO 4: Создать массив fileSize с тремя тестовыми значениями:
//         - маленький размер (меньше 1KB)
//         - средний размер (около 5MB)
//         - большой размер (больше 5MB)

// TODO 5: Использовать цикл for...of для перебора каждого элемента массива
//         Внутри цикла вызвать функцию formatSize для каждого размера
//         Вывести результат в консоль

// const formatSize = (bytes) => {
//     if (bytes <= 1024) {
//         return (`${bytes} B`);
//     }

//     const mbytes = (bytes / 1024 / 1024).toFixed(2);
//     return (`${mbytes} MB`);
// };

// const fileSize = [500, 5000000, 500000, 10000, 1024];

// for (const size of fileSize) {
//     console.log(formatSize(size));
// }

// TODO: создать конвертер валют usdToRub
// если больше 1000 курс 100
// если больше 500 курс 90
// если больше 300 курс 85
// если пользователь пришел менять сумму меньше курс 80

// const usdToRup = (usd) => {
//   const odd = (dollars, exchange) => {
//     return dollars * exchange;
//   };

//   if (usd >= 1000) {
//     return odd(usd, 100);
//   } else if (usd >= 500) {
//     return odd(usd, 90);
//   } else if (usd >= 300) {
//     return odd(usd, 85);
//   }

//   return odd(usd, 80);
// };

// console.log(usdToRup(1000000000000000));


const checkAge = (age) => {
    if (age >= 18) {
        return (`Ты совершенолетний, твой возраст ${age}`);
    } else {
        return(`Ты еще маленький, твой возраст ${age}`);
    }
}

console.log(checkAge(18));
console.log(checkAge(123823813129038));
console.log(checkAge(1));
console.log(checkAge(12));
console.log(checkAge(14));
console.log(checkAge(15));
console.log(checkAge(321));
console.log(checkAge(12313213));
