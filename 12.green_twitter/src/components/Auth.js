import React, { useState } from 'react';
import { authService } from '../firebase';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(true);
  const auth = getAuth();
  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === 'email') setEmail(value);
    else setPassword(value);
  };
  const onSubmit = (e) => {
    console.log('test');
    e.preventDefault();
    if (newAccount) {
      // 회원가입
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log('user', user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log('errorCode', errorCode);
          console.log('errorMessage', errorMessage);
          // ..
        });
    } else {
      // 로그인
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    }
  };
  console.log(email, password);
  return (
    <form onSubmit={onSubmit}>
      <input type="email" name="email" placeholder="Email을 입력하세요" onChange={onChange} />
      <input type="password" name="password" placeholder="Password을 입력하세요" onChange={onChange} />
      <p>
        <button>{newAccount ? '회원가입' : '로그인'}</button>
      </p>
    </form>
  );
};

export default Auth;
