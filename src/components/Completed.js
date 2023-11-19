import Axios from 'axios';
import { useEffect, useState } from 'react';
import ResultsPage from './ResultsPage';
function Completed(props){
    const [data,setData]=useState([]);
    let count =0;
    useEffect(()=>{
        Axios.get("https://quizzoquizz-backend-nu4g.onrender.com/Route/getResults")
        .then((res)=>{
            if(res.status===200){
                const filteredData = res.data.filter((val) => val.studentID === props.id);
                setData(filteredData);
                
            }
            else{
                Promise.reject();
            }
        })
        .catch((err)=>alert(err));
    },[props])
    const ResultsShow=function(){
        return data.map((val,index)=>{
            return <ResultsPage data={val} />
        })
    }
    return(
        <div className='mx-5'>
           <div className='text-center fs-4' style={{fontWeight:"bold",maxWidth:"70%"}}> Check Your Results</div>
            {ResultsShow()}
            {count<3?(<><div style={{height:"70vh"}}></div></>):(null)}
        </div>
    )
}
export default Completed;