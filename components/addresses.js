export default function Addresses({ addresses, bitcoinBalances, ethereumBalances, solanaBalances, handleToggleAddAddress }) {
    return (
        <div>
            <h2 className="font-medium leading-tight text-3xl">Your Addresses</h2>
            <h3>Bitcoin</h3>
            <ul>
                {addresses && addresses.bitcoin?.map((el, i) => (
                    <li key={i}>
                        {el}, balance: {bitcoinBalances[i]}
                    </li>
                ))}
            </ul>
            <h3>Ethereum</h3>
            <ul>
                {addresses && addresses.ethereum?.map((el, i) => (
                    <li key={i}>
                        {el}, balance: {ethereumBalances && ethereumBalances[i]}
                    </li>
                ))}
            </ul>
            <h3>Solana</h3>
            <ul>
                {addresses && addresses.solana?.map((el, i) => (
                    <li key={i}>
                        {el}, balance: {solanaBalances[i]}
                    </li>
                ))}
            </ul>
            <button 
                className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
                onClick={handleToggleAddAddress}
            >
                +
            </button>
        </div>
    )
}