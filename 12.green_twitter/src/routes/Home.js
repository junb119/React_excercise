import React, { useEffect, useState } from 'react';
import { collection, addDoc, query, onSnapshot, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import Post from '../components/Post';

const Home = ({ userObj }) => {
  const [post, setPost] = useState('');
  const [posts, setPosts] = useState([]);
  const [attachment, setAttachment] = useState();
  // const [attachmentUrl, setAttachmentUrl] = useState('');
  let attachmentUrl = '';
  const storage = getStorage();

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
    const inputFile = document.querySelector('#file');
    const fileRef = ref(storage, `${userObj}/${uuidv4()}.jpg`);
    // Data URL string
    const addPost = async () => {
      await addDoc(collection(db, 'posts'), {
        content: post,
        date: serverTimestamp(),
        uid: userObj,
        attachmentUrl,
      });
      setPost('');
      setAttachment('');
      inputFile.value = '';
    };
    try {
      if (inputFile.value) {
        uploadString(fileRef, attachment, 'data_url').then(async (snapshot) => {
          const url = await getDownloadURL(fileRef);
          attachmentUrl = url;
          addPost();
        });
      } else {
        addPost();
      }
    } catch (e) {
      alert('글 등록 실패');
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
  const onClearFile = () => {
    setAttachment(null);
    document.querySelector('#file').value = '';
  };
  return (
    <div>
      <form action="" onSubmit={onSubmit}>
        <input type="text" value={post} placeholder="Write your twitt" onChange={onChange} require="true" />
        <input type="file" accept="image/*" onChange={onFileChange} id="file" />
        {attachment && (
          <>
            <img src={attachment} width="50" alt="" />
            <button type="button" onClick={onClearFile}>
              파일 업로드 취소
            </button>
          </>
        )}

        <p>
          <input type="submit" value="App Post" />
        </p>
      </form>
      <hr />
      <ul>
        {posts.map((list) => (
          <Post key={list.id} postObj={list} isOwener={list.uid === userObj} />
        ))}
      </ul>
    </div>
  );
};

export default Home;
