import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../lib/firebase';

const ResetPasswordForm = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [requested, setRequested] = useState(false);

    const handleReset = async (e) => {
        try {
            e.preventDefault();
            setError(null);
            await sendPasswordResetEmail(auth, email);
            setRequested(true)
        } catch (err) {
            switch (err.code) {
                case 'auth/user-not-found':
                    setError(`this email isn't registered`);
                    break;
                default:
                    setError('something went wrong, try again later');
            }
        }
    }

    return (
        <div className='w-full max-w-xs'>
            {requested ? (
                <p>An email has been sent to {email}. Follow the instructions.</p>
            ) : (
                <form
                    className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
                    onSubmit={handleReset}
                >
                    <label
                        className='block text-gray-700 text-sm font-bold mb-2 text-center" htmlFor="email'
                    >
                        Email
                    </label>
                    <input
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4'
                        type='email'
                        placeholder='your email'
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
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
                        Reset password
                    </button>
                </form>
            )}
            {error && <p className='text-red-500'>{error}</p>}
        </div>
    )
}

export default ResetPasswordForm;