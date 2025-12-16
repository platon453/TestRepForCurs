const pinCodes = ["1111", "5678", "1234", "9999"];
const myPin = "1234";

for (const pins of pinCodes) {
  if (myPin === pins) {
    console.log(`Ваш пинк код совпадает с ${myPin}`);
    break;
  } else {
    console.log("Неверный пин!");
  }
}
