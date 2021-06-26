import Btc from "../services/btc";

export default async ({coins}) => {
    const rate = await Btc.getPrice({coins});

    return rate;
}