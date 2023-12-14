import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import APP from './pages/app';

// Componentes importados
import Home from './componentes/home';
import Sign from './componentes/sign';
import Times from './componentes/times';
import Requests from './componentes/requests'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/app/workin/' element={<APP><Home></Home></APP>}></Route>
      <Route path='/app/workin/sign' element={<APP><Sign></Sign></APP>}></Route>
      <Route path='/app/workin/times' element={<APP><Times></Times></APP>}></Route>
      <Route path='/app/workin/requests' element={<APP><Requests></Requests></APP>}></Route>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
