import "./styles.css";
import { useEffect, useState } from "react";
import Submit from "./Submit";
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import React,{useRef} from 'react';
import CountdownTimer from "./CountdownTimer";
function QuizPlatform(props) {
    const QuizData=props.data;
    const [queNo, setQueNo] = useState(0);
    const [PrevDisabled, setPrevDisabled] = useState(true);
    const [clickedOption, setClickedOption] = useState(0);
    const [ansList, setAnsList] = useState(Array(QuizData.length).fill(0));
    const [submit, setSubmit] = useState(false);
    const [QueVisited, setQueVisited] = useState([0]);
    const [time,newTime]=useState(new Date());
    const navigate=useNavigate();
    const targetEndTime = new Date(props.val.testEndTime).getTime();
    const [autoSumbit,setAutoSubmit]=useState();
    const submitbut=useRef(null);
    const getState=(childdata)=>{
        setAutoSubmit(childdata)
    }
    const handleNext = () =>{
        if(queNo === QuizData.length-1){
            setSubmit(true);
        }
        else
        {
            setQueNo(queNo+1);
            setPrevDisabled(false);
            setClickedOption(0);

            if(!QueVisited.includes(queNo+1)){
                setQueVisited([...QueVisited, queNo+1]);
            }
        }
    }

    const handlePrev = () =>{
        setQueNo(queNo-1);
        setClickedOption(0);
        if(queNo === 1)
            setPrevDisabled(true);
        else
            setPrevDisabled(false);
        
        if(!QueVisited.includes(queNo-1)){
            setQueVisited([...QueVisited, queNo-1]);
        }
    }
    
    const handleClick = (ind, qno) =>{

        setClickedOption(ind);
        const updatedList = [...ansList];
        updatedList[qno] = ind;
        setAnsList(updatedList);
    }

    const handleSubmit=()=>{
        setSubmit(true)
    }
    const gettingAction = (action) =>{
        if(action === "submit" || autoSumbit){
            var score = 0

            for(var i = 0; i<ansList.length; i++){
                if(ansList[i] === parseInt(QuizData[i].answer,10)){
                    score += 1;
                }
            }

        const data={studentID:props.id,instructorID:props.val.instructorID,testID:props.val._id,testCode:props.val.testCode,testName:props.val.testName,testTakenTime:time,score:score,answersGiven:ansList,questions:props.val.question,option1:props.val.option1,option2:props.val.option2,option3:props.val.option3,option4:props.val.option4,answers:props.val.answer}

        Axios.post("https://quizzoquizz-backend-nu4g.onrender.com/Route/uploadResult",data)
        .then((res)=>{
            if(res.status===200){
                alert("Test Submitted");
                navigate('/completed')
            }
            else{
                Promise.reject();
            }
        })
        .catch((err)=>alert(err));
        }
        else{
            setQueNo(0);
            setSubmit(false);
            setPrevDisabled(true);
        }
    }
    const handleNavigation = (index) =>{
        setQueNo(index);
        setClickedOption(0);
        if(!QueVisited.includes(index)){
            setQueVisited([...QueVisited, index]);
        }
        if(index !== 0){
            setPrevDisabled(false);
        }
        else{
            setPrevDisabled(true);
        }
    }
    useEffect(()=>{
        if(autoSumbit){
            submitbut.current.click();
        }
    },[autoSumbit])

    return(
        <div className="quizTop ">
            <div className="qpatt m-3 text-center">
                <h3>{props.name}</h3>
                <h3>{props.code}</h3>

            </div>
            <div className="text-center">
            <CountdownTimer getState={getState} targetTime={targetEndTime} />
            </div>
            <div className="QueNav">
                <div className="mb-3 d-flex flex-wrap justify-content-center">
                    <button className="AnsButton mx-3">Answered</button>
                    <button className="NAButton mx-3">Not Answered</button>
                    <button className="NVButton mx-3">Not Visited</button>
                </div>

                {QuizData.map((val,i) =>{
                    return(
                        <button className={`btn btn-light m-2 ${(ansList[i] !== 0)?"navButColored":((QueVisited.includes(i))?"notAnsColored":null)}

                        `}
                        onClick={() => handleNavigation(i)}
                        key={i} >
                            {i+1}
                        </button>
                    )
                })}
            </div>
            {submit? <Submit getAction = {gettingAction}/>:
            <>
            <div className="queDisplay">
                <div className="question">{queNo+1}. {QuizData[queNo].question}</div>
                <div>
                    {QuizData[queNo].options.map((option, index) =>{
                        return(
                           
                            <button 
                            className={`option-btn ${
                                clickedOption === index+1? "checked":null 
                            }
                            ${
                                ansList[queNo] === index+1? "innerChecked":null   
                            }`}
                            key={index}
                            onClick={() => handleClick(index+1, queNo)}>
                                {option}
                            </button>
                        )
                    })}
                </div>
                <div className="prevNext d-flex justify-content-between">
                    <div>
                        <button className="btn btn-primary" onClick={handlePrev} disabled={PrevDisabled}>&larr; Previous</button>
                    </div>
                    <div>
                        <button className="btn btn-primary" onClick={handleNext}>Next &rarr;</button>
                    </div>
                </div>
            </div>
            <div className="text-center mt-4 mb-5">
            <button ref={submitbut} onClick={handleSubmit} style={{width:"100px"}} className="btn btn-success mr-2 ">Submit</button>
            
            </div>
            </>
            
                }
        </div>
    )
}

export default QuizPlatform;