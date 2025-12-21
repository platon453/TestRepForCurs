const usdToRub = (usd) => {
    const odd = (dollars, exchange) => dollars * exchange;
    
    return odd(usd, 90);
}
console.log(`На твои usd ты получишь ${usdToRub(100)}`);

const euroToRub = (euro) => {
    const odd = (euros, exchange) => euros * exchange;

    return odd(euro, 100);
}
console.log(`На твои euro ты получишь ${euroToRub(100)}`);



const ages = [10, 18, 55, 3, 20]; 
const checkAccess = (age) => {
    if (age >= 18) {
        return (`Доступ разрешен`);
    } else {
        return (`Доступ запрещен`);
    }
};
for (const checkMassive of ages) {
    const result = checkAccess(checkMassive);
    console.log(`Возраст ${checkMassive}: ${result}`);
};

