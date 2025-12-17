import './login.css';
import {useContext, useMemo, useState} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import { GeneralContext } from '../../context/general-context';


function Login() {
  const {login} = useContext(GeneralContext);

  const location = useLocation();

  // retrieve the details of the location catched in the protected-route component
  const cachedLocation = useMemo(()=>{
    return location.state?.from?.pathname || "/dashboard";
  }, [location.state?.from?.pathname]);

  const navigateTo = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  const loginData = {email, password}

  const loginFunction = async () => {
    const loginStatus = await login(loginData);

    if(loginStatus === true){
        navigateTo(cachedLocation, {replace: true});
    }
    else{
        return;
    }
  }


  return (
    <div className='login'>
        <div className="login-info">
            <h1>It begins here!</h1>
            <p>Login to continue.</p>
        </div>
        <div className="login-field">
            <h3>Login</h3>
            <div>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required/>
            </div>
            <div>
                <label htmlFor="pwd">Password:</label>
                <input type="password" id="pwd" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required/>
            </div>
            <div>
                <button type="submit" onClick={loginFunction}>Submit</button>
            </div>            
        </div>        
    </div>
  )
}

export default Login