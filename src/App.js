import logo from './logo.svg';
import './App.scss';
import { Paper } from '@mui/material';
import { LoginComponent } from './auth/LoginComponent';
import { PagesComponent } from './pages/PagesComponent';
import { Navigate, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className='app-component'>
      <Routes>
        <Route path='/' element={<Navigate to={"/login"} replace={true} />}></Route>
        <Route path='login' element={<LoginComponent></LoginComponent>}></Route>
        <Route path='pages/*' element={<PagesComponent></PagesComponent>}></Route>
      </Routes>
    </div>
  );
}

export default App;
