import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Axios from 'axios';
import Board from './Board';

export default class BoardList extends Component {
  state = {
    boardList: [],
    checkList: [],
    boardId: 0,
  };
  getList = () => {
    Axios.get('http://localhost:8000/list')
      .then((res) => {
        // 성공 핸들링
        const { data } = res;
        this.setState({
          boardList: data,
          checklist: [],
        });

        this.props.renderComplete(); // 목록 출력 완료
      })
      .catch(function (error) {
        // 에러 핸들링
        console.log(error);
      });
  };
  componentDidMount() {
    this.getList();
  }

  onCheckboxChange = (checked, id) => {
    let list = this.state.checkList;
    if (checked) {
      if (list.indexOf(id) === -1) list.push(id);
    } else {
      let idx = list.indexOf(id);
      list.splice(idx, 1);
    }
    this.setState({ checkList: list });
  };
  handleModify = () => {
    let checklist = this.state.checkList;
    if (!checklist.length) {
      alert('최소 하나를 체크해주세요');
    } else if (checklist.length > 1) {
      alert('하나만 체크해주세요');
    }
    this.setState({ boardId: checklist[0] });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.checkList.length === 1 && this.state.boardId !== prevState.boardId) {
      this.props.handleModify(this.state.boardId);
    }

    if (!this.props.isComplete && prevProps.isComplete !== this.props.isComplete) {
      this.getList();
    }
  }

  render() {
    console.log('boardList');
    return (
      <>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">선택</th>
              <th scope="col">번호</th>
              <th scope="col">제목</th>
              <th scope="col">작성자</th>
              <th scope="col">작성일</th>
            </tr>
          </thead>
          <tbody>
            {this.state.boardList.map((list) => {
              return <Board key={list.id} data={list} onCheckboxChange={this.onCheckboxChange} />;
            })}
          </tbody>
        </table>
        <div className="d-flex gap-3 justify-content-between">
          <div className="d-flex gap-1">
            <Button variant="info" onClick={() => this.handleModify()}>
              수정
            </Button>
            <Button variant="danger">삭제</Button>
          </div>
          <Button variant="primary" onClick={() => {}}>
            글쓰기
          </Button>
        </div>
      </>
    );
  }
}
