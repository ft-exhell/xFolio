import { useState } from "react";
import { useRouter } from 'next/router';
import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../lib/firebase';

const LoginWithEmail = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null)

    const router = useRouter()

    const signUpWithEmail = async (e) => {
        try {
            e.preventDefault();
            await signInWithEmailAndPassword(auth, email, password);
            router.push('/')
        } catch (err) {
            switch (err.code) {
                case 'auth/wrong-password':
                    setError('wrong password');
                    break;
                default:
                    setError('something went wrong, try again later');
            }
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
            <div>
                <Link style={{ textDecoration: 'underline', color: 'blue' }} href="/reset-password">Forgot password?</Link>
            </div>
            <div className="flex items-center justify-center">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"
                    onClick={signUpWithEmail}
                >
                    Log In
                </button>
            </div>
            {error && <p className="text-red-500">{error}</p>}
        </form>
    )
}

export default LoginWithEmail;