let totalPrice = 5000; //сумма покупки
let accountBalance = 4500; //баланс карты
let isVip = true; //вип карта

//Первая проверка
if (isVip === true) {
    totalPrice = totalPrice * 0.9;
    console.log(`Вы VIP-пользователь, поэтому получаете скидку 10%
Итоговая сумма покупки: ${totalPrice} руб.`);
} else {
    console.log(`Вы НЕ VIP-пользователь, поэтому не получаете скидку 10%
Итоговая сумма покупки: ${totalPrice} руб.`);
};
//Вторая проверка
if (accountBalance >= totalPrice) {
    console.log("Успешно! Покупа сделанна");
} else {
    console.log("Недостаточно средств");
};

