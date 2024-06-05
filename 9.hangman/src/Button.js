import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addLetters } from './LetterSlice';

// eslint-disable-next-line
export default function ({ value, onclick, reset }) {
  const dispatch = useDispatch();

  const [isClicked, setIsClicked] = useState(false);
  let className = 'button';

  if (isClicked) {
    className += ' guessed';
  }

  useEffect(() => {
    if (reset) {
      setIsClicked(false);
    }
  }, [reset]);

  if (reset) {
    className = 'button';
  }
  function clickHandler() {
    setIsClicked(true);
    dispatch(addLetters(value));
  }
  return (
    <button className={className} onClick={clickHandler}>
      {value}
    </button>
  );
}
