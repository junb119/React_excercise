import LetterGrid from './Letter-grid';
import ButtonGrid from './Button-grid';
import { useState } from 'react';
// function Gameboard() {
//   return (
//     <div>
//       <h2>Gameboard</h2>
//     </div>
//   );
// }
// export default Gameboard

const Gameboard = ({ secretword, maxError }) => {
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [errorCount, setErrorCount] = useState(0);
  const [reset, setReset] = useState(false);

  const guessedLetterHandler = (value) => {
    let val = value.toLowerCase();
    setGuessedLetters((prev) => [...prev, val]);
    secretword = secretword
      .split('')
      .map((item) => item.toLowerCase())
      .join('');

    if (secretword.indexOf(val) === -1) {
      setErrorCount(errorCount + 1);
    }
    if (reset) {
      setReset(false);
      setGuessedLetters([]);
    }
  };
  return (
    <div>
      <p>남은 횟수 : {maxError - errorCount}</p>
      <LetterGrid secretword={secretword} guessedLetters={guessedLetters} />
      <ButtonGrid onclick={guessedLetterHandler} isShown={maxError - errorCount} reset={reset} />
      {errorCount === maxError && (
        <button
          onClick={() => {
            setErrorCount(0);
            setGuessedLetters([]);
            setReset(true);
          }}
        >
          reset
        </button>
      )}
    </div>
  );
};
export default Gameboard;
