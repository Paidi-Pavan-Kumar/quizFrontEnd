import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from 'axios';

function MyTestsList(props) {
    const [ID,setID]=useState(props.val._id)
    const [id, setId] = useState(props.val.instructorID);
    const [testCode, setTestCode] = useState(props.val.testCode);
    const [testName,setTestName]=useState(props.val.testName)
    const [users,setUsers]=useState(props.val.users)

    const [testStartTime, setTestStartTime] = useState(new Date(props.val.testStartTime));
    const testStartDate = testStartTime.getDate();
    const testStartMonth = testStartTime.getMonth();
    const testStartYear = testStartTime.getFullYear();
    const startTimeHours = testStartTime.getHours();
    const startTimeMinutes = testStartTime.getMinutes();

    const [testEndTime, setTestEndTime] = useState(new Date(props.val.testEndTime));
    const testEndDate = testEndTime.getDate();
    const testEndMonth = testEndTime.getMonth();
    const testEndYear = testEndTime.getFullYear();
    const endTimeHours = testEndTime.getHours();
    const endTimeMinutes = testEndTime.getMinutes();

    const [testResultsTime, setTestResultsTime] = useState(new Date(props.val.resultsTime));
    const testResultsDate = testResultsTime.getDate();
    const testResultsMonth = testResultsTime.getMonth();
    const testResultsYear = testResultsTime.getFullYear();
    const resultsTimeHours = testResultsTime.getHours();
    const resultsTimeMinutes = testEndTime.getMinutes();

    const [edit, setEdit] = useState();
    const [edit2,setEdit2]=useState();

    const [currentTime, setCurrentTime] = useState(new Date());
    const [questions,setQuestions]=useState(props.val.question);
    const [options1,setOptions1]=useState(props.val.option1);
    const [options2,setOptions2]=useState(props.val.option2);
    const [options3,setOptions3]=useState(props.val.option3);
    const [options4,setOptions4]=useState(props.val.option4);
    const [answers,setAnswers]=useState(props.val.answer)

    const data = [ID,id,testName, testCode,testStartTime,testEndTime,testResultsTime,users,questions,options1,options2,options3,options4,answers]
    

    const encodedData = encodeURIComponent(JSON.stringify(data));

    const month = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    useEffect(() => {
        if (currentTime < testStartTime) {
            setEdit(true);

        }
        else if(currentTime<testEndTime) {
            setEdit(false);
            setEdit2(true);
        }
        else{
            setEdit(false);
            setEdit2(false);
        }
    }, [props])

    const handleDelete = () => {
        Axios.delete("https://quizzoquizz-backend-nu4g.onrender.com/Route/deleteQuiz/" + props.val._id)
            .then((res) => {
                if (res.status === 200) {
                    alert("Test deleted Successfully");
                    window.location.reload();
                }
                else {
                    Promise.reject();
                }
            })
            .catch((err) => alert(err))
    }

    
    return (
        <div>
            <div className="card my-3" style={{ fontSize: '15px', fontWeight: "bolder" }}>
                <div style={{ backgroundColor: "rgb(4, 4, 45)" }} className="card-header text-light"><h5 className="my-auto">{props.val.testName}</h5></div>

                <div className="card-body">
                    <h6 className="card-title mb-3">{props.val.testCode}</h6>
                    <p className="card-text">Instructor:{props.name}</p>
                    <p className="card-text">Test Starts At:{startTimeHours}:{startTimeMinutes} {testStartDate}  {month[testStartMonth]}  {testStartYear}</p>
                    <p className="card-text">Test Ends At:{endTimeHours}:{endTimeMinutes} {testEndDate} {month[testEndMonth]} {testEndYear}</p>
                    <p className="card-text">Test Ends At:{resultsTimeHours}:{resultsTimeMinutes} {testResultsDate} {month[testResultsMonth]} {testResultsYear}</p>
                    {edit ? (<>
                        <button className="btn btn-success"><Link className="text-light" style={{ textDecoration: "none" }} to={'/editTest/' + encodedData}>Edit</Link></button>
                        <button onClick={handleDelete} className="btn btn-danger mx-3">Delete</button>
                    </>)
                        : (<>
                        {edit2?(<>
                            <button disabled className="btn btn-success">Test is On</button></>):(<>
                                <button className="btn btn-success"><Link to={'/totalresult/'+ID} className="text-light text-decoration-none" >Results</Link></button></>)}
                            
                        </>)}
                </div>
            </div>
        </div>
    )
}

export default MyTestsList;