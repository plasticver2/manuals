import './App.css';
import {useState} from 'react';

function Header(props){
  return (
    <header>
      <h1><a href="/" onClick={function(event){
        event.preventDefault();
        props.onChangeMode();
      }}>{props.title}</a></h1>
    </header>
  )
}
function Nav(props){
  const lis = []
  for(let i=0;i<props.topics.length;i++){
    let t = props.topics[i];
    lis.push(<li key={t.id}>
      <a id={t.id} href={'/read/'+t.id} onClick={event=>{
        event.preventDefault();
        props.onChangeMode(Number(event.target.id));
      }}
      >{t.title}</a>
      </li>)
  }
  return (
    <nav>
      <ol>
        {lis}
      </ol>
    </nav>
  )
}
function Artical(props){
  return(
    <artical>
      <h2>{props.title}</h2>
      {props.body}
    </artical>
  )
}

function App() {
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);
  const topics = [
    {id:1, title:'html',body:'html is ...'},
    {id:2, title:'css',body:'css is ...'},
    {id:3, title:'javascript',body:'javascript is ...'}
  ]
  let content = null;
  if(mode === 'WELCOME'){
    content = <Artical title ="Welcome" body="Hello, WEB"></Artical>
  }else if(mode === 'READ'){
    let title, body = null;
    for(let i=0;i<topics.length;i++){
      if(topics[i].id === id){
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Artical title = {title} body={body}></Artical>
    contextControl = <>
    <li><input type="button" value="Delete" onClick={()=>{
        const newTopics = []
        for(let i=0; i<topics.length; i++){
          if(topics[i].id !== id){
            newTopics.push(topics[i]);
          }
        }
        setTopics(newTopics);
        setMode('WELCOME');
      }} /></li>
    </>
  }
  return (
    <div>
      <Header title="React" onChangeMode={function(){
        setMode('WELCOME');
      }}></Header>
      <Nav topics={topics} onChangeMode={(_id) =>{
        setMode('READ');
        setId(_id)
      }}></Nav>
      {content}
    </div>
  );
}

export default App;
