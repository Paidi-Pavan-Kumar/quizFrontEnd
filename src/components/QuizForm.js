import { useEffect, useState } from "react";

function QuizForm(props){

    const [clicked,setClicked]=useState(false);
    const [question,setQuestion]=useState()
    const [option1,setOption1]=useState("")
    const [option2,setOption2]=useState("");
    const [option3,setOption3]=useState("");
    const [option4,setOption4]=useState("");
    const [answer,setAnswer]=useState();
    useEffect(()=>{
        try{
            setQuestion(props.data[0][props.index]);
            setOption1(props.data[1][props.index]);
            setOption2(props.data[2][props.index]);
            setOption3(props.data[3][props.index]);
            setOption4(props.data[4][props.index]);
            setAnswer(props.data[5][props.index])
        }
        catch{}
    },[props])
    const handleChange=(event)=>{
        setAnswer(event.target.value);
    }
    
    const handleClickQ=(event)=>{
        setClicked(true)
        props.getTest([props.index,question,option1,option2,option3,option4,answer]);     
        event.preventDefault();   
    }

    
    return(
        <div className="mb-5 mt-2 mx-auto" style={{borderBottom:'2px solid black',maxWidth:"95%"}}>
            <input defaultValue={question} onChange={(event)=>setQuestion(event.target.value)} style={{}} type="text" className="form-control text-center" placeholder="Enter the Question" />
            <div className="my-3 fw-bold">Enter the Options </div>
            <input checked={answer==='1'} onChange={handleChange} value='1' className=" d-inline mx-3 my-3" type="radio" name={props.index} /><div className="d-inline-block"><input defaultValue={option1} onChange={(event)=>setOption1(event.target.value)} style={{borderCollapse:'collapse'}} type="text" className="d-inline-block form-control" placeholder="Option 1" /></div><br />
            <input checked={answer==='2'} onChange={handleChange} value='2' className=" d-inline mx-3 my-3" type="radio" name={props.index} /><div className="d-inline-block"><input defaultValue={option2} onChange={(event)=>setOption2(event.target.value)} style={{borderCollapse:'collapse'}} type="text" className="d-inline-block form-control" placeholder="Option 2" /></div><br />
            <input checked={answer==='3'} onChange={handleChange} value='3' className=" d-inline mx-3 my-3" type="radio" name={props.index} /><div className="d-inline-block"><input defaultValue={option3} onChange={(event)=>setOption3(event.target.value)} style={{borderCollapse:'collapse'}} type="text" className="d-inline-block form-control" placeholder="Option 3" /></div><br />
            <input checked={answer==='4'} onChange={handleChange} value='4' className=" d-inline mx-3 my-3" type="radio" name={props.index} /><div className="d-inline-block"><input defaultValue={option4} onChange={(event)=>setOption4(event.target.value)} style={{borderCollapse:'collapse'}} type="text" className="d-inline-block form-control" placeholder="Option 4" /></div><br />

            {clicked?(<button onClick={handleClickQ} className="btn btn-success my-2">Update Question</button>)
            :(<button onClick={handleClickQ} className="btn btn-success my-2">Submit Question</button>)}
          
        </div>
    )
}

export default QuizForm;