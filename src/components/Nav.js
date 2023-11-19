import {Link} from 'react-router-dom';
import Logo from '../logo3.png';
function Nav(props){


    return(
        <nav style={{width:"100%"}} className="navbar navbar-expand-md pr-2" id='nav'>
            
            <Link to='/' className="navbar-brand mx-5"><img className='nav-image' id='nav-image' alt='Q' src={Logo} /></Link>
            <div style={{fontWeight:"700"}} className='text-light mx-auto'> Welcome {props.name}</div>
            <button className="navbar-toggler border border-2 border-dark bg-secondary ml-auto" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className='collapse navbar-collapse' id='navbarNav'>
                <ul className='navbar-nav ml-auto'>
                    <li className='nav-item text-center active'>
                        <Link to={'/'} className='nav-link text-light'>Home</Link>
                    </li>
                {!props.value[0]?(<>
                        <li className='nav-item'>
                            <Link to={'/signup'} className='nav-link text-light text-center'>Sign Up</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to={'/login'} className='nav-link text-light text-center'>Login</Link>
                        </li>
                    </>
                    ):(<>
                        {props.value[1]?(<>
                            <li className='nav-item'>
                                <Link to={'/create'} className='nav-link text-light text-center'>Create</Link>
                            </li>
                            <li className='nav-item'>
                                <Link to={'/mytests'} className='nav-link text-light text-center'>MyTests</Link>
                            </li>
                            </>
                        ):(
                            <>
                            <li className='nav-item'>
                                <Link to={'/compete'} className='nav-link text-light text-center'>Compete</Link>
                            </li>
                            <li className='nav-item'>
                                <Link to={'/completed'} className='nav-link text-light text-center'>Completed</Link>
                            </li>
                            </>
                        )}
                        <li className='nav-item'>
                            <Link to={'/login'} className='nav-link text-light text-center'>Log Out</Link>
                        </li>
                    </>
                )}
                </ul>
            </div>
            
        </nav>
    )
}

export default Nav;