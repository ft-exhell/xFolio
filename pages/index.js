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
  const [ethereumBalances, setEthereumBalances] = useState([]);
  const [solanaBalances, setSolanaBalances] = useState([]);
  const [addAddress, setAddAddress] = useState(false);

  const getBitcoinBalances = async (address) => {
    const res = await fetch(`https://api.blockcypher.com/v1/btc/main/addrs/${address}/balance`);
    const data = await res.json();

    return data.balance / 100000000;
  }

  const getEthereumBalances = async (address) => {
    const res = await fetch(`http://localhost:8080/https://api.covalenthq.com/v1/1/address/${address}/balances_v2/?key=${process.env.NEXT_PUBLIC_COVALENT_API_KEY}`);
    const data = await res.json();
    const eth = data.data.items.filter(token => token.contract_address === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
    const bigNumber = ethers.utils.parseUnits(data.data.items[0].balance.toString(), 'wei');

    return ethers.utils.formatUnits(bigNumber, 'ether');
  }

  const getSolanaBalances = async (address) => {
    const res = await fetch(`http://localhost:8080/https://api.covalenthq.com/v1/1399811149/address/${address}/balances_v2/?key=${process.env.NEXT_PUBLIC_COVALENT_API_KEY}`);
    const data = await res.json();
    const sol = data.data.items.filter(token => token.contract_address === "11111111111111111111111111111111")

    return sol[0].balance / 1000000000;
  }

  const handleToggleAddAddress = () => {
    setAddAddress(!addAddress);
    console.log(addAddress)
  }

  console.log(addAddress)


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
            .then(balances => setEthereumBalances(balances))
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
                addresses={addresses}
                bitcoinBalances={bitcoinBalances}
                ethereumBalances={ethereumBalances}
                solanaBalances={solanaBalances}
                handleToggleAddAddress={handleToggleAddAddress}
              />
              <TotalBalance addresses={addresses} />
            </div>
          </>
        )}
        {addAddress && <AddAddressModal uid={user.uid} handleToggleAddAddress={handleToggleAddAddress} />}
        {!user && <WelcomeModal />}
      </main>
    </>
  )
}
