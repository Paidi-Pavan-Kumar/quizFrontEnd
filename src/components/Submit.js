
import './styles.css';
function Submit(props) {

    const handleSubmit = () =>{
        props.getAction("submit");
    }

    const handleCancel = () =>{
        props.getAction("cancel");
    }
    
    return(
        <div className="queDisplay p-5 mb-5">
            <h2 className='text-center mb-3'>Do you want to submit the test ?</h2>
            <div className='d-flex flex-wrap justify-content-center'>
                <button className='btn btn-success mx-3' onClick={handleSubmit}>Submit</button>
                <button className='btn btn-danger mx-3' onClick={handleCancel}>Cancel</button>
            </div>
        </div>
    )
}

export default Submit;