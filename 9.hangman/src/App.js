import { useState } from 'react';
import './App.css';
import Gameboard from './Gameboard';
import WordSelect from './WordSelect';

function App() {
  const [secretword, setSecretWord] = useState('');
  const [isShown, setIsShown] = useState(false);
  const colors = ['red', 'green', 'blue'];

  // 개발자가 직접 작성한 콜백 함수
  function findGreen(color) {
    return color === 'green'; // 배열 요소가 "green"과 같은지 확인합니다.
  }

  // 배열에서 조건을 만족하는 첫 번째 요소를 찾습니다.
  const green = colors.find(findGreen);

  // 결과를 출력합니다.
  console.log(green); // 출력: "green"
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
