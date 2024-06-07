import { useState } from 'react';
import '../App.css';
import AppRouter from './Router';

function App() {
  const [isLoggedIn, setIsloggedIn] = useState(false);
  return <AppRouter isLoggedIn={isLoggedIn} />;
}

export default App;
