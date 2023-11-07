

import React, { useState, useContext } from "react";
import './App.css';
import {ThemeProvider} from 'styled-components'
import { AuthProvider } from './context/AuthContext'
import {DisplayProvider}from './context/DisplayContext'
import {GlobalStyles} from './styles/Global.style'
import {lightTheme, darkTheme} from './styles/theme'
import Layout from "./layout/Layout";
import Pages from './Pages'

export const ThemeContext = React.createContext(null)
// https://www.youtube.com/watch?v=tYKRAXIio28

// styled components: https://www.youtube.com/watch?v=02zO0hZmwnw

function App() {
  const [theme, setTheme] = useState('light')
  const themeStyle = theme === 'light'? lightTheme : darkTheme

  return (
    <ThemeContext.Provider value={{setTheme, theme}}>
      <ThemeProvider theme={themeStyle}>
        <GlobalStyles/>
        <AuthProvider>
          <DisplayProvider>
            <Layout>
              <Pages />
            </Layout>

          </DisplayProvider>

          

      </AuthProvider>
   
     </ThemeProvider>
    </ThemeContext.Provider>
            
        
        
      
     
  
  );
}

export default App;
