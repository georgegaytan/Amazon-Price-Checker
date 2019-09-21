const nightmare = require("nightmare")();

const url =
  "https://www.amazon.com/PetFusion-Scratcher-Cardboard-Construction-unverified/dp/B004X6UEH6?pf_rd_p=5cc0ab18-ad5f-41cb-89ad-d43149f4e286&pd_rd_wg=Aeajj&pf_rd_r=15E83G79PX7JAMTJHBGP&ref_=pd_gw_wish&pd_rd_w=8cmam&pd_rd_r=36e6f002-0ba6-4552-be73-d60c5bfcbabe";


async function checkprice() {
  const priceString = await nightmare
    .goto(url)
    .wait("#priceblock_ourprice")
    .evaluate(() => document.getElementById("priceblock_ourprice").innerText)
    .end();
  const priceNumber = parseFloat(priceString.replace("$", ""));
  if (priceNumber < 200) {
    console.log("it is cheap!");
  } else {
    console.log("it is expensive");
  }
}

checkprice();
