import { HashRouter,Route,Routes } from 'react-router-dom';
import { useState,useEffect } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

import Nav from './components/Nav';
import Home from './components/Home';
import Compete from './components/Compete';
import Completed from './components/Completed';
import MyTests from './components/MyTests';
import Footer from './components/Footer'
import Login from './components/Login';
import Create from './components/Create';
import Signup from './components/Signup';
import CreateQuestions from './components/CreateQuestions';
import EditTest from './components/EditTest';
import TestPage from './components/TestPage';
import ResultDisplay from './components/ResultDisplay';
import ResultInstructor from './components/ResultInstructor';

function App() {
  const [key,setKey]=useState([]);
  const [id,setId]=useState([]);
  const [name,setName]=useState()
  const [testCode,setTestCode]=useState("")

  useEffect(() => {
    try{
      const storedId = localStorage.getItem('id');
      const storedKey = localStorage.getItem('key');
      const storedTestCode = localStorage.getItem('testCode');
      const storedName=localStorage.getItem('name');

      if (storedId) {
        setId(JSON.parse(storedId));
      }
      if (storedKey) {
        setKey(JSON.parse(storedKey));
      }
      if (storedTestCode) {
        setTestCode(JSON.parse(storedTestCode));
      }
      if(storedName){
        setName(JSON.parse(storedName))
      }
    }
    catch{
      
    }
  }, []);

  const getState=(childData)=>{
      setKey(childData);
      setId(childData[2]);
      setName(childData[3])
      localStorage.setItem('id', JSON.stringify(childData[2]));
      localStorage.setItem('key', JSON.stringify(childData));
      localStorage.setItem('name', JSON.stringify(childData[3]));
  }
  
  const getTestCode=(childData)=>{
    setTestCode(childData)
    localStorage.setItem('testCode', JSON.stringify(childData));
  }
  return (
    <div className="App" style={{width:'100%'}}>
      
      <HashRouter>
        <Nav value={key} name={name}/>
        <Routes>
          <Route path='/' element={<Home id={key} />}></Route>
          <Route path='/compete' element={<Compete id={id} />}></Route>
          <Route path='/completed' element={<Completed id={id} />}></Route>
          <Route path='/login' element={<Login getState={getState} />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/create' element={<Create id={id} getTestCode={getTestCode}/>}></Route>
          <Route path='/mytests' element={<MyTests id={id} name={name} />}></Route>
          <Route path='/createquestions/:data' element={<CreateQuestions id={id} testCode={testCode} />}></Route>
          <Route path='/editTest/:data' element={<EditTest />}></Route>
          <Route path='/testpage/:data' element={<TestPage id={id} />}></Route>
          <Route path='/result/:data' element={<ResultDisplay />} ></Route>
          <Route path='/totalresult/:data' element={<ResultInstructor />}></Route>
        </Routes>
        <Footer />
      </HashRouter>
    </div>
  );
}

export default App;
