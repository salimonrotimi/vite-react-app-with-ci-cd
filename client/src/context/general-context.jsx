import { createContext, useState, useEffect, useCallback } from 'react'
import toast from 'react-hot-toast';


const GeneralContext = createContext();

function GeneralContextProvider({children}) {
  const API_URL = import.meta.env.VITE_API_URL;
  const [usersData, setUsersData] = useState([]);
  const [user, setUser] = useState([]);

  // ALL USERS
  const getUsersData = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });

      const data = await response.json();

      if(response.ok && data.success === true){
        setUsersData(data.result);
        return true;
      }
      if(data.success === false){
        toast.error(data.error_message);
        return false;
      }
    } catch (error) {
      toast.error("Something went wrong while trying to get users.");
      console.error(error);
    }
  }, [API_URL])

  useEffect(()=>{
    getUsersData();
  }, [getUsersData]); 

  // REGISTER
  const register = async (userData) => {
    try {
        const {username, email, password, gender} = userData

        if(!username || !email || !password || !gender){
            toast.error("Please fill all fields to continue.");
            return;
        }

        const response = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        const data = await response.json();

        if(data.success === true){
            toast.success(data.message);
            return true;
        }
        if(data.success === false){
            toast.error(data.error_message);
            return false;
        }
    } catch (error) {
        toast.error("Error registering user.");
        console.error(error);
    }
  }

  // LOGIN
   const login = async (signinData) => {
    try {
        const {email, password} = signinData

        if(!email || !password){
            toast.error("Please fill all fields to continue.");
            return;
        }

        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(signinData)
        });

        const data = await response.json();

        if(data.success === true){
            localStorage.setItem("user", JSON.stringify(data.user_record));
            setUser(data.user_record);
            toast.success(data.message);
            return true;
        }
        if(data.success === false){
            toast.error(data.error_message);
            return false;
        }
    } catch (error) {
        toast.error("Error signing in user.");
        console.error(error);
    }
  }

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("user");
  }

  // STORED USER
  const getStoredUser = useCallback(() => {
    try {
        const storedUser = localStorage.getItem("user");
        const parseUser = storedUser ? JSON.parse(storedUser) : null;
        return parseUser;
    } catch (error) {
        console.error(error);
        return null;
    }
  }, [])

  useEffect(()=>{
    const currentUser = getStoredUser();
    setUser(currentUser);
  }, [getStoredUser]);
  
  // Use the functions declared above as context values.
  const allContext = {
    usersData,
    API_URL,
    register, 
    login,
    logout,
    isAuthenticated: !!user
};
  
  return (
    <GeneralContext.Provider value={allContext}>
        {children}
    </GeneralContext.Provider>
  )
}

export { GeneralContext, GeneralContextProvider}