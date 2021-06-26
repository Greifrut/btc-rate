import Btc from "../services/btc";

export default async () => {
    const rate = await Btc.getPrice();

    return rate;
}