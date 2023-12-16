import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import APP from './pages/app';
import Context from './config/contextglobal';

// Componentes importados
import Home from './componentes/home';
import Sign from './componentes/sign';
import Times from './componentes/times';
import Requests from './componentes/requests';
import Enterprise from './componentes/enterprise';
import Login from './login';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context>
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path='/workin/' element={<Login></Login>}></Route>
          <Route path='/app/workin/home' element={<APP><Home></Home></APP>}></Route>
          <Route path='/app/workin/sign' element={<APP><Sign></Sign></APP>}></Route>
          <Route path='/app/workin/times' element={<APP><Times></Times></APP>}></Route>
          <Route path='/app/workin/requests' element={<APP><Requests></Requests></APP>}></Route>
          <Route path='/app/workin/enterprise' element={<APP><Enterprise></Enterprise></APP>}></Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </Context>
);
