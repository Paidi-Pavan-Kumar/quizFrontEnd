import Axios from 'axios';
import { useEffect, useState } from 'react';
import MyTestsList from './MyTestsList';

function MyTests(props){

    const [arr,setArr]=useState([]);
    const [data,setData]=useState([]);

    useEffect(()=>{
        Axios.get("https://quizzoquizz-backend-nu4g.onrender.com/Route/getQuiz")
        .then((res)=>{
            if(res.status===200){
                setArr(res.data)
                let count =0;
                var temp=[]
                res.data.map((val,index)=>{
                    if(val.instructorID===props.id){
                        temp=[...temp]
                        temp[count]=val
                        setData(temp)
                        count=count+1
                    }
                })
            }
            else{
                Promise.reject()
            }
        })
        .catch((err)=>alert(err))
    },[props])
    const value=()=>{
        return data.map((val,index)=>{
            try{
                return <MyTestsList val={val} name={props.name} />;
            }
            catch{

            }
    })
    }
    return(
        <div style={{maxWidth:"85%"}} className='form-container mx-auto p-3 p-md-5 my-5'>
            <h2>Your Tests</h2>
            
            {value()}
        </div>
    )
}
export default MyTests;