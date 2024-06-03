import { useState } from 'react';
import './App.css';
import Gameboard from './Gameboard';
import WordSelect from './WordSelect';

function App() {
  const [secretword, setSecretWord] = useState('');
  const [isShown, setIsShown] = useState(false);

  return (
    <div className="App">
      <h1>Hangman</h1>
      <p>Do you want to play game</p>
      <div>
        {!isShown ? (
          <WordSelect
            wordSelected={(val) => {
              setSecretWord(val);
              setIsShown(true);
            }}
          />
        ) : (
          <Gameboard secretword={secretword} maxError={secretword.length + 3} isShown={secretword} />
        )}
      </div>
    </div>
  );
}

export default App;
