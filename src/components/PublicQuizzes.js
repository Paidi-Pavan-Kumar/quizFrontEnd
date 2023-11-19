import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function PublicQuizzes(props){

    const [data,setData]=useState(props.val);
    const encodedData= encodeURIComponent(JSON.stringify(data));

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
    useEffect(()=>{
        if(currentTime<testStartTime){
            sertVer(true);
        }
        else if(currentTime<testEndTime){
            sertVer(false);
        }
        else if(currentTime>testEndTime){
            sertVer(false);
            setEdit(true);
        }
    })

    return(
        <div>
            <div className="card my-3" style={{ fontSize: '15px', fontWeight: "bolder" }}>
                <div style={{ backgroundColor: "rgb(4, 4, 45)" }} className="card-header text-light"><h5 className="d-inline-block">{props.val.testName}</h5><span style={{right:'0px'}} className=" text-light">(Public Test)</span></div>
                <div className="card-body">
                    <div className="card-title mb-3"><h6 >{props.val.testCode}</h6></div>
                    <p className="card-text">Test Starts At:{startTimeHours}:{startTimeMinutes} {testStartDate}  {month[testStartMonth]}  {testStartYear}</p>
                    <p className="card-text">Test Ends At:{endTimeHours}:{endTimeMinutes} {testEndDate} {month[testEndMonth]} {testEndYear}</p>
                    <p className="card-text">Test Ends At:{resultsTimeHours}:{resultsTimeMinutes} {testResultsDate} {month[testResultsMonth]} {testResultsYear}</p>
                    {!ver ? (<>
                    {
                        edit?(<>
                        <button disabled className="btn btn-success">Test Ended</button>
                        </>):(<>
                        <button className="btn btn-success"><Link className="text-light text-decoration-none" to={"/testpage/"+encodedData}>Take Test</Link></button>
                        </>)
                    }
                        
                    </>)
                        : (<>
                            <button className="btn btn-success">Yet to Start</button>
                        </>)}
                </div>
            </div>
        </div>
    )
}

export default PublicQuizzes;