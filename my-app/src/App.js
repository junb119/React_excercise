import { Component, setState } from 'react';
import './App.css';
import Myheader from './components/Myheader';
import Mynav from './components/Mynav';
import ReadArticle from './components/ReadArticle';
import Controls from './components/Controls';
import CreateArticle from './components/CreateArticle';
import UpdateArticle from './components/UpdateArticle';
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
    this.max_id = 3;
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
        { id: 3, title: 'javascript', desc: 'javascript is for interaction' },
      ],
    };
  }

  getArticles() {
    let _title,
      _desc,
      _article = null;
    if (this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadArticle title={_title} desc={_desc} />;
    } else if (this.state.mode === 'read') {
      let _data = this.getReadArticle();
      _article = <ReadArticle title={_data.title} desc={_data.desc} />;
    } else if (this.state.mode === 'create') {
      _article = (
        <CreateArticle
          onSubmit={(_title, _desc) => {
            this.max_id += 1;

            // 1. Concat
            // let _menus = this.state.menus.concat({ id: this.max_id, title: _title, desc: _desc });
            // this.setState({
            //   menus: _menus,
            // });

            // 2. Array From
            // let _menus = Array.from(this.state.menus);
            // _menus.push({ id: this.max_id, title: _title, desc: _desc });
            // this.setState({ _menus });

            // 3. spread 연산자
            this.setState({
              mode: 'read',
              menus: [...this.state.menus, { id: this.max_id, title: _title, desc: _desc }],
            });
          }}
        />
      );
    } else if (this.state.mode === 'update') {
      let _data = this.getReadArticle();
      _article = (
        <UpdateArticle
          data={_data}
          onSubmit={(_id, _title, _desc) => {
            let _menus = Array.from(this.state.menus);
            _menus.forEach((item, index) => {
              if (item.id === _id) {
                _menus[index] = { id: _id, title: _title, desc: _desc };
              }
            });
            this.setState({
              mode: 'read',
              menus: _menus,
            });
          }}
        />
      );
    }
    return _article;
  }
  getReadArticle() {
    let i = 0;
    while (i < this.state.menus.length) {
      let data = this.state.menus[i];
      if (data.id === this.state.selected_id) {
        return data;
        break;
      }
      i++;
    }
  }
  render() {
    console.log('App 실행');

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
        {this.getArticles()}
        <hr />
        <Controls
          onChangeMode={(val) => {
            this.setState({ mode: val });
          }}
        />
      </div>
    );
  }
}

export default App;
