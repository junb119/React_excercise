import './App.css';
import {useEffect, useState} from 'react'

function Nav({data, onclick}) {
  
  let listHtml = data.map(item => <li key={item.id}><a href={item.id} data-id={item.id} onClick={e=>{
    e.preventDefault()
    onclick(e.target.dataset.id)
  }}>
    {item.title}
    </a></li>)
  return (
    <nav>
      <ul>
        {listHtml}
      </ul>
    </nav>
  )
}

function Article(props) {
  return (
    <>
      <h2>{props.title}</h2>
      <p>{props.desc}</p>
    </>
  )
}

function App() {
  const [article , setArticle] = useState({
    title : 'welcome',
    desc : 'hello, React & Ajax' 
  })
  const [list, setList] = useState([])
  
  useEffect(()=>{
    fetch('./data/task.json')
    .then(res=>res.json())
    .then(data=>{
      setList(data);      
    })
  },[])
  console.log(list);
  
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
          });      
         })
      }}/>
      <Article title={article.title} desc={article.desc}/>
        
    </div>

  );
}

export default App;
