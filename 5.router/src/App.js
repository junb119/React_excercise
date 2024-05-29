import './App.css';
import { Routes, Route, NavLink, useParams } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <p>home...</p>
    </div>
  );
}
let contents = [
  { id: 1, title: 'HTML', desc: 'HTML is ...' },
  { id: 2, title: 'css', desc: 'css is ...' },
  { id: 3, title: 'javascript', desc: 'javascript is ...' },
];
function Topics() {
  let list = [];
  contents.forEach((item) => {
    list.push(
      <li key={item.id}>
        <NavLink to={'/topics/' + item.id}>{item.title}</NavLink>
      </li>
    );
  });
  return (
    <div>
      <h1>Topics</h1>
      <nav>
        <ul>{list}</ul>
      </nav>
      <Routes>
        <Route path=":topic_id" element={<Topic />} />
      </Routes>
    </div>
  );
}
function Contact() {
  return (
    <div>
      <h1>Contact</h1>
      <p>Contact...</p>
    </div>
  );
}
function Topic() {
  let params = useParams();
  console.log(params);
  return (
    <div>
      <h1>Topic</h1>
      <p>Topic...</p>
    </div>
  );
}
function App() {
  return (
    <div className="App">
      <h1>Router DOM</h1>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/topics">topics</NavLink>
          </li>
          <li>
            <NavLink to="/contact">contact</NavLink>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/topics/*" element={<Topics />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;
