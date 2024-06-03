import './App.css';
import { Routes,Route,NavLink, useParams } from 'react-router-dom';

function Home() {
  return (
    <div>
     <h1>Home</h1>
     <p>home...</p>
    </div>
  );
}
let contents = [
  {id:1, title:'HTML', desc:'HTML is...'},
  {id:2, title:'CSS', desc:'CSS is...'},
  {id:3, title:'javscript', desc:'javscript is...'},
]
function Topics() {
  /*
  let list = [];
  contents.forEach(item=>{
    list.push(
        <li key={item.id}><NavLink to={"/topics/"+item.id}>{item.title}</NavLink></li>
    );
  });
  */
  let list = contents.map(item=>
    <li key={item.id}><NavLink to={"/topics/"+item.id}>{item.title}</NavLink></li>
 );
  return (
    <div>
     <h1>Topics</h1>
     <nav>
      <ul>
        {list}
      </ul>
     </nav>
     <Routes>
      <Route path=":topic_id" element={<Topic/>}/>
     </Routes>
    </div>
  );
}
function Topic() {
  let params = useParams();
  let topic_id = params.topic_id;
  console.log(params);

  let selected_topic={
    title:'Sorry',
    desc:'Not found'
  }
  /*
  for(let i = 0; i<contents.length; i++){
    if(contents[i].id === Number(topic_id)){
      selected_topic = contents[i];
      break;
    }
  }
  */

  selected_topic = contents.find(content=> content.id ===  Number(topic_id));


  return (
    <div>
     <h1>{selected_topic.title}</h1>
     <p>{selected_topic.desc}</p>
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
function App() {
  return (
    <div className="App">
     <h1>Router DOM</h1>
     <nav>
      <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/topics">topics</NavLink></li>
        <li><NavLink to="/contact">contact</NavLink></li>
      </ul>
     </nav>
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/topics/*" element={<Topics/>}/>
      <Route path="/contact" element={<Contact/>}/>
     </Routes>
    </div>
  );
}

export default App;
