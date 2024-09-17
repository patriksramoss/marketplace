const geoip = require("geoip-lite");
const countryToCurrency = require("country-to-currency");

function findCurrency(ip) {
  console.log("IP ADDRESSS", ip);
  const geo = geoip.lookup(ip);
  console.log("GEO LOCATION", geo);

  const countryCode = geo ? geo.country : "US";
  console.log("country code", countryCode);

  const currencyCode = countryToCurrency[countryCode] || "USD";

  console.log("currney code", currencyCode);

  const currency = currencyCode;

  return currency;
}

module.exports = findCurrency;
