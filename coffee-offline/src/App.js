import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginView from './views/LoginView'
import MainView from './views/MainView';


function App() {
  return (
    <>
        <Router>
          <Routes>
            <Route exact path='/' element={<LoginView/>} />
            <Route exact path='/menu' element={<MainView/>} />
          </Routes>
        </Router>
    </>
  );
}

export default App;
