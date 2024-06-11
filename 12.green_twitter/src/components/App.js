import { useState, useEffect } from 'react';
import '../App.css';
import AppRouter from './Router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function App() {
  const [isLoggedIn, setIsloggedIn] = useState(false);
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        setUserObj(uid);
        setIsloggedIn(true);
      } else {
        setIsloggedIn(false);
        // User is signed out
        // ...
      }
      setInit(true);
    });
  }, []);
  return <>{init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} /> : 'Initializeng..'}</>;
}

export default App;
