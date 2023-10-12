import React, {useContext} from 'react'
import Body from '../components/Body'
import AuthContext from '../context/AuthContext'
import { Link } from 'react-router-dom'
 //https://www.youtube.com/watch?v=xjMP0hspNLE


const LoginPage = () => {
  let {loginUser} = useContext(AuthContext)
  return (
    <Body>
        <div>
          <div>
            <form className="form-container login" onSubmit={loginUser}> 
              <h2>Welcome!</h2>
              <div className='input-container'>
                <div>
                  <label htmlFor="username">Username</label>
                </div>
                <div className='form-grid'>
                  <div><i className='fa fa-user icon'></i></div>
                  <input type="text" name="username" id="login_username" placeholder='Type your username' />
                </div>
              </div>
              <div className='input-container'>
                <div>
                  
                  <label htmlFor="password">Password</label>
                </div>
                <div className='form-grid'>
                  <div><i className='fa fa-user-secret icon'></i></div> 
                  <input type="password" name="password" id="login_password" placeholder='Type your password' />
                </div>
                
              </div>
              <div>  
                <input type="submit" value="Log In" />
              </div>
              <div>
                <Link to="#"><p>New Here? Register, then.</p></Link>
               
              </div>
              
            </form>
          </div>
        
    </div>
    </Body>
    
  )
}

export default LoginPage