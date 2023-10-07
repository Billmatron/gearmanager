import { Navigate, Outlet} from 'react-router-dom'
import {useContext} from 'react'
import AuthContext from '../context/AuthContext'

// const PrivateRoute = ({children, ...rest}) => {
//     console.log("private route running");
//     return(
        
//         <Route {...rest}>{children}</Route>
//     )
// }

const PrivateRoute = () => {
   let {user} = useContext(AuthContext)
    
    return (user? <Outlet /> : <Navigate to="/login" />)
}
export default PrivateRoute