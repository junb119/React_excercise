import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

const Home = () => {
  const [post, setPost] = useState('');
  const onChange = (e) => {
    // let val = e.target.value
    const {
      target: { value },
    } = e;
    setPost(value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, 'posts'), {
        title: 'Lovelace',
        date: serverTimestamp(),
      });
      setPost('');
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };
  return (
    <div>
      <form action="" onSubmit={onSubmit}>
        <input type="text" value={post} placeholder="Write your twitt" onChange={onChange} />
        <input type="submit" value="App Post" />
      </form>
    </div>
  );
};

export default Home;
