import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ResultRow from "./ResultRow";
import Axios from 'axios';
function ResultInstructor(){
    const id=useParams();
    const [data,setData]=useState();
    let len=0;
    useEffect(()=>{
        Axios.get("https://quizzoquizz-backend-nu4g.onrender.com/Route/getResults")
        .then((res)=>{
            if(res.status===200){
                const filteredData = res.data.filter((val) => val.testID == id.data);
                len=filteredData.length
                setData(filteredData);
            }
            else{
                Promise.reject();
            }
        })
        .catch((err)=>alert(err));
    },[id])
    len=data?.length||0;
    const displayResult=function(){
        return Array.from({length:len},(val,index)=>{
            return <ResultRow val={data[index]} />
        })
    }
    return(
        <div style={{height:"75vh"}}>
        <div  className="mx-auto my-5 p-md-5 p-3 form-container" style={{maxWidth:"80%"}}>
            
            {len===0?(<><h2 className="text-center">No one Attempted The Exam</h2></>):(<>
                <div style={{fontWeight:"bold"}} className="row fs-3">
                <div className="col-md-4 col-12">Name</div>
                <div className="col-md-4 col-12">Email</div>
                <div className="col-md-4 col-12">Score</div>
            </div>
            {displayResult()}
            </>)}
            
        </div>
        </div>
    )
}

export default ResultInstructor;