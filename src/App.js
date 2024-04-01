import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Home from './pages/Home';
import Homedepartment from './pages/Homedepartment';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import AddEmployee from './employees/AddEmployee';
import EditEmployee from './employees/EditEmployee';
import Adddepartment from './department/Adddepartment';
import Editdepartment from './department/Editdepartment';
import LoginForm from './login';
import Logindept from './logindept';
function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route exact path = "/" element={<LoginForm/>}/>
        <Route exact path = "/logindept" element={<Logindept/>}/>
        <Route exact path = "/Home" element={<Home/>}/>
        <Route exact path = "/Homedepartment" element={<Homedepartment/>}/>
        <Route exact path = "/addemployee" element={<AddEmployee/>}/>
        <Route exact path = "/editemployee/:id" element={<EditEmployee/>}/>
        <Route exact path = "/adddepartment" element={<Adddepartment/>}/>
        <Route exact path = "/editdepartment/:id" element={<Editdepartment/>}/>
      </Routes>
      </Router>
      
    </div>
  );
}

export default App;
