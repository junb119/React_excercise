import { click } from '@testing-library/user-event/dist/click';
import { useState } from 'react';

function Button({ value, onclick, reset }) {
  const [isClicked, setIsClicked] = useState(false);
  let className = 'button';
  if (isClicked) {
    className += ' guessed';
  }
  if (reset) {
    className = 'button';
  }
  function clickHandler() {
    setIsClicked(true);
    onclick(value);
  }
  return (
    <button className={className} onClick={clickHandler}>
      {value}
    </button>
  );
}

export default Button;
