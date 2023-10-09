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
              {user? <p>{user?.company}</p>: <h3>GEAR MANAGER</h3>}
              
            </div>
            <div>
              <ul className='navbar-links'>
                {user? 
                <>
                <li><Link to={`/inventory`}>Inventory</Link></li>
                <li><Link to={`/units`}>All Gear</Link></li>
                <li><Link to={`/`}>Home</Link></li>
                </>:<li></li>
              }
                
                
                {user ? <li><Link onClick={logoutUser}>Logout</Link></li>: <li><Link to={`/login`}>LogIn</Link></li>}
              </ul>
            </div>
          </div>

      </header>
    </div>
  )
}

export default Header