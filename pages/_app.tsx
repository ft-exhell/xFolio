
import { useUserData } from '../lib/hooks';
import { UserContext} from '../lib/context';

import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  const userData = useUserData(UserContext);

  return (
    <UserContext.Provider value={userData}>
        <Component {...pageProps} />
    </UserContext.Provider>
  )
}