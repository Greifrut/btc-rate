import axios from "axios";

class Btc {
    constructor() {}

    async getPrice() {
      return await axios.get("https://api.coindesk.com/v1/bpi/currentprice.json");
    }
}

export default new Btc();