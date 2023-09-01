import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

//리액트에서 속성은 prop이라고 부른다.
function Header(props) {
  return  <header>
    <h1><a href="/" onClick={(event)=>{
      event.preventDefault();
      props.onChangeMode();
    }}>{props.title}</a></h1>
  </header>
}

function Nav(props) {
  const lis = [];
  for(let i=0; i<props.topics.length; i++) { //topics 원소의 숫자만큼 반복
    let t = props.topics[i];
    lis.push(<li key={t.id}>
      <a id={t.id} href={'/read/'+t.id} onClick={(event)=>{
        event.preventDefault();
        props.onChangeMode(Number(event.target.id));
      }}>{t.title}</a>
      </li>)
  }
  return <nav>
    <ol>
      {lis}
    </ol>
  </nav>
}

function Article(props) {
  return <article>
    <h2>{props.title}</h2> 
    {props.body}
  </article>  
}

function Create(props) {
  return <article>
    <h2>Create</h2>
    <form onSubmit={event=>{
      event.preventDefault();
      //event.target -> event가 발생한 객체의 tag
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.onCreate(title, body);
    }}>
      <p><input type="text" name="title" placeholder='title'/></p>
      <p><textarea name='body' placeholder='body'></textarea></p>
      <p><input type="submit" value='Create'/></p>
    </form>
  </article>
}

function Update(props) {
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);
  return <article>
    <h2>Update</h2>
    <form onSubmit={event=>{
      event.preventDefault();
      //event.target -> event가 발생한 객체의 tag
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.onUpdate(title, body);
    }}>
      <p><input type="text" name="title" placeholder='title' value={title} onChange={event=>{
        //event를 트리거함 == target, 그 값 == value
        setTitle(event.target.value);
      }}/></p>
      <p><textarea name='body' placeholder='body' value={body} onChange={event=>{
        setBody(event.target.value);
      }}></textarea></p>
      <p><input type="submit" value='Update'/></p>
    </form>
  </article>
}

function App() {
  // const _mode = useState('WELCOME'); //배열 0번째 원소: 상태의 값을 읽음, 1번째 원소: 상태를 변경하는 함수
  // const mode = _mode[0];
  // const setMode = _mode[1];
  
  const [mode, setMode] = useState('WELCOME');  //위에 세 줄과 같은 코드
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4)
  const [topics, setTopics] = useState([
    //객체에 담으면 좋음
    {id:1, title:'html', body:'html is ...'},
    {id:2, title:'css', body:'css is ...'},
    {id:3, title:'javascript', body:'javascript is ...'}
  ]);
  let content = null;
  let contextControl = null;
  if (mode === 'WELCOME') {
    content = <Article title='Welcome' body='Hello, Web'></Article>
  } else if (mode === 'READ') {
    let title, body = null;
    for(let i=0; i<topics.length; i++){
      console.log(topics[i].id, id);
      if(topics[i].id === id){
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body}></Article>;
    contextControl = <>
    <li><a href={'/update/'+id} onClick={event=>{
      event.preventDefault();
      setMode('UPDATE');
  }}>Update</a></li>
  <li><input type="button" value="Delete" onClick={()=>{
    const newTopics = [];
    for (let i=0; i<topics.length; i++) {
      if (topics[i].id !== id) {
        newTopics.push(topics[i]);
      }
    }
    setTopics(newTopics);
    setMode('WELCOME');
  }}/></li>
  </>

  } else if (mode === 'CREATE') {
    //사용자가 create버튼을 눌렀을 때 실행될 함수
    content = <Create onCreate={(_title, _body)=>{
      const newTopic = {id:nextId, title:_title, body:_body};
      //topics는 object type이므로 복제본을 만들고, 그 복제본에 push를 해서 복제본을 바꾸고, 복제본을 setTopics에 전달하면 react는 topics와 newTopics를 비교해서 다르다면 그 때 컴포넌트를 렌더링 해준다.
      const newTopics = [...topics]
      newTopics.push(newTopic);
      setTopics(newTopics);
      setMode('READ');
      setId(nextId);
      setNextId(nextId+1);
    }}></Create>
  } else if (mode === 'UPDATE') {
    let title, body = null;
    for(let i=0; i<topics.length; i++){
      console.log(topics[i].id, id);
      if(topics[i].id === id){
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content  = <Update title={title} body={body} onUpdate={(title, body)=>{
      const newTopics = [...topics]
      const UpdatedTopic = {id:id, title:title, body:body};
      for (let i=0; i<newTopics.length; i++){
        if (newTopics[i].id === id){
          newTopics[i] = UpdatedTopic;
          break;
        }
      }
      setTopics(newTopics);
      setMode('READ');
    }}></Update>
  }

  return (
    <div>
      <Header title='WEB' onChangeMode={()=>{
        setMode('WELCOME');
      }}></Header>
      <Nav topics={topics} onChangeMode={(_id)=>{
        setMode('READ');
        setId(_id);
      }}></Nav>
      {content}
      <ul>
        <li><a href='/create' onClick={event=>{
          event.preventDefault()
          setMode('CREATE');
        }}>Create</a></li>
        {contextControl} 
      </ul>
    </div>
  );
}

export default App;
