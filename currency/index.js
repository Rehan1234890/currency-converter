require("dotenv").config();
const axios = require("axios");

const API_KEY = process.env.API_KEY;
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/`;

async function convertCurrency(amount, fromCurrency, toCurrency) {
    try {
        const response = await axios.get(`${BASE_URL}${fromCurrency}`);
        const exchangeRate = response.data.conversion_rates[toCurrency];

        if (!exchangeRate) {
            console.log("Invalid currency code.");
            return;
        }

        const convertedAmount = (amount * exchangeRate).toFixed(2);
        console.log(`${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`);
    } catch (error) {
        console.error("Error fetching exchange rates:", error.message);
    }
}

// Example usage: node index.js 100 USD EUR
const args = process.argv.slice(2);
if (args.length !== 3) {
    console.log("Usage: node index.js <amount> <from_currency> <to_currency>");
} else {
    const [amount, fromCurrency, toCurrency] = args;
    convertCurrency(parseFloat(amount), fromCurrency.toUpperCase(), toCurrency.toUpperCase());
}
