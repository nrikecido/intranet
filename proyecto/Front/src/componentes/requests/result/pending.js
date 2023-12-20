import React, { useState, useEffect } from 'react';
import 'react-calendar/dist/Calendar.css';
import api from '../../../config/api';
import { useNavigate } from 'react-router-dom';

const Pending = () => {

  const [state, setState] = useState({
    status: 'loading',
    pending: [],
  });

  useEffect(() => {
    api.get('/requests/self').then((result) => {
      setState({ ...state, status: 'loaded', pending: result.data });
    });
  }, []);

  const redirect = useNavigate();

  const [message, setMessage] = useState('')
  
  const pendientes = state.pending.some((req) => req.status === 'pending')

  const delRequest = (id) => {
    api.delete('/requests/'+id).then(result => {
      if (result.status === true) {
        setMessage(<p className='bg-success p-3 rounded'>Eliminado correctamente.</p>)
        setTimeout(()=> {
          redirect('/app/workin/home')
        }, 3000)
      } else {
        setMessage(<p>Ha ocurrido un error.</p>)
      }
    })
  }

  console.log(state)
  
  return (
    <>
      <div className="col-xl-5">
        <div className="row">
          <div className="col-md-12">
            <div className="card rounded p-3 mb-4 border">
              <h2 className="card-header">Tus peticiones pendientes</h2>
              <div className="card-body pb-4">
                {!pendientes &&<p>No tienes peticiones propias pendientes</p>}
                {state.status === 'loaded' && (
                <>
                {state.pending
                .filter((pendingItem) => pendingItem.status === 'pending')
                .map((pendingItem) => (
                  <div key={pendingItem.ID} className="mb-3 card-body border">
                    <p className="mb-2">Fecha petición: {pendingItem.creado}</p>
                    <p className="mb-2">
                      Fecha solicitada: del {pendingItem.fecha} al {pendingItem.fecha2}
                    </p>
                    <p className="mb-2">Motivo: {pendingItem.comments}</p>
                    <p className="mb-2">
                      Estado: {pendingItem.status === 'pending' && <span className='bg-info p-2 rounded'>Pendiente</span>}
                    </p>
                    <button className='btn btn-danger p-3 rounded' onClick={()=> delRequest(pendingItem.ID)}>Borrar</button>
                  </div>
                  ))}
                  </>
                )}
              </div>{message}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pending;
