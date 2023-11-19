import { useEffect, useState } from "react";


function Questions(props){

    const [answer,setAnswer]=useState("");
    const [ver,setVer]=useState(true)

    const handleChange=(event)=>{
        setAnswer(event.target.value);
        setVer(!ver);
    }

    useEffect(()=>{        props.getAnswers([answer,props.index]);
    },[handleChange,ver])

    return(
        <div className="my-3">
            <div className="d-inline-block mr-5 fs-2">{props.index+1}.</div>
            <div className="d-inline-block fs-2">{props.question}</div>
            <form className="form">
                <input type='radio' onChange={handleChange} style={{height:"20px",width:"20px"}} className="mr-5 ml-4"  name={props.index} value='1' /><span className="fs-4">{props.option1}</span><br />
                <input type='radio' onChange={handleChange} style={{height:"20px",width:"20px"}} className="mr-5 ml-4"  name={props.index} value='2' /><span className="fs-4">{props.option2}</span><br />
                <input type='radio' onChange={handleChange} style={{height:"20px",width:"20px"}} className="mr-5 ml-4" name={props.index} value='3' /><span className="fs-4">{props.option3}</span><br />
                <input type='radio' onChange={handleChange} style={{height:"20px",width:"20px"}} className="mr-5 ml-4" name={props.index} value='4' /><span className="fs-4">{props.option4}</span><br />
            </form>
            
        </div>
    )
}


export default Questions;