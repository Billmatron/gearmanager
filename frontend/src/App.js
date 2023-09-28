
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';
import Header from './components/Header';
import ModelsListPage from './pages/ModelsListPage'
import ModelPage from './pages/ModelPage'


// https://www.youtube.com/watch?v=tYKRAXIio28


function App() {
  return (
    <Router>
      
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" exact element={<ModelsListPage/>}/>
          <Route path="/model/:id" exact element={<ModelPage/>}/>
        </Routes>
      </div>
      
    </Router>
  );
}

export default App;
