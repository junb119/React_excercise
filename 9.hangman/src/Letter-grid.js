import Letter from './Letter';

const LetterGrid = ({ secretword, guessedLetters }) => {
  let letters = secretword.split('').map((letter, idx) => {
    let isShown = guessedLetters.indexOf(letter.toLowerCase()) > -1;

    return <Letter key={idx} value={letter} isShown={isShown} />;
  });
  console.log(letters);

  return <div className='letters'>{letters}</div>;
};
export default LetterGrid;
