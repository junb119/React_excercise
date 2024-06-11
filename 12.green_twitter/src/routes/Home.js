import React, { useEffect, useState } from 'react';
import { collection, addDoc, query, onSnapshot, orderBy, getDocs, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import Post from '../components/Post';

const Home = ({ userObj }) => {
  const [post, setPost] = useState('');
  const [posts, setPosts] = useState([]);
  const [attachment, setAttachment] = useState();
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
        content: post,
        date: serverTimestamp(),
        uid: userObj,
      });
      setPost('');
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };
  // const getPosts = async () => {
  //   const querySnapshot = await getDocs(collection(db, 'posts'));
  //   querySnapshot.forEach((doc) => {
  //     // console.log(doc.id, ' => ', doc.data());
  //     const postObj = {
  //       ...doc.data(),
  //       id: doc.id,
  //     };
  //     setPosts((prev) => [...prev, postObj]);
  //   });
  // };
  console.log(posts);
  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('date', 'desc'));
    onSnapshot(q, (querySnapshot) => {
      let postArr = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPosts(postArr);
    });
  }, []);
  const onFileChange = (e) => {
    console.log(e.target.files);
    const {
      target: { files },
    } = e;
    const theFile = files[0];
    console.log(theFile);
    const reader = new FileReader();
    reader.onloadend = (e) => {
      const {
        target: { result },
      } = e;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);

    // reader.addEventListener(
    //   "load",
    //   function () {
    //     preview.src = reader.result;
    //   },
    //   false,
    // );

    // if (file) {
    //   reader.readAsDataURL(file);
    // }
  };

  return (
    <div>
      <form action="" onSubmit={onSubmit}>
        <input type="text" value={post} placeholder="Write your twitt" onChange={onChange} />
        <input type="file" accept="image/*" onChange={onFileChange} />
        {attachment && <img src={attachment} width="50" alt="" />}
        <input type="submit" value="App Post" />
      </form>
      <ul>
        {posts.map((list) => (
          <Post key={list.id} postObj={list} isOwener={list.uid === userObj} />
        ))}
      </ul>
    </div>
  );
};

export default Home;
