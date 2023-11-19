import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from 'axios';

function Quizzes(props){

    const [data,setData]=useState(props.val);
    const encodedData= encodeURIComponent(JSON.stringify(data));

    const [ID,setID]=useState(props.val._id)
    const [id, setId] = useState(props.val.instructorID);

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

    const [currentTime, setCurrentTime] = useState(new Date());

    const month = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const [ver,sertVer]=useState();
    const [ver2,setVer2]=useState(false);
    useEffect(()=>{
        if(currentTime<testStartTime){
            sertVer(true);
            setEdit(false)
        }
        else if(currentTime<testEndTime){
            sertVer(false);
            
        }
        else if(currentTime>testEndTime){
            sertVer(true)
            setEdit(true);
        }
        Axios.get("https://quizzoquizz-backend-nu4g.onrender.com/Route/getResults")
        .then((res)=>{
            if(res.status===200){
                res.data.map((val,index)=>{
                    if(val.studentID===props.id && val.instructorID===id && val.testID===ID){
                        setVer2(true);
                    }
                })
            }
        })
    })

    

    return(
        <div>
            <div className="card my-3" style={{ fontSize: '15px', fontWeight: "bolder" }}>
                <div style={{ backgroundColor: "rgb(4, 4, 45)" }} className="card-header text-light"><h5 className="d-inline-block">{props.val.testName}</h5></div>
                <div className="card-body">
                    <div className="card-title mb-3"><h6 >{props.val.testCode}</h6></div>
                    <p className="card-text">Instructor:{props.name}</p>
                    <p className="card-text">Test Starts At:{startTimeHours}:{startTimeMinutes} {testStartDate}  {month[testStartMonth]}  {testStartYear}</p>
                    <p className="card-text">Test Ends At:{endTimeHours}:{endTimeMinutes} {testEndDate} {month[testEndMonth]} {testEndYear}</p>
                    <p className="card-text">Results At:{resultsTimeHours}:{resultsTimeMinutes} {testResultsDate} {month[testResultsMonth]} {testResultsYear}</p>
                    {!ver ? (<>
                        {ver2?(<>
                        <button disabled className="btn btn-success">Attempted</button>
                        </>):(<>
                            <button className="btn btn-success"><Link className="text-light text-decoration-none" to={"/testpage/"+encodedData}>Take Test</Link></button></>)}
                    </>)
                        : (<>
                            {edit?(<>
                                <button disabled className="btn btn-success">Test Completed</button>
                            </>):(<>
                                <button disabled className="btn btn-success">Yet to Start</button>
                            </>)}
                        </>)}
                </div>
            </div>
        </div>
    )
}

export default Quizzes;