import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import MenuContextProvider from './contexts/MenuContext';
import LoginView from './views/LoginView'
import MenuView from './views/MenuView';


function App() {
  return (
      <MenuContextProvider>
        <Router>
          <Routes>
            <Route exact path='/' element={<LoginView/>} />
            <Route exact path='/menu' element={<MenuView/>} />
          </Routes>
        </Router>
      </MenuContextProvider>
  );
}

export default App;
