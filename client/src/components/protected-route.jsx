import { useContext } from 'react';
import { GeneralContext } from '../context/general-context';
import { useLocation, Navigate } from 'react-router-dom';

function ProtectedRoute({children}) {
  const {isAuthenticated} = useContext(GeneralContext);

  const location = useLocation();

  if(!isAuthenticated){
    return <Navigate to="/login" state={{from: location}} replace/>
  }

  return children;
}

export default ProtectedRoute