import { useEffect, useState } from "react";

// Variables
import { CURRENCIES } from "@/lib/variables";

const useCurrencies = () => {
    const [currencies, setCurrencies] = useState<any>([]);
    const [currenciesLoading, setCurrenciesLoading] = useState<boolean>(false);

    /**
     * Fetches all the currencies asynchronously.
     *
     * @return {Promise<void>} Promise that resolves when the currencies are fetched.
     */
    const fetchCurrencies = async () => {
        setCurrenciesLoading(true);

        try {
            const response = await fetch(`${CURRENCIES}`);
            const data = await response.json();

            const currencyOptions = Object.keys(data).map((currencyCode) => {
                const currencyName = data[currencyCode];
                return { code: currencyCode, name: currencyName };
            });

            setCurrencies(currencyOptions);
        } catch (err) {
            console.log(err);
        } finally {
            setCurrenciesLoading(false);
        }
    };

    useEffect(() => {
        fetchCurrencies();
    }, []);

    return { currencies, currenciesLoading, fetchCurrencies };
};

export default useCurrencies;
