require("dotenv").config();
const sendGridMail = require("@sendgrid/mail");
const nightmare = require("nightmare")();

sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);
const arguments = process.argv.slice(2);
const url = arguments[0];
const minPrice = arguments[1];

async function checkprice() {
  try {
    const priceString = await nightmare
      .goto(url)
      .wait("#priceblock_ourprice")
      .evaluate(() => document.getElementById("priceblock_ourprice").innerText)
      .end();
    const priceNumber = parseFloat(priceString.replace("$", ""));
    if (priceNumber < minPrice) {
      await sendEmail(
        "Price is low!!",
        `the price on ${url} has dropped below ${minPrice}`
      );
      console.log("it is cheap!");
    } else {
      console.log("it is expensive");
    }
  } catch (e) {
    await sendEmail("AmazonPriceChecker ERROR", e.message);
    throw e;
  }
}

function sendEmail(subject, body) {
  const email = {
    to: "lisov@itfast.net", // Temp email from https://temp-mail.org/en/
    from: "amazonpricechecker@example.com",
    subject: subject,
    text: body,
    html: body
  };

  return sendGridMail.send(email);
}

checkprice();
