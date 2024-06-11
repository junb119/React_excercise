import React, { useEffect, useState } from 'react';
import { collection, addDoc, query, where, getDocs, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

const Home = () => {
  const [post, setPost] = useState('');
  // const q = query(collection(db, "cities"), where("capital", "==", true));

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
        post,
        date: serverTimestamp(),
      });
      setPost('');
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };
  const getPosts = async () => {
    const querySnapshot = await getDocs(collection(db, 'posts'));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, ' => ', doc.data());
      console.log(doc);
    });
  };
  useEffect(() => {
    getPosts();
  }, []);
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
