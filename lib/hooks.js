import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

export const useUserData = () => {
    const [user] = useAuthState(auth);
    const [username, setUsername] = useState(null);
    const [addresses, setAddresses] = useState(null);

    useEffect(() => {
    // turn off real-time subscription when it's no longer needed
    let unsubscribe;

    if (user) {
        const ref = doc(db, 'users', user.uid);
        unsubscribe = onSnapshot(ref, (doc) => {
            setUsername(doc.data()?.username);
            setAddresses(doc.data()?.addresses);
        });
    } else {
        setUsername(null);
    }

    return unsubscribe;
    }, [user])

    return { user, username, addresses };
}