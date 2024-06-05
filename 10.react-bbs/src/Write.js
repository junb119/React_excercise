import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Axios from 'axios';

export default class Write extends Component {
  state = {
    title: '',
    content: '',
  };
  write = () => {
    Axios.post('http://localhost:8000/insert', { title: this.state.title, content: this.state.content })
      .then((res) => {
        // 성공 핸들링
        alert('등록 완료');
      })
      .catch(function (error) {
        // 에러 핸들링
        console.log(error);
      });
  };
  update = () => {
    Axios.post('http://localhost:8000/update', {
      id: this.props.boardId,
      title: this.state.title,
      content: this.state.content,
    })
      .then((res) => {
        // 성공 핸들링
        alert('수정 완료');
        this.setState({ title: '', content: '' });
        this.props.handleCancel();
      })
      .catch(function (error) {
        // 에러 핸들링
        console.log(error);
      });
  };
  detail = () => {
    Axios.get(`http://localhost:8000/detail?id=${this.props.boardId}`)
      .then((res) => {
        // 성공 핸들링
        if (res.data.length > 0) {
          this.setState({
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
  componentDidUpdate = (prevProps) => {
    console.log('componentDidUpdate');
    if (this.props.isModifyMode && this.props.boardId !== prevProps.boardId) {
      this.detail();
    }
  };

  inputHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    console.log('write');
    return (
      <>
        <Form>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>제목</Form.Label>
            <Form.Control
              type="text"
              placeholder="제목을 입력하세요"
              onChange={this.inputHandler}
              name="title"
              value={this.state.title}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="content">
            <Form.Label>내용</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              onChange={this.inputHandler}
              name="content"
              value={this.state.content}
            />
          </Form.Group>
        </Form>
        <div className="d-flex gap-1">
          <Button
            variant="info"
            onClick={() => {
              this.props.isModifyMode ? this.update() : this.write();
            }}
          >
            작성완료
          </Button>
          <Button variant="secondary">취소</Button>
        </div>
      </>
    );
  }
}
