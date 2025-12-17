import './dashboard.css';
import { useContext } from 'react';
import { GeneralContext } from '../../context/general-context';

function Dashboard() {
  const { usersData } = useContext(GeneralContext);

  

  return (
    <div className='dashboard'>
      <div className='dashboard-grid header-color'>
        <span>Username</span>
        <span>Email</span>
        <span>Gender</span>
      </div>
      <div>
        {usersData.map(dataItem => {
        return <div key={dataItem._id} className='dashboard-grid'>
                <div>{dataItem.username}</div>
                <div>{dataItem.email}</div>
                <div>{dataItem.gender}</div>
               </div>
      })}
      </div>
    </div>
  )
}

export default Dashboard