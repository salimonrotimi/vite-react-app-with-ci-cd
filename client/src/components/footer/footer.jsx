import React from 'react';
import './footer.css';

function Footer() {
  const myDate = new Date();
  const currentYear = myDate.getFullYear();

  return (
    <div className='footer'>
        &copy;{currentYear}
    </div>
  )
}

export default Footer