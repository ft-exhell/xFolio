import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import zxcvbn from "zxcvbn";
import { auth, db } from '../../lib/firebase';
import PasswordStrengthMeter from "./PasswordStrengthMeter";

const SignUpWithEmail = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordScore, setPasswordScore] = useState(0);
    const [error, setError] = useState(null);

    const router = useRouter();

    const handleSignupWithEmail = async (e) => {
        try {
            e.preventDefault();
            if (passwordScore < 75) {
                setError('come up with a stronger password')
                return
            }
            const res = await createUserWithEmailAndPassword(auth, email, password);
            await setDoc(doc(db, 'users', res.user.uid), {
                addresses: [],
            })
            router.push('/')
        } catch (err) {
            console.log(err)
            switch (err.code) {
                case 'auth/email-already-in-use':
                    setError(
                        <>
                            <p>
                                This email is already registered. Did you mean to <Link
                                    style={{ textDecoration: "underline" }}
                                    href="/login"
                                >
                                    log in
                                </Link>?
                            </p>
                        </>
                    );
                    break
                default:
                    setError('something went wrong with our database, retry')
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

    useEffect(() => {
        setPasswordScore(zxcvbn(password).score * 100 / 4);
    }, [password])

    return (
        <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={handleSignupWithEmail}
        >
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2 text-center" htmlFor="email">
                    Email
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    placeholder="pepe@gmail.com"
                    required
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
                    placeholder="super strong password"
                    required
                    onChange={handlePasswordChange}
                />
                <PasswordStrengthMeter passwordScore={passwordScore} />

            </div>
            <div className="flex items-center justify-center">
                <button
                    className="
                        bg-blue-500 
                        hover:bg-blue-700 
                        text-white font-medium 
                        py-2 px-4 
                        rounded 
                        focus:outline-none 
                        focus:shadow-outline"
                    type="submit"
                >
                    Sign Up
                </button>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    )
}

export default SignUpWithEmail;