import axios from "axios";

class Btc {
    constructor() {
    }

    async getPrice() {
        const {data: {bpi: {UAH}}} = await axios.get("https://api.coindesk.com/v1/bpi/currentprice/UAH.json");

        return  {
            btcValue: 1,
            rate: UAH.rate_float
        };
    }
}

export default new Btc();