import { useState } from 'react';

const WordSelect = ({ wordSelected }) => {
  const [secretWord, setSecretWord] = useState('');

  return (
    <div>
      <input type="text" onChange={(e) => setSecretWord(e.target.value)} />
      <button type="button" onClick={() => wordSelected(secretWord)}>
        입력
      </button>
    </div>
  );
};
export default WordSelect;
