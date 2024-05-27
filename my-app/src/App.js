import { Component, setState } from 'react';
import './App.css';
import Myheader from './components/Myheader';
import Mynav from './components/Mynav';
import Myarticle from './components/Myarticle';
/*
function App() {
  return (
    <div className="App">
     Hello, World!
    </div>
  );
}
*/

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'welcome',
      selected_id: 2,
      subject: {
        title: 'react',
        desc: 'Single Page Application',
      },
      welcome: {
        title: 'Welcome',
        desc: 'Welcome to React',
      },
      menus: [
        { id: 1, title: 'HTML', desc: 'Hypertext markup language' },
        { id: 2, title: 'css', desc: 'CSS is for design' },
      ],
    };
  }

  render() {
    console.log('App 실행');
    let _title,
      _desc = null;
    if (this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
    } else if (this.state.mode === 'read') {
      let i = 0;
      while (i < this.state.menus.length) {
        let data = this.state.menus[i];
        if (data.id === this.state.selected_id) {
          _title = data.title;
          _desc = data.desc;
        }
        i++;
      }
    }
    return (
      <div className="App">
        <Myheader
          title={this.state.subject.title}
          desc={this.state.subject.desc}
          onChangePage={(val) => {
            this.setState({ mode: val });
          }}
        />
        <Mynav
          data={this.state.menus}
          onChangePage={(id) => {
            console.log(id);
            this.setState({
              mode: 'read',
              selected_id: Number(id),
            });
          }}
        />
        <Myarticle title={_title} desc={_desc} />
      </div>
    );
  }
}

export default App;
