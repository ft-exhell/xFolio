import Head from 'next/head'
import { useUserData } from '../lib/hooks';
import WelcomeModal from '../components/welcomeModal'
import Navbar from '../components/navbar';
import TotalBalance from '../components/totalBalance';
import Addresses from '../components/addresses';


export default function Home() {
  const { user, username, addresses } = useUserData();

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
              <Addresses addresses={addresses} />
              <TotalBalance addresses={addresses}/>
            </div>
          </>
        )}
        {!user && <WelcomeModal isOpen={!user} />}
      </main>
    </>
  )
}
