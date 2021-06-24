import Btc from "../services/btc";

export default async (req, res) => {
    const rate = await Btc.getPrice();

    res.send(rate);
}