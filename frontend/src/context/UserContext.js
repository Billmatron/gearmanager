//https://devtrium.com/posts/how-use-react-context-pro

import { createContext, useContext, useState, useEffect } from 'react';


const UserContext = createContext({});


const UserContextProvider = ({children }) => {

    const [user, setUser] = useState(null);

    useEffect(() => {getUser()}, [])
    // let getUser = () =>{
    //     let x = {company_name: "Company Name", username:"Username"}
    //     setUser(x)
    // }
    

   
    
    let getUser = async () => {
        let response = await fetch(`/api/home`)
        let data = await response.json()
        setUser(data)
        
    }
    
    
    return <UserContext.Provider value={{ user }}>
        {children}
    </UserContext.Provider>;

}

export {UserContext, UserContextProvider}

//export const useUser = () => useContext(UserContext);