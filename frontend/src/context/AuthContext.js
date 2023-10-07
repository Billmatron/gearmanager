import { createContext, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom'

//https://www.youtube.com/watch?v=xjMP0hspNLE

const AuthContext = createContext()

export default AuthContext;


export const AuthProvider = ({children}) => {
    
    let [authTokens, setAuthTokens] = useState(()=>localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(()=>localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    let [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    

    // function to get token data from backend and save it to state and local storage
    let loginUser = async(e) => {
        
        e.preventDefault();
        
        let response = await fetch('/api/token', {
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'username': e.target.username.value, 'password':e.target.password.value})
        })
        let data = await response.json()
        if (response.status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            navigate('/');
        } else {
            alert("something failed in login")
        }
        
    }

    // function to log the user out
    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        navigate('/login')
    }

    // function to call for a new set up tokens from the refresh token
    let updateToken = async ()=>{
        let response = await fetch('/api/token/refresh', {
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'refresh':authTokens?.refresh})
        })
        let data = await response.json()

        if (response.status === 200){
            console.log("update Token called")
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        } else{
            logoutUser()
        }
        if(loading){
            setLoading(false)
        }
    }


    // set up what is in the context to pass along
    let contextData = {
        user: user,
        authTokens: authTokens,
        loginUser:loginUser,
        logoutUser:logoutUser,
    
    }

    // use refresh token to call for new access token every 4 minutes
    useEffect(()=> {
        if(loading){
            updateToken()
        }
        let fourMinutes = 1000 * 60 * 4
        let interval = setInterval(()=>{
            if(authTokens){
                updateToken()
            }
        }, fourMinutes)
        return ()=> clearInterval(interval)

    }, [authTokens, loading])





    return(
        <AuthContext.Provider value={contextData}>
                { loading? null:children }
        </AuthContext.Provider>
    )
}