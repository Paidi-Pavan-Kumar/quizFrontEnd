
import { useParams } from "react-router-dom";
import CreateQuestions from "./CreateQuestions";

function EditTest(){
    
    const {data}=useParams();
    let receivedData;
    try{
        receivedData = JSON.parse(decodeURIComponent(data));
    }
    catch(error){
        console.log(error)
    }


    const questions=receivedData[8];
    const len=questions?.length||0

   
    return(
        <div>
            <CreateQuestions data={receivedData} len={len} />
        </div>
    )
}

export default EditTest;