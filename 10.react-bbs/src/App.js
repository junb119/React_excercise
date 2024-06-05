import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import BoardList from './BoardList';
import Write from './Write';
import React, { useState } from 'react';

function App() {
  const [isModifyMode, setMode] = useState(false);
  const [boardId, setBoardId] = useState(0);
  const [isComplete, setComplete] = useState(true);

  const handleModify = (id) => {
    setMode(true);
    setBoardId(id);
  };
  const handleCancel = () => {
    setComplete(false);
    setMode(false);
    setBoardId(0);

    clearCheckbox();
  };
  // useEffect(() => {
  //   handleCancel();
  // }, [setComplete]);
  const renderComplete = () => {
    setComplete(true);
  };

  const clearCheckbox = () => {
    let checkboxs = document.querySelectorAll('.table input');
    checkboxs.forEach((item) => {
      item.checked = false;
    });
  };
  return (
    <div className="container">
      <BoardList handleModify={handleModify} renderComplete={renderComplete} isComplete={isComplete} />
      <Write isModifyMode={isModifyMode} boardId={boardId} handleCancel={handleCancel} />
    </div>
  );
}

export default App;
