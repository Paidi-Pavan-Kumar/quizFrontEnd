
import { useState, useEffect } from "react";
import { Link ,useNavigate } from "react-router-dom";
import Axios from 'axios';

function Login(props) {

    const p1 = process.env.PUBLIC_URL + '/bgimg.png';


    var toggle = [false, '',undefined,undefined];
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    const [emailErr, setEmailErr] = useState("")
    const [passwordErr, setPasswordErr] = useState('');

    const [passwordVer, setPasswordVer] = useState(false);

    const [validate, setValidate] = useState(false);

    const [arrStudent, setArrStudent] = useState([]);
    const [arrInstructor,setArrInstructor]=useState([]);

    const navigate=useNavigate();

    const handleClickS = () => {
        try {
            arrStudent.forEach((val, index) => {
                if (!validate) {
                    if (val.email === email) {
                        setEmailErr("")
                        if (val.password === password) {
                            setPasswordVer(true);
                            setValidate(true);
                            setPasswordErr("");
                            toggle = [true, false,val._id,val.name]
                            props.getState(toggle);
                            navigate('/')
                        }
                        else {
                            setPasswordErr("Invalid Credentials");
                            setPasswordVer(false);
                        }
                    }
                }
            });
        }
        catch (err) {
        }
        if(!passwordVer){
            setPasswordErr("Invalid Credentials");
        }
    }
    const handleClickI = () => {
        try {
            arrInstructor.forEach((val, index) => {
                if (!validate) {
                    if (val.email === email) {
                        setEmailErr("")
                        if (val.password === password) {
                            setPasswordVer(true);
                            setValidate(true);
                            setPasswordErr("");
                            toggle = [true, true,val._id,val.name];
                            props.getState(toggle);
                            navigate('/')
                        }
                        else {
                            setPasswordErr("Invalid Credentials");
                            setPasswordVer(false);
                        }
                    }
                }
            });
        }
        catch (err) {
        }
        if(!passwordVer){
            setPasswordErr("Invalid Credentials");
        }
    }
    const handleInput1 = (event) => {
        setEmail(event.target.value)
    }
    const handleInput2 = (event) => {
        setPassword(event.target.value)
    }
    useEffect(() => {
        props.getState(toggle)

        Axios.get("https://quizzoquizz-backend-nu4g.onrender.com/Route/getStudent")
            .then((res) => {
                if (res.status === 200) {
                    setArrStudent(res.data);
                }
                else {
                    Promise.reject();
                }
            })
            .catch((err) => alert(err));
            Axios.get("https://quizzoquizz-backend-nu4g.onrender.com/Route/getInstructor")
            .then((res) => {
                if (res.status === 200) {
                    setArrInstructor(res.data);
                }
                else {
                    Promise.reject();
                }
            })
            .catch((err) => alert(err));
    }, []);
    return (
        <div className="login-container">
            
            <div className="form-container p-5">
                <h3 className="text-center mb-3">Login</h3>
                <div style={{fontWeight:"bold"}} className="d-block text-center text-danger">{passwordErr}</div>
                <label className="form-label">Email Address: </label>

                <input id="login-input"  onChange={handleInput1} className="form-control mx-auto my-2" placeholder="Enter Your Email Address" />
                <label className="form-label">Password: </label>

                <input id="login-input" type="password" onChange={handleInput2} className="form-control mx-auto my-2" placeholder="Enter Your Password" />
                <div className="text-center">
                    {validate?(<>
                    <Link to={'/'}></Link>
                    </>):(<>
                    <button style={{ maxWidth: "170px" }} onClick={handleClickI} className="btn btn-success d-inline-block  mr-3 my-4">Login as Instructor</button>
                    <button style={{ maxWidth: "170px" }} onClick={handleClickS} className="btn btn-success d-inline-block text-light my-4"> Login as Student</button>
                    </>)
                    }
                </div>
                <div className="text-center">
                <span>Don't have an account? </span>

                <Link to='/signup' className='text-decoration-none'>SignUp</Link> 
                    </div>
            </div>
        </div>
    )
}
export default Login;

