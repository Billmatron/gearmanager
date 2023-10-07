import React, {useContext} from 'react'
import Body from '../components/Body'
import AuthContext from '../context/AuthContext'
 //https://www.youtube.com/watch?v=xjMP0hspNLE


const LoginPage = () => {
  let {loginUser} = useContext(AuthContext)
  return (
    <Body>
        <div>
          <div>
            <form className="form-container" onSubmit={loginUser}> 
              <h3>Welcome</h3>
              <div>
                <div>
                  <label htmlFor="username">Username</label>
                </div>
                <div>
                  <input type="text" name="username" id="login_username" placeholder='Enter Username' />
                </div>
              </div>
              <div>
                <div>
                  <label htmlFor="password">Password</label>
                </div>
                <div>
                  <input type="password" name="password" id="login_password" placeholder='Enter password' />
                </div>
                
              </div>
              <div>
                <input type="submit" value="Log In" />
              </div>
              
            </form>
          </div>
        
    </div>
    </Body>
    
  )
}

export default LoginPage