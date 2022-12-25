export default function Addresses({ addresses }) {
    return (
        <div>
            <h2 className="font-medium leading-tight text-3xl">Your Addresses</h2>
            <h3>EVM (e.g., Ethereum, BSC, Avalanche)</h3>
            <ul>
                {addresses && addresses.evm?.map((el, i) => (
                    <li key={i}>
                        {el}
                    </li>
                ))}
            </ul>
            <h3>UTXO (e.g., Bitcoin, Cardano)</h3>
            <ul>
                {addresses && addresses.utxo?.map((el, i) => (
                    <li key={i}>
                        {el}
                    </li>
                ))}
            </ul>
            <h3>Solana</h3>
            <ul>
                {addresses && addresses.solana?.map((el, i) => (
                    <li key={i}>
                        {el}
                    </li>
                ))}
            </ul>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded">
                +
            </button>
        </div>
    )
}