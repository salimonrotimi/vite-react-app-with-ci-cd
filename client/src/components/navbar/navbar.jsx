import { useContext } from 'react';
import './navbar.css';
import home_image from '../../assets/home.png'
import {Link, useLocation} from 'react-router-dom';
import { GeneralContext } from '../../context/general-context';


function Navbar() {
  const {logout} = useContext(GeneralContext); 
  const location = useLocation();
  
  return (
    <div className='navbar'>
      <div className="navbar-home-div">
        <Link to="/"><img src={home_image} width={25}/></Link>
      </div>
      <div className='navbar-menu-div'>
        {location.pathname === '/'
         ? <span>
              <Link to="/login" className='navbar-login'>Login</Link>
           </span>           
         : <>
             {location.pathname === '/login'
              ? <span>
                  <Link to="/" className='navbar-register'>Register</Link>
                </span>
              : <>                  
                  {location.pathname === '/dashboard'
                   ? <span>
                        <Link to="/login" className='navbar-logout' onClick={logout}>Logout</Link>
                     </span>
                   : <></>
                  }
                </>
             }
           </>
        }        
      </div>
    </div>
  )
}

export default Navbar