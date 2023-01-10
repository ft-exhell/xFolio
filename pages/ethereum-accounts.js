import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useUserData } from "../lib/hooks";

const getEthereumBalances = async (address) => {
    const res = await fetch(`https://api.covalenthq.com/v1/1/address/${address}/balances_v2/?key=${process.env.NEXT_PUBLIC_COVALENT_API_KEY}`);
    const data = await res.json();
    let ethBalance;
    const erc20Balances = [];

    data.data.items.forEach(item => {
        if (item.type != 'cryptocurrency') {
            return;
        }

        if (item.contract_address === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
            ethBalance = ethers.utils.formatUnits(item.balance.toString(), 18);
        }

        erc20Balances.push(
            {
                contractAddress: item.contract_address,
                contractName: item.contract_name,
                decimals: item.contract_decimals,
                balance: ethers.utils.formatUnits(item.balance.toString(), item.contract_decimals).toString(),
            }
        )
    });

    return { address, ethBalance, erc20Balances }
}

const EthereumAccounts = () => {
    const { addresses } = useUserData();
    const [active, setActive] = useState(undefined);
    const [activeBalanances, setActiveBalances] = useState(undefined);

    useEffect(() => {
        if (addresses) {
            if (!active) {
                setActive(addresses.ethereum[0])
            }
            getEthereumBalances(active ? active : addresses.ethereum[0])
                .then(data => {
                    setActiveBalances(data.erc20Balances);
                })
        }
    }, [addresses, active])

    console.log(active)

    return (
        <>
            <h1 className="font-medium">Your Accounts</h1>
            <ul>
                {addresses && addresses.ethereum?.map((el, i) => (
                    <li
                        key={i}
                        className={`list-item ${active == el && 'text-blue-500'}`}
                    >
                        <button
                            onClick={() => setActive(el)}
                        >
                            {el}
                        </button>
                    </li>
                ))}
            </ul>
            <h1 className="font-medium">ERC-20 balances</h1>
            <ul>
                {activeBalanances && activeBalanances.map((el, i) => {
                    if (el.contractAddress === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
                        return
                    }
                    return (
                        <li
                            key={i}
                        >
                            {el.contractName} : {el.balance.toString()}
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

export default EthereumAccounts;