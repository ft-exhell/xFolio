import { doc, updateDoc, arrayRemove } from 'firebase/firestore';
import { db } from '../lib/firebase';
import Link from 'next/link';

export default function Addresses({ uid, addresses, bitcoinBalances, ethereumBalances, solanaBalances, handleToggleAddAddress }) {
    const handleAddressRemove = async (address, chain) => {
        const userRef = doc(db, 'users', uid);
        
        await updateDoc(userRef, {
            [`addresses.${chain}`] : arrayRemove(address)
        });
    }

    console.log(bitcoinBalances)

    return (
        <>
        <div>
        <h2 className="font-medium leading-tight text-3xl">Your Addresses</h2>
            <h3>Bitcoin</h3>
            <ul>
                {addresses && addresses.bitcoin?.map((el, i) => (
                    <li key={i}>
                        {el}, balance: {bitcoinBalances ? bitcoinBalances[i] : 'Loading...'}
                        <button
                            className="bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-medium py-1 px-2 m-2 rounded"
                            onClick={() => handleAddressRemove(el, 'bitcoin')}
                        >
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
            <h3>Ethereum</h3>
            <ul>
                {addresses && addresses.ethereum?.map((el, i) => (
                    <li key={i}>
                        {el}, ETH balance: {ethereumBalances[i] ? ethereumBalances[i].ethBalance : 'Loading...'}
                        , <Link style={{'color': 'blue', textDecoration: 'underline'}}href='/ethereum-accounts'>ERC-20 balances</Link>
                        <button
                            className="bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-medium py-1 px-2 m-2 rounded"
                            onClick={() => handleAddressRemove(el, 'ethereum')}
                        >
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
            <h3>Solana</h3>
            <ul>
                {addresses && addresses.solana?.map((el, i) => (
                    <li key={i}>
                        {el}, balance: {solanaBalances[i] ? solanaBalances[i] : 'Loading...'}
                        <button
                            className="bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-medium py-1 px-2 m-2 rounded"
                            onClick={() => handleAddressRemove(el, 'solana')}
                        >
                            Remove
                        </button>
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
            
        </>
    )
}