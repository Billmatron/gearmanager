
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import PrivateRoute from './utils/PrivateRoute'
import { AuthProvider } from './context/AuthContext'
import './App.css';
import {Header} from './components/Header';
import UnitsListPage from './pages/UnitsListPage'
import UnitPage from './pages/UnitPage'
import InventoryListPage from './pages/InventoryListPage'
import InventoryItemPage from './pages/InventoryItemPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import InventoryAddFormPage from "./pages/InventoryAddFormPage";
import {ThemeProvider} from 'styled-components'
import {GlobalStyles} from './components/styles/Global.style'
import {StyledFlexColumn, StyledFlexRow,StyledMain} from './components/styles/Containers.style'
import {StyledFooter} from './components/styles/Footer.style'
import {StyledSidebar, Sidebar} from './components/Sidebar'


// https://www.youtube.com/watch?v=tYKRAXIio28

// styled components: https://www.youtube.com/watch?v=02zO0hZmwnw
const theme = {
  colors: {
    action: 'rgb(236, 88, 59)',
    base: 'white',
    body: 'whitesmoke',
    accent: 'rgb(82, 119, 156)'
  }
}

function App() {
  return (
    
     <ThemeProvider theme={theme}>
      <GlobalStyles/>
      <StyledFlexColumn id={'flex-column'}>
      <Router>
        <AuthProvider>
          
            <Header id={'main-header'}/>
          
            <StyledFlexRow id={'flex-row'}>
                <Sidebar id={'sidebar'}/>
                
                <StyledMain id={'content'}>
              
                    <Routes>
                        <Route exact path = "/login"  element={<LoginPage />}/>
                        <Route exact path = "/"  element={<PrivateRoute />}>
                        <Route exact path = "/"  element={<HomePage />}/>
                        
                        <Route exact path="/units"  element={<UnitsListPage/>}/>
                        <Route exact path="/units/:id" element={<UnitPage/>}/>
                        <Route exact path="/inventory"  element={<InventoryListPage/>}/>
                        <Route exact path="/inventory/:id"  element={<InventoryItemPage/>}/>
                        <Route exact path="/inventory/add"  element={<InventoryAddFormPage/>}/>
                      </Route>
                    </Routes>

              </StyledMain>
              
            </StyledFlexRow>

            <StyledFooter>I'm in the body footer</StyledFooter>

          


        </AuthProvider>
      </Router>
      </StyledFlexColumn>

     </ThemeProvider>
      
      
            
        
        
      
     
  
  );
}

export default App;
