import { useState, useEffect } from "react"

export default function TotalBalance({ bitcoinBalances, ethereumBalances, solanaBalances }) {
    const [btcValueUSD, setBtcValueUSD] = useState(0);
    const [ethValueUSD, setEthValueUSD] = useState(0);
    const [solValueUSD, setSolValueUSD] = useState(0);

    useEffect(() => {
        if (bitcoinBalances && bitcoinBalances.length > 0) {
            const totalBitcoin = bitcoinBalances.reduce((accumulator, balance) => accumulator + balance);
            fetch('https://api.coingecko.com/api/v3/coins/bitcoin')
                .then(res => res.json())
                .then(data => {
                    const btcPrice = data?.market_data.current_price.usd;
                    setBtcValueUSD((btcPrice * totalBitcoin));
                })
        }
        if (ethereumBalances && ethereumBalances.length > 0) {
            const totalEth= ethereumBalances.reduce((accumulator, obj) => {
                console.log(typeof(obj.ethBalance))
                return accumulator + parseInt(obj.ethBalance);
            }, 0);
            fetch('https://api.coingecko.com/api/v3/coins/ethereum')
                .then(res => res.json())
                .then(data => {
                    const ethPrice = data?.market_data.current_price.usd;
                    setEthValueUSD((ethPrice * totalEth));
                })
        }
        if (solanaBalances && solanaBalances.length > 0) {
            const totalSol = solanaBalances.reduce((accumulator, balance) => accumulator + balance);
            fetch('https://api.coingecko.com/api/v3/coins/solana')
                .then(res => res.json())
                .then(data => {
                    const solPrice = data?.market_data.current_price.usd;
                    setSolValueUSD((solPrice * totalSol));
                })
        }
    }, [bitcoinBalances, ethereumBalances, solanaBalances])

    return (
        <div>
            <h2 className="font-medium leading-tight text-3xl">Your portfolio value is ${(btcValueUSD + ethValueUSD + solValueUSD).toLocaleString('en-US', {maximumFractionDigits: 0})}</h2>
        </div>
    )
}