import { useEffect, useState } from 'react';
import './App.css';

function Article(props) {
  return(
    <>
      <h2>{props.title}</h2>
      <p>{props.desc}</p>
    </>
  )
}
function Nav({data, onclick}) {

  let listHTML = data.map(item=> <li key={item.id}><a 
    href={item.id}
    data-id={item.id}
    onClick={e=>{
      e.preventDefault();
      //onclick(e.target.getAttribute("data-id"));
      //onclick(e.target.dataset.id);
      onclick(item.id);
    }}
    
    >{item.title}</a></li>)
  return(
    <nav>
      <ul>
        {listHTML}
      </ul>
    </nav>
  )
}

function App() {
  const [article, setArticle] = useState({
    title:'welcome',
    desc:'hello, React & Ajax'
  });
  const[list,setList] = useState([]);

  useEffect(()=>{
    fetch('./data/task.json')
    .then(res=>res.json())
    .then(data=>{
      setList(data);      
    })
  },[])
  console.log(list);
 //map
 

  return (
  <div className="App">
      <h1>프론트엔드 개발자</h1>
      <p>기본언어인 html, css, javascript부터 학습합니다.</p>
      <Nav data={list} onclick={(id)=>{
          fetch(`./data/${id}.json`)
          .then(res=>res.json())
          .then(data=>{
              setArticle({
                title:data.title,
                desc:data.desc
              })
          })
      }} />
      <Article title={article.title} desc={article.desc}/>
    </div>
  );
}

export default App;
