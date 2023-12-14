import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ContenidoHeader from './pages/app';

// Componentes importados
import Home from './componentes/home'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/workin/' element={<ContenidoHeader><Home></Home></ContenidoHeader>}></Route>

    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
