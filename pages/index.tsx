import { useState, useEffect } from 'react';
import Head from 'next/head'
import { ethers } from 'ethers';
import { useUserData } from '../lib/hooks';
import WelcomeModal from '../components/welcomeModal'
import AddAddressModal from '../components/addAddressModal';
import Navbar from '../components/navbar';
import TotalBalance from '../components/totalBalance';
import Addresses from '../components/addresses';


export default function Home() {
  const { user, username, addresses } = useUserData();
  const [bitcoinBalances, setBitcoinBalances] = useState([]);
  const [ethBalances, setEthBalances] = useState([]);
  const [solanaBalances, setSolanaBalances] = useState([]);
  const [addAddress, setAddAddress] = useState(false);

  const getBitcoinBalances = async (address) => {
    const res = await fetch(`https://api.blockcypher.com/v1/btc/main/addrs/${address}/balance`);
    const data = await res.json();

    return data.balance / 100000000;
  }

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
          balance: ethers.utils.parseUnits(item.balance.toString(), item.contract_decimals),
        }
      )
    });

    return { ethBalance, erc20Balances }
  }

  const getSolanaBalances = async (address) => {
    const res = await fetch(`https://api.covalenthq.com/v1/1399811149/address/${address}/balances_v2/?key=${process.env.NEXT_PUBLIC_COVALENT_API_KEY}`);
    const data = await res.json();
    const sol = data.data.items.filter(token => token.contract_address === "11111111111111111111111111111111")

    return sol[0].balance / 1000000000;
  }

  const handleToggleAddAddress = () => {
    setAddAddress(!addAddress);
  }

  useEffect(() => {
    if (addresses) {
      for (const addrType in addresses) {
        if (addrType === 'bitcoin') {
          const requests = [];
          addresses[addrType].forEach(address => {
            requests.push(getBitcoinBalances(address));
          });
          Promise.all(requests)
            .then(balances => setBitcoinBalances(balances))
        }
        if (addrType === 'ethereum') {
          const requests = [];
          addresses[addrType].forEach(address => {
            requests.push(getEthereumBalances(address));
          });
          Promise.all(requests)
            .then(balances => setEthBalances(balances))
        }
        if (addrType === 'solana') {
          const requests = [];
          addresses[addrType].forEach(address => {
            requests.push(getSolanaBalances(address));
          });
          Promise.all(requests)
            .then(balances => setSolanaBalances(balances))
        }
      }
    }
  }, [addresses])

  return (
    <>
      <Head>
        <title>xFolio</title>
        <meta name="description" content="Cross-chain portfolio app." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        {user && (
          <>
            <Navbar username={username} />
            <div className='h-screen flex items-center justify-evenly'>
              <Addresses
                uid={user.uid}
                addresses={addresses}
                bitcoinBalances={bitcoinBalances}
                ethereumBalances={ethBalances}
                solanaBalances={solanaBalances}
                handleToggleAddAddress={handleToggleAddAddress}
              />
              <TotalBalance 
                bitcoinBalances={bitcoinBalances}
                ethereumBalances={ethBalances}
                solanaBalances={solanaBalances} 
              />
            </div>
          </>
        )}
        {addAddress && <AddAddressModal uid={user.uid} handleToggleAddAddress={handleToggleAddAddress} />}
        {!user && <WelcomeModal />}
      </main>
    </>
  )
}
