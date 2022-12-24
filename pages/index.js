import { useContext, useState, useEffect } from 'react'
import Head from 'next/head'
import { useUserData } from '../lib/hooks';
import WelcomeModal from '../components/welcomeModal'
import Navbar from '../components/navbar';


export default function Home() {
  const { user } = useUserData();

  return (
    <>
      <Head>
        <title>xFolio</title>
        <meta name="description" content="Cross-chain portfolio app." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <Navbar />
          {!user &&<WelcomeModal isOpen={!user}/>}
      </main>
    </>
  )
}
