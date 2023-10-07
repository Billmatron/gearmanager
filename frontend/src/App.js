
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import PrivateRoute from './utils/PrivateRoute'
import { AuthProvider } from './context/AuthContext'
import './App.css';
import Header from './components/Header';
import UnitsListPage from './pages/UnitsListPage'
import UnitPage from './pages/UnitPage'
import InventoryListPage from './pages/InventoryListPage'
import InventoryItemPage from './pages/InventoryItemPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'




// https://www.youtube.com/watch?v=tYKRAXIio28


function App() {
  return (
    
     
      
      <div className="App">
      <Router>
        <AuthProvider>
          <Header />
          <Routes>
            <Route exact path = "/"  element={<PrivateRoute />}>
              <Route exact path = "/"  element={<HomePage />}/>
            </Route>
            <Route exact path = "/login"  element={<LoginPage />}/>
            <Route exact path="/units"  element={<UnitsListPage/>}/>
            <Route exact path="/units/:id" element={<UnitPage/>}/>
            <Route exact path="/inventory"  element={<InventoryListPage/>}/>
            <Route exact path="/inventory/:id"  element={<InventoryItemPage/>}/>
          </Routes>
        </AuthProvider>
      </Router>
        </div>
            
        
        
      
     
  
  );
}

export default App;
