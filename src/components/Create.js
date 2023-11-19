

import { useState } from "react";
import CreateQuestions from "./CreateQuestions";

function Create(props) {
  const [testName, setTestName] = useState("");
  const [testCode, setTestCode] = useState("");
  const [testStartTime, setTestStartTime] = useState("");
  const [testEndTime, setTestEndTime] = useState("");
  const [resultsTime, setResultsTime] = useState("");
  const [users, setUsers] = useState(false);
  const [ver, setVer] = useState(false);

  const data = [testName, testCode, testStartTime, testEndTime, resultsTime, users, props.id];

 
  const formatToIST = (utcDateString) => {
    const date = new Date(utcDateString);
    const options = { timeZone: 'Asia/Kolkata' };
    return date.toLocaleString('en-US', options);
  };

  const subtractISTOffset = (istDateString) => {
    const date = new Date(istDateString);
    date.setHours(date.getHours() - 0);
    date.setMinutes(date.getMinutes() - 0);
    return date.toISOString().slice(0, 16); 
  };

  return (
    <div>
      <form className="form-container mx-auto p-5 my-5" style={{ maxWidth: '700px' }}>
        {ver ? (
          <CreateQuestions content={data} />
        ) : (
          <>
            <label>Test Name:</label>
            <input onChange={(event) => setTestName(event.target.value)} className="form-control" />
            <br />
            <label>Test Code:</label>
            <input style={{ maxWidth: "600px" }} onChange={(event) => setTestCode(event.target.value)} className="form-control" />
            <br />
            <label>Start Time:</label>
            <input
              type="datetime-local"
              onChange={(event) => setTestStartTime(subtractISTOffset(event.target.value))}
              className="form-control"
            />
            <br />
            <label>End Time:</label>
            <input
              type="datetime-local"
              onChange={(event) => setTestEndTime(subtractISTOffset(event.target.value))}
              className="form-control"
            />
            <br />
            <label>Results Time:</label>
            <input
              type="datetime-local"
              onChange={(event) => setResultsTime(subtractISTOffset(event.target.value))}
              className="form-control"
            />
            <label className="mr-3">Users to access the Test</label>
            <select className="my-4" style={{ maxWidth: "600px" }} value={users} onChange={(event) => setUsers(event.target.value)}>
              <option value='' selected>
                Private
              </option>
              <option value='true'>Public</option>
            </select>
            <br />
            <button className="btn btn-success" onClick={(event) => setVer(true)}>
              Add Questions
            </button>
          </>
        )}
      </form>
    </div>
  );
}

export default Create;

