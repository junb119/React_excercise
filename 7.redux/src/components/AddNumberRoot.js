import React, { Component } from 'react';
import AddNumber from './AddNumber';

// export default class AddNumberRoot extends Component {
//   render() {
//     return (
//       <div>
//         <h1>Add Number Root</h1>
//         <AddNumber
//           onclick={(size) => {
//             this.props.onclick(size);
//           }}
//         />
//       </div>
//     );
//   }
// }

function AddNumberRoot(props) {
  return (
    <div>
      <h1>Add Number Root</h1>
      <AddNumber
        onclick={(size) => {
          props.onclick(size);
        }}
      />
    </div>
  );
}

export default AddNumberRoot;
