import { Fragment, useRef, useState } from 'react'
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Dialog, Transition } from '@headlessui/react'

export default function AddAddressModal({ uid, handleToggleAddAddress }) {
  const [chain, setChain] = useState('bitcoin');
  const [address, setAddress] = useState('');
  const [open, setOpen] = useState(true)

  const chains = [
    {
      label: 'Bitcoin',
      value: 'bitcoin',
    }, 
    {
      label: 'Ethereum',
      value: 'ethereum',
    },
    {
      label: 'Solana',
      value: 'solana',
    }
  ]

  const cancelButtonRef = useRef(null)

  const handleAddAddress = async (e) => {
    e.preventDefault();
    const userRef = doc(db, 'users', uid);
    const docSnap = await getDoc(userRef);
    const userData = docSnap.data();

    if (userData.addresses.length === 0 || !userData.addresses[chain]) {
      await updateDoc(userRef, { [`addresses.${chain}`]: [address]})
      handleToggleAddAddress(false);
    } 
    else {
      const targetChain = userData.addresses[chain]

      await updateDoc(userRef, { [`addresses.${chain}`]: [...targetChain, address]})
      handleToggleAddAddress(false);
    }
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={handleToggleAddAddress}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start justify-center">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <Dialog.Title as="h3" className="mb-2 text-lg text-center font-medium leading-6 text-gray-900">
                        Add an address
                      </Dialog.Title>
                      <div className='flex justify-around'>
                        <form className='mt-2 '>
                          <select className='mr-10' value={chain} onChange={(e) => setChain(e.target.value)}>
                            {chains.map((chain) => (
                              <option key={chain.value} value={chain.value}>{chain.label}</option>
                            ))}
                          </select>
                          <input
                            name='address'
                            type='text'
                            placeholder='your address here'
                            className='shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            value={address}
                            onChange={((e) => setAddress(e.target.value))}
                          />
                          <button 
                            className='block m-auto mt-5 shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
                            onClick={handleAddAddress}
                          >
                            Add
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}