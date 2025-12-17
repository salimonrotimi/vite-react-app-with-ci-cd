import './home.css';
import {useState, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import { GeneralContext } from '../../context/general-context';



function Home() {
  const {register} = useContext(GeneralContext);
  const navigateTo = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");

  const allUserData = {username, email, password, gender}
  
  const registerFunction = async () => {
    const registerStatus = await register(allUserData);
    
    if(registerStatus === true){
        navigateTo('/dashboard', {replace: true});
    }
    else{
        return;
    }
  }

  return (
    <div className='home'>
        <div className="home-greetings">
            <h1>Welcome</h1>
            <p>You are welcome onboard. You are at the right place. Kindly register or login to continue.</p>
        </div>
        <div className="home-register-field">
            <h3>Register</h3>
            <div>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username" required/>
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required/>
            </div>
            <div>
                <label htmlFor="pwd">Password:</label>
                <input type="password" id="pwd" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required/>
            </div>
            <div>
                <label htmlFor="gender">Gender:</label>
                <select name="gender" id="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                    <option value="" disabled>Choose your gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>
            <div>
                <button type="submit" onClick={registerFunction}>Submit</button>
            </div>            
        </div>        
    </div>
  )
}

export default Home