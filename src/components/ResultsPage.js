import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from 'axios';

function ResultsPage(props) {
    const [data, setData] = useState(props.data);
    const encodedData = encodeURIComponent(JSON.stringify(data));
    const [currentTime, setCurrentTime] = useState(new Date());
    const [ver, setVer] = useState(false);
    const [ver2, setVer2] = useState(false);
    const [arr, setArr] = useState([]);
    const [attemptedTime, setAttemptedTime] = useState(new Date(props.data.testTakenTime));
    useEffect(() => {
        let filteredData
        Axios.get("https://quizzoquizz-backend-nu4g.onrender.com/Route/getQuiz")
            .then((res) => {
                if (res.status === 200) {
                    filteredData = res.data.filter((val) => val._id === props.data.testID);
                    setArr(filteredData);
                    const endTime = new Date(filteredData[0].testEndTime);
                    const resultsTime = new Date(filteredData[0].resultsTime);
                    if (currentTime > endTime) {
                        setVer(true)
                    }
                    if (currentTime > resultsTime) {
                        setVer2(true)
                    }
                }
                else {
                    Promise.reject();
                }
            })
            .catch((err) => alert(err));
    }, [props.data])
    return (
        <div>
            <div style={{ maxWidth: "80%" }} id="resultspage-card" className="card mx-auto my-3">
                <div className="card-header text-light" style={{ backgroundColor: "rgb(4, 4, 45)" }}>
                    {props.data.testName}
                </div>
                <div className="card-body">
                    <h5 className="card-title">Test Code:{props.data.testCode}</h5>
                    <h5 className="card-title">Your Score: {props.data.score}</h5>
                    <p className="card-text">Attempted at: {attemptedTime.getDate()}-{attemptedTime.getMonth() + 1}-{attemptedTime.getFullYear()}</p>
                    {ver ? (<>
                        {ver2 ? (<><button className="btn btn-success"><Link className='text-light text-decoration-none' to={'/result/' + encodedData}>Check Results</Link></button></>) : (
                            <button disabled className="btn btn-success">Results</button>
                        )}
                    </>) : (<>
                        <button disabled className="btn btn-success">Test is On</button>
                    </>)}
                </div>
            </div>
        </div>
    )
}

export default ResultsPage;