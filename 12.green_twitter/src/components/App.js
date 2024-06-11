import { useState, useEffect } from 'react';
import '../App.css';
import AppRouter from './Router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function App() {
  const [isLoggedIn, setIsloggedIn] = useState(false);
  const [init, setInit] = useState(false);
  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        setIsloggedIn(true);
        console.log(uid);
      } else {
        setIsloggedIn(false);
        // User is signed out
        // ...
      }
      setInit(true);
    });
  }, []);
  return <>{init ? <AppRouter isLoggedIn={isLoggedIn} /> : 'Initializeng..'}</>;
}

export default App;
