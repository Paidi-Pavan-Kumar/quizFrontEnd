import { useEffect } from "react";
import { useParams } from "react-router-dom";

function ResultDisplay(){
    const {data}=useParams();
    const decodedData=JSON.parse(decodeURIComponent(data));
    const testTakenTime=new Date(decodedData.testTakenTime);
    const testTakenDate=testTakenTime.getDate();
    const testTakenMonth=testTakenTime.getMonth();
    const testTakenYear=testTakenTime.getFullYear();
    var len=decodedData.answers?.length||0;;
    useEffect(()=>{
        len=decodedData.answers?.length||0;
        len=decodedData.option1?.length||0;
    },[decodedData])

    const resultQuestions=function(){
        return Array.from({length:len},(val,index)=>{
            return (<>

            <div className="col-md-7 col-sm-12 border border-2 border-dark">
                {index+1}. 
                {decodedData.questions[index]}
                <br />
                <div style={{color:"blue"}} className="ml-5">
                
                {decodedData.option1[index]}<br />
                {decodedData.option2[index]}<br />
                {decodedData.option3[index]}<br />
                {decodedData.option4[index]}<br />                
                </div>
                </div>
                <div className="col-md-5 col-sm-12 py-5 border border-2 border-dark">
                Correct Answer : {decodedData.answers[index]}<br />
                {decodedData.answers[index]===decodedData.answersGiven[index]?(
                <span className="text-success">Your Answer:{decodedData.answersGiven[index]}</span>):(
                    <span className="text-danger">Your Answer:{decodedData.answersGiven[index]}</span>
                )}
                </div>
            </>)
        })
    }
    return(
        <div style={{maxWidth:"80%"}}  className="mx-auto">
        <div className="form-container my-5">
            {/* {console.log(decodedData,len)} */}
            <div className="text-center text-danger fs-3 fw-bold">Test Code: {decodedData.testCode}</div>
            <div className="text-center text-danger fs-3 fw-bold">Test Name: {decodedData.testName}</div>
            <div className="text-center text-danger fs-3 fw-bold">Your Score: {decodedData.score}</div>
            <div className="text-center text-danger fs-3 fw-bold">Attempted Date: {testTakenDate} - {testTakenMonth+1} - {testTakenYear}</div>
            <div style={{fontWeight:"600"}} className="row mx-4 fs-4">{
                resultQuestions()
            }
            </div>
        </div>
        </div>
    )
}

export default ResultDisplay;
