import logo from './logo.svg';
import './App.scss';
import { Paper } from '@mui/material';
import { LoginComponent } from './auth/LoginComponent';
// import { PagesComponent } from './pages/PagesComponent';
import { Navigate, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
const PagesComponent = lazy(()=> import('./pages/PagesComponent') );


function App() {
  return (
    <div className='app-component'>
      <Routes>
        <Route path='/' element={<Navigate to={"/login"} replace={true} />}></Route>
        <Route path='login' element={<LoginComponent></LoginComponent>}></Route>
        <Route path='pages/*' element={
          <Suspense fallback={<div>Loading.....</div>}>
            <PagesComponent></PagesComponent>
          </Suspense>
        }></Route>
      </Routes>
    </div>
  );
}

export default App;
