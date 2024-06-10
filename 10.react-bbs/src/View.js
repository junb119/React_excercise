import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

export default function View() {
  let location = useLocation();
  const id = new URLSearchParams(location.search).get('id');
  const [form, setForm] = useState({ title: '', content: '' });

  const detail = () => {
    Axios.get(`http://34.22.80.155:8000/detail?id=${id}`)
      .then((res) => {
        // 성공 핸들링
        if (res.data.length > 0) {
          setForm({
            title: res.data[0].title,
            content: res.data[0].content,
          });
        }
      })
      .catch(function (error) {
        // 에러 핸들링
        console.log(error);
      });
  };
  useEffect(() => {
    detail();
  });

  return (
    <div>
      <h2>글 상세</h2>
      <h3>{form.title}</h3>
      <div>{form.content}</div>
      <hr />
      <Link to="/">
        <Button variant="secondary">목록</Button>
      </Link>
    </div>
  );
}
