import './App.css';
import React, { Component, useState } from 'react';
import AddNumberRoot from './components/AddNumberRoot';
import DisplayNumberRoot from './components/DisplayNumberRoot';

function App() {
  const [number, setNumber] = useState(0);
  return (
    <div className="App">
      <h1>Root</h1>
      <AddNumberRoot
        onclick={(size) => {
          setNumber(size);
        }}
      />
      <DisplayNumberRoot number={number} />
    </div>
  );
}

// class App extends Component {
//   state = {
//     number: 0,
//   };

//   render() {
//     return (
//       <div className="App">
//         <h1>Root</h1>
//         <AddNumberRoot
//           onclick={(size) => {
//             this.setState({ number: size });
//           }}
//         />
//         <DisplayNumberRoot number={this.state.number} />
//       </div>
//     );
//   }
// }

export default App;
