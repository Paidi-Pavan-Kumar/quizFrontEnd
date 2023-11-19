import Axios from "axios";
import { useEffect, useState } from "react";

function ResultRow(props){
    const [data,setData]=useState([]);
    useEffect(()=>{
        Axios.get("https://quizzoquizz-backend-nu4g.onrender.com/Route/updateStudent/"+props.val.studentID)
        .then((res)=>{
            if(res.status===200){
                setData(res.data);
            }
            else{
                Promise.reject();
            }
        })
        .catch((err)=>alert(err));
    },[])
    return(
        <div className="row my-sm-2 fs-4 border-2 border border-rounded  border-dark">
            <div className="col-md-4 border border-r-2 border-rounded border-dark">
                {data.name}
            </div>
            <div className="col-md-4 border border-r-2 border-rounded border-dark">
                {data.email}
            </div>
            <div className="col-md-4 border border-r-2 border-rounded border-dark">
                Score:{props.val.score}
            </div>
        </div>
    )
}

export default ResultRow;