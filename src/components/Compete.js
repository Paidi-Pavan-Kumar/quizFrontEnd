import Axios from 'axios';
import { useEffect,useState } from 'react';
import PublicQuizzes from './PublicQuizzes';
import Quizzes from './Quizzes';

function Compete(props){
    const [arr,setArr]=useState([]);
    const [ver,setVer]=useState();
    const [ver2,setVer2]=useState();
    const head="Public Tests";
    const handleClick=()=>{
        setVer(!ver)
    }
    const PublicQuiz=()=>{
        return arr.map((val,index)=>{
            return <PublicQuizzes val={val} name={props.name} />
        })
    }
    var data = function() {
        return testData.map((val, index) => {
          return <Quizzes val={val} id={props.id} />;
        });
    };
      
    const handleSearch=()=>{
        setVer2(!ver2);
    }
    
    const [testCode,setTestCode]=useState();
    const [testData,setTestData]=useState([]);

    useEffect(()=>{
        let count=0;
        let count2=0;
        Axios.get("https://quizzoquizz-backend-nu4g.onrender.com/Route/getQuiz")
        .then((res)=>{
            if(res.status===200){
                res.data.map((val,index)=>{
                    if(val.users){
                        arr[count]=val;
                        count+=1
                    }
                    if(val.testCode===testCode){
                        testData[count2]=val;
                        count2+=1
                        
                    }
                })
            }
            else{
                Promise.reject();
            }
        })
        .catch((err)=>alert(err))
    },[ver,ver2,testCode,handleSearch])
    
    return(
        <div>
        <div style={{maxWidth:"75%"}} className='mx-auto'>
            <div className='input-group my-4'>
            <button onClick={handleClick} className='btn btn-success mr-2'>Public Tests</button>
            <input style={{maxWidth:"200px"}} type="text" onChange={(event)=>setTestCode(event.target.value)} className='form-control ml-auto' />
            <button onClick={handleSearch} className='btn btn-success'>Search</button>
            </div>
            {ver2?(<>{data()}</>):(null)}
            {ver?(<>{PublicQuiz()}</>):(<><div style={{height:"70vh"}}></div></>)}
           
        </div>
        </div>
    )
}
export default Compete;