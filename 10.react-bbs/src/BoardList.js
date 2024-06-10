import React, { Component, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Axios from 'axios';
import Board from './Board';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function BoardList(props) {
  const [boardList, setBoardList] = useState([]);
  const [checkList, setCheckList] = useState([]);
  const [boardId, setBoardId] = useState(0);
  const navigate = useNavigate();

  const getList = () => {
    Axios.get('http://34.22.80.155:8000/list')
      .then((res) => {
        // 성공 핸들링
        const { data } = res;
        setBoardList(data);
        setCheckList([]);
        setBoardId(0);

        props.renderComplete(); // 목록 출력 완료
      })
      .catch(function (error) {
        // 에러 핸들링
        console.log(error);
      });
  };
  useEffect(() => {
    getList();
  }, []);

  const onCheckboxChange = (checked, id) => {
    let list = checkList;
    if (checked) {
      if (list.indexOf(id) === -1) list.push(id);
    } else {
      let idx = list.indexOf(id);
      list.splice(idx, 1);
    }
    setCheckList(list);
  };
  const handleModify = () => {
    let checklist = checkList;
    if (!checklist.length) {
      alert('최소 하나를 체크해주세요');
    } else if (checklist.length > 1) {
      alert('하나만 체크해주세요');
    } else {
      setBoardId(checklist[0]);
      props.handleModify(checklist[0]);
      navigate('/write');
    }
  };

  const handleDelete = () => {
    console.log('test');
    if (!checkList.length) {
      alert('삭제할 게시글을 선택하세요');
    } else {
      // let boardIdList = this.state.checkList.join("','");
      let boardIdList = '';
      checkList.forEach((item) => {
        boardIdList += `'${item}',`;
      });

      Axios.post('http://34.22.80.155:8000/delete', {
        boardIdList: boardIdList.substring(0, boardIdList.length - 1),
      })
        .then((res) => {
          // 성공 핸들링
          getList();
          alert('삭제 완료');
        })
        .catch(function (error) {
          // 에러 핸들링
          console.log(error);
        });
    }
  };

  useEffect(() => {
    if (!props.isComplete) {
      getList();
    }
  }, [props.isComplete]);

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
          {boardList.map((list) => {
            return <Board key={list.id} data={list} onCheckboxChange={onCheckboxChange} />;
          })}
        </tbody>
      </table>
      <div className="d-flex gap-3 justify-content-between">
        <div className="d-flex gap-1">
          <Button variant="info" onClick={handleModify}>
            수정
          </Button>

          <Button variant="danger" onClick={handleDelete}>
            삭제
          </Button>
        </div>
        <Link to="/write">
          <Button variant="primary" onClick={() => {}}>
            글쓰기
          </Button>
        </Link>
      </div>
    </>
  );
}

// export default class BoardList extends Component {
// state = {
//   boardList: [],
//   checkList: [],
//   boardId: 0,
// };
// getList = () => {
//   Axios.get('http://localhost:8000/list')
//     .then((res) => {
//       // 성공 핸들링
//       const { data } = res;
//       this.setState({
//         boardList: data,
//         checkList: [],
//         boardId: 0,
//       });

//       this.props.renderComplete(); // 목록 출력 완료
//     })
//     .catch(function (error) {
//       // 에러 핸들링
//       console.log(error);
//     });
// };
// componentDidMount() {
//   this.getList();
// }

// onCheckboxChange = (checked, id) => {
//   let list = this.state.checkList;
//   if (checked) {
//     if (list.indexOf(id) === -1) list.push(id);
//   } else {
//     let idx = list.indexOf(id);
//     list.splice(idx, 1);
//   }
//   this.setState({ checkList: list });
// };
// handleModify = () => {
//   let checklist = this.state.checkList;
//   if (!checklist.length) {
//     alert('최소 하나를 체크해주세요');
//   } else if (checklist.length > 1) {
//     alert('하나만 체크해주세요');
//   } else {
//     this.setState({ boardId: checklist[0] });
//     this.props.handleModify(checklist[0]);
//   }
// };
// handleDelete = () => {
//   console.log('test');
//   if (!this.state.checkList.length) {
//     alert('삭제할 게시글을 선택하세요');
//   } else {
//     // let boardIdList = this.state.checkList.join("','");
//     let boardIdList = '';
//     this.state.checkList.forEach((item) => {
//       boardIdList += `'${item}',`;
//     });

//     Axios.post('http://localhost:8000/delete', {
//       boardIdList: boardIdList.substring(0, boardIdList.length - 1),
//     })
//       .then((res) => {
//         // 성공 핸들링
//         this.getList();
//         alert('삭제 완료');
//       })
//       .catch(function (error) {
//         // 에러 핸들링
//         console.log(error);
//       });
//   }
// };

// componentDidUpdate(prevProps, prevState) {
//   if (this.state.checkList.length === 1 && this.state.boardId !== prevState.boardId) {
//     this.props.handleModify(this.state.boardId);
//   }

//   if (!this.props.isComplete && prevProps.isComplete !== this.props.isComplete) {
//     this.getList();
//   }
// }

//   render() {
//     console.log('boardList');
//     return (
//       <>
//         <table className="table table-hover">
//           <thead>
//             <tr>
//               <th scope="col">선택</th>
//               <th scope="col">번호</th>
//               <th scope="col">제목</th>
//               <th scope="col">작성자</th>
//               <th scope="col">작성일</th>
//             </tr>
//           </thead>
//           <tbody>
//             {this.state.boardList.map((list) => {
//               return <Board key={list.id} data={list} onCheckboxChange={this.onCheckboxChange} />;
//             })}
//           </tbody>
//         </table>
//         <div className="d-flex gap-3 justify-content-between">
//           <div className="d-flex gap-1">
//             <Button variant="info" onClick={this.handleModify}>
//               수정
//             </Button>

//             <Button variant="danger" onClick={this.handleDelete}>
//               삭제
//             </Button>
//           </div>
//           <Link to="/write">
//             <Button variant="primary" onClick={() => {}}>
//               글쓰기
//             </Button>
//           </Link>
//         </div>
//       </>
//     );
//   }
// }
