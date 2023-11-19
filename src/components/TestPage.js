import { useParams } from "react-router-dom";
import QuizData from "./QuizData";

function TestPage(props){
    const {data}=useParams();
    const decodedData=JSON.parse(decodeURIComponent(data));
    const len=decodedData.question?.length||0;
    return(
        <div className="">
            {<QuizData data={decodedData} id={props.id} len={len} />}
        </div>
    )
}

export default TestPage;