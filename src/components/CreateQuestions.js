import { useEffect, useState } from "react";
import QuizForm from "./QuizForm";
import Axios from 'axios';
import { Link } from "react-router-dom";


function CreateQuestions(props){
    const [renderCount,setRenderCount]=useState(1);
    const [ID,setID]=useState();
    const [instructorID,setInstructorID]=useState();
    const [testName,setTestName]=useState("");
    const [testCode,setTestCode]=useState("");
    const [testStartTime,setTestStartTime]=useState();
    const [testEndTime,setTestEndTime]=useState();
    const [resultsTime,setResultsTime]=useState();
    const [users,setUsers]=useState(false);
    

    
    const handleClickA=(event)=>{
        event.preventDefault();
        setRenderCount(renderCount+1);
    }

    const handleClickD=(event)=>{
        event.preventDefault();
        setRenderCount(renderCount-1);
    }

    const [questions,setQuestions]=useState([]);
    const [options1,setOptions1]=useState([]);
    const [options2,setOptions2]=useState([]);
    const [options3,setOptions3]=useState([]);
    const [options4,setOptions4]=useState([]);
    const [answers,setAnswers]=useState([]);

    const getTest=(childdata)=>{
        const ind=childdata[0]
        const question=[...questions];
        question[ind]=childdata[1];
        setQuestions(question)

        const option1=[...options1];
        option1[ind]=childdata[2];
        setOptions1(option1)
        
        const option2=[...options2];
        option2[ind]=childdata[3];
        setOptions2(option2)

        const option3=[...options3];
        option3[ind]=childdata[4];
        setOptions3(option3)

        const option4=[...options4];
        option4[ind]=childdata[5];
        setOptions4(option4);

        const answer=[...answers];
        answer[ind]=childdata[6];
        setAnswers(answer)
    }


    const [isSubmitted,setIsSubmitted]=useState(false)
    const [ver,setVer]=useState(false);

    useEffect(()=>{
        try{
            setTestName(props.content[0]);
            setTestCode(props.content[1]);
            setTestStartTime(props.content[2]);
            setTestEndTime(props.content[3]);
            setResultsTime(props.content[4]);
            setUsers(props.content[5])
            setInstructorID(props.content[6])
        }
        catch{}
        try{
            
            setQuestions(props.data[8]);
            setOptions1(props.data[9]);
            setOptions2(props.data[10])
            setOptions3(props.data[11]);
            setOptions4(props.data[12]);
            setAnswers(props.data[13]);
            setTestName(props.data[2]);
            setTestCode(props.data[3]);
            setTestStartTime(props.data[4]);
            setTestEndTime(props.data[5]);
            setResultsTime(props.data[6]);
            setUsers(props.data[7])
            setInstructorID(props.data[1])
            setID(props.data[0]);
            setRenderCount(props.len);
            setVer(true)
            
        }
        catch{}
        
    },[props,getTest])

    const data=[questions,options1,options2,options3,options4,answers]
    const handleClick=()=>{
        if(!isSubmitted){
            setIsSubmitted(true)
            const value={instructorID:instructorID,testName:testName,testCode:testCode,testStartTime:testStartTime,testEndTime:testEndTime,resultsTime:resultsTime,users:users,question:questions,option1:options1,option2:options2,option3:options3,option4:options4,answer:answers}
            Axios.post("https://quizzoquizz-backend-nu4g.onrender.com/Route/createQuiz",value)
            .then((res)=>{
                if(res.status===200){
                    alert("Quiz Created Successfully");
                    window.location.reload();
                }
                else{
                    Promise.reject()
                }
            })
            .catch((err)=>alert(err));
        }
    }

    const handleClickUpdate=()=>{
        const value={instructorID:instructorID,testName:testName,testCode:testCode,testStartTime:testStartTime,testEndTime:testEndTime,resultsTime:resultsTime,users:users,question:questions,option1:options1,option2:options2,option3:options3,option4:options4,answer:answers}
        console.log(value);
        Axios.put("https://quizzoquizz-backend-nu4g.onrender.com/Route/updateQuiz/"+props.data[0],value)
        .then((res)=>{
            if(res.status===200){
                alert("Quiz updated successfully");
            }
            else{
                Promise.reject();
            }
        })
        .catch((err)=>alert(err))
    }

    return(
        <div className="mr-5 mx-auto">
            <div className="text-right mr-5 mt-5">
                <button style={{maxWidth:"100px"}} className="btn btn-success mr-4" onClick={handleClickA}>+</button>
                <button style={{maxWidth:"100px"}} className="btn btn-success" onClick={handleClickD}>-</button>
            </div>
            <div style={{lineHeight:'10px'}} className="">
            {
                Array.from({length:renderCount}).map((val,index)=>(
                    <>
                    <label className="fw-bold fs-5">Question {index+1}</label>
                    <QuizForm id={props.id} testCode={props.testCode} index={index} getTest={getTest} data={data} />
                    </>
                ))
            }
            </div>
            {ver?(<>
                <button className="btn btn-success"><Link onClick={handleClickUpdate} className="text-light" style={{textDecoration:"none"}} to='/mytests'>Update Test</Link></button>
            </>):(<>
                <button className="btn btn-success"><Link onClick={handleClick} className="text-light" style={{textDecoration:"none"}} to='/mytests'>Create Test</Link></button>
            </>)}
        </div>
    )
}

export default CreateQuestions;