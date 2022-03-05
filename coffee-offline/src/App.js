import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import MenuContextProvider from './contexts/MenuContext';
import FaceContextProvider from './contexts/FaceContext';
import LoginView from './views/LoginView'
import MenuView from './views/MenuView';


function App() {
  return (
    <FaceContextProvider>
      <MenuContextProvider>
        <Router>
          <Routes>
            <Route exact path='/' element={<LoginView/>} />
            <Route exact path='/menu' element={<MenuView/>} />
          </Routes>
        </Router>
      </MenuContextProvider>
    </FaceContextProvider>
  );
}

export default App;
