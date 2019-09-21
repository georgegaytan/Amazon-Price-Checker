const nightmare = require("nightmare")();

const arguments = process.argv.slice(2);
const url = arguments[0];
const minPrice = arguments[1];

async function checkprice() {
  const priceString = await nightmare
    .goto(url)
    .wait("#priceblock_ourprice")
    .evaluate(() => document.getElementById("priceblock_ourprice").innerText)
    .end();
  const priceNumber = parseFloat(priceString.replace("$", ""));
  if (priceNumber < minPrice) {
    console.log("it is cheap!");
  } else {
    console.log("it is expensive");
  }
}

checkprice();
