import React, { Component, useState } from 'react';
// class AddNumber extends Component {
//   state = {
//     size: 0,
//   };
//   render() {
//     return (
//       <div>
//         <h1>Add Number</h1>
//         <button
//           onClick={() => {

//             this.setState({ size: this.state.size});
//             this.props.onclick(this.state.size);
//           }}
//         >
//           Add
//         </button>
//         <input type="text" value={this.state.size} />
//       </div>
//     );
//   }
// }

function AddNumber(props) {
  const [size, setSize] = useState(0);
  return (
    <div>
      <h1>Add Number</h1>
      <button
        onClick={() => {
          let value = size + 1;
          setSize(value);
          props.onclick(value);
        }}
      >
        Add
      </button>
      <input type="text" value={size} readOnly />
    </div>
  );
}

export default AddNumber;
