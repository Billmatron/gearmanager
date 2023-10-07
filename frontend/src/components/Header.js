import React from 'react'
import { useContext } from "react";
import { Link } from 'react-router-dom'
import {UserContext, UserContextProvider} from '../context/UserContext'
import AuthContext from '../context/AuthContext'

const Header = () => {
 
  //const user = useContext(UserContext);
  const {user, logoutUser }= useContext(AuthContext);
  
  return (
    <div>
      <header>
  
          <div className="navflex">
            <div>
              {/* <p id="company-name">{user.user?.company_name}</p>  */}
              <p>{user?.company}</p>
            </div>
            <div>
              <ul className='navbar-links'>
                <li><Link to={`/inventory`}>Inventory</Link></li>
                <li><Link to={`/units`}>All Gear</Link></li>
                <li><Link to={`/`}>Home</Link></li>
                
                {user ? <li><Link onClick={logoutUser}>Logout</Link></li>: <li><Link to={`/login`}>LogIn</Link></li>}
              </ul>
            </div>
          </div>

      </header>
    </div>
  )
}

export default Header