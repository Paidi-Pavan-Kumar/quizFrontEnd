import { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import Axios from 'axios';

function Signup(){
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const [nameVer,setNameVer]=useState(false);
    const [emailVer,setEmailVer]=useState(false);
    const [passwordVer,setPasswordVer]=useState(false);
    const [rePasswordVer,setRePasswordVer]=useState(false);


    const [validate,setValidate]=useState(false);
    const [validateErr,setValidateErr]=useState("")


    const [nameErr,setNameErr]=useState("");
    const [emailErr,setEmailErr]=useState("");
    const [passwordErr,setPasswordErr]=useState("");
    const [rePasswordErr,setRePasswordErr]=useState("");

    const [arrStudent,setArrStudent]=useState([]);
    const [arrInstructor,setArrInstructor]=useState([]);

    const [actErr,setActErr]=useState("");
    const [actVer,setActVer]=useState(false);

    const [ver,setVer]=useState(false);
    const [ver2,setVer2]=useState(false);

    const navigate=useNavigate();

    const nameValidation=(event)=>{
        setName(event.target.value);
        if(event.target.value.length<5 || event.target.value.length>12){
            setNameErr("User name should be in between 5 to 12 characters");    
            setNameVer(false);
        }
        else{
            setNameErr("");
            setNameVer(true);
        }
    }
    const emailValidation=(event)=>{
        var reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        setEmail(event.target.value);
        if(!event.target.value.match(reg)){
            setEmailErr("Invalid Email Format");
            setEmailVer(false)
        }
        else{
            setEmailErr("")
            setEmailVer(true)
        }
    }
    const passwordValidation=(event)=>{
        var reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        setPassword(event.target.value)
        if(!event.target.value.match(reg)){
            setPasswordErr("Weak Password");
            setPasswordVer(false)
        }
        else{
            setPasswordErr("");
            setPasswordVer(true)
        }
    }
    const rePasswordValidation=(event)=>{
        if(event.target.value!==password){
            setRePasswordErr("Password missmatch")
            setRePasswordVer(false)
        }
        else{
            setRePasswordErr("")
            setRePasswordVer(true)
        }
    }
    
    useEffect(()=>{
        
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
            arrInstructor.forEach((val,index)=>{
                setActVer(true)
                if(actVer){
                    setVer(true)
                    if(val.email===email){
                        setActVer(false);
                    }
                    
                }
            })
            arrStudent.forEach((val,index)=>{
                setVer2(true)
                if(ver2){
                    setVer(true)
                    if(val.email===email){
                        setVer2(false);
                    }
                    
                }
            })
            if(nameVer && emailVer && passwordVer && rePasswordVer){
                setValidate(true)
                setValidateErr("")
            }
            else{
                setValidate(false)
                setValidateErr("")
            }
    },[email,nameVer,emailVer,passwordVer,rePasswordVer] )
    const handleSubmitI=()=>{
        if(actVer && validate && ver){
            const data={name:name,email:email,password:password}
            Axios.post("https://quizzoquizz-backend-nu4g.onrender.com/Route/createInstructor",data)
            .then((res)=>{

                if(res.status === 200){
                    alert("Account Created Successfully");
                    
                }
                else{
                    Promise.reject();
                }
                
            })
            .catch((err)=>{
                alert(err);
            });
            navigate('/login');
        }
        else{
            setActErr("This Email is already Registered")
        }
    }
    const handleSubmitS=()=>{
        if(validate && ver2 && ver){
            const data={name:name,email:email,password:password}
            Axios.post("https://quizzoquizz-backend-nu4g.onrender.com/Route/createStudent",data)
            .then((res)=>{

                if(res.status === 200){
                    alert("Account Created Successfully");
                    
                }
                else{
                    Promise.reject();
                }
                
            })
            .catch((err)=>{
                alert(err);
            });
            navigate('/login');
        }
        else{
            setActErr("This Email is already Registered");
        }

    }
           
    return(
        <div className="login-container">
            <div className="text-center">
                <form className="form-container p-5">
                    <h3>Sign up</h3>
                <div style={{color:"red",fontWeight:"bold"}} className="text-center">{validateErr}</div>
                <div style={{color:"red",fontWeight:"bold"}} className="text-center">{actErr}</div>
                <input id="signup-input" onChange={nameValidation} className="form-control mx-auto my-3" placeholder="Enter your Name" />
                <div style={{color:"red",fontWeight:"bold"}} className="text-center">{nameErr}</div>
                <input id="signup-input" onChange={emailValidation} className="form-control mx-auto my-3" placeholder="Enter your Email" />
                <div style={{color:"red",fontWeight:"bold"}} className="text-center">{emailErr}</div>
                <input id="signup-input" onChange={passwordValidation} type="password" className="form-control mx-auto my-3" placeholder="Create Password" />
                <div style={{color:"red",fontWeight:"bold"}} className="text-center">{passwordErr}</div>
                <input id="signup-input" onChange={rePasswordValidation} type="password" className="form-control mx-auto my-3" placeholder="Re-enter the password" />
                <div style={{color:"red",fontWeight:"bold"}} className="text-center">{rePasswordErr}</div>
           
                <div className="text-center">
                    <Link to={'/login'}></Link>
                        {
                            true?(
                            <>
                            <button style={{marginRight:"20px"}} onClick={handleSubmitI} className="btn btn-success d-inline-block">Sign Up as Instructor
                            </button>
                            </>)
                            :(
                            <>
                            <button style={{marginRight:"20px",backgroundColor:"rgb(117, 186, 6)"}} className="btn d-inline-block">
                            <span className="text-light">Sign Up as Instructor</span>
                            </button>
                            </>)
                        }
                        
                        {
                            true?(
                            <>
                            <button style={{marginRight:"20px"}} onClick={handleSubmitS} className="btn btn-success d-inline-block">Sign up as Student
                            </button>
                            </>)
                            :(
                            <>
                            <button style={{marginRight:"20px",backgroundColor:"rgb(117, 186, 6)"}} className="btn d-inline-block">
                            <span className="text-light">Sign Up as Student</span>
                            </button>
                            </>)
                        }
                </div>
                </form>
            </div>
        </div>
    )
}
export default Signup;