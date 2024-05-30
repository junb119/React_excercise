import React, { Component } from 'react';
// class DisplayNumber extends Component {
//   render() {
//     return (
//       <div>
//         <h1>Display Number</h1>
//         <input type="text" value={this.props.number} readOnly />
//       </div>
//     );
//   }
// }

function DisplayNumber(props) {
  return (
    <div>
      <h1>Display Number</h1>
      <input type="text" value={props.number} readOnly />
    </div>
  );
}

export default DisplayNumber;
