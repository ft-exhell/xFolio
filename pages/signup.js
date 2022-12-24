import { useState } from "react";
import { useRouter } from 'next/router';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../lib/firebase';

const SignUpWithEmail = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter()

    const signUpWithEmail = async (e) => {
        try {
            e.preventDefault();
            await createUserWithEmailAndPassword(auth, email, password);
            router.push('/')
        } catch (err) {
            console.log(err)
        }
    }

    const handleEmailChange = (e) => {
        e.preventDefault();
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        e.preventDefault();
        setPassword(e.target.value);
    }

    return (
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2 text-center" htmlFor="email">
                    Email
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    placeholder="pepe@gmail.com"
                    onChange={handleEmailChange}
                />
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2 text-center" htmlFor="password">
                    Password
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="******************"
                    onChange={handlePasswordChange}
                />
            </div>
            <div className="flex items-center justify-center">
                <button 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"
                    onClick={signUpWithEmail}
                >
                    Sign Up
                </button>
            </div>
        </form>
    )
}

export default function SignUp() {
    return (
        <main>
            <div className="h-screen flex flex-col items-center justify-center">
                <div className="w-full max-w-xs">
                    <SignUpWithEmail />
                </div>
            </div>
        </main>
    )
}