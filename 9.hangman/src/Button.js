import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { increment } from './CounterSlice';

// eslint-disable-next-line
function Button({ value, onclick, reset }) {
  const dispatch = useDispatch();

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
    dispatch(increment(value));
  }
  return (
    <button className={className} onClick={clickHandler}>
      {value}
    </button>
  );
}

export default Button;
