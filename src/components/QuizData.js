import { useEffect, useState } from "react";
import QuizPlatform from "./QuizPlatform";


function QuizData(props) {
    const [data, setData] = useState(props.data);
    const len = props.len;
    const [QuizData, setQuizData] = useState([]);
    const [ver, setVer] = useState(false);
    const [count,setCount]=useState(0);


    useEffect(() => {
        let temp=[]
        if (count === 0) {
            try {
                
                Array.from({ length: len }, (val, index) => {
                    const newQuestion = {
                        question: data.question[index],
                        options: [data.option1[index], data.option2[index], data.option3[index], data.option4[index]],
                        answer: data.answer[index]
                    };
                    temp[index] = newQuestion;
                    if (len === index + 1) {
                        setVer(true);
                    }
                    
                })

            }
            catch { }
            setQuizData(temp)
            setCount(1)
        }
    }, [props.data])
    return (
        <div>
            {ver?(<>
            <QuizPlatform name={data.testName} id={props.id} val={data} code={data.testCode} data={QuizData} />
            </>):(null)}
        </div>
    )
}

export default QuizData;