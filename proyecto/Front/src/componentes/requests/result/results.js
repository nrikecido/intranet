import React, { useState, useContext, useEffect } from 'react';
import 'react-calendar/dist/Calendar.css';
import api from '../../../config/api';
import { ContextGlobal } from '../../../config/contextglobal';

const Result = () => {

    const [context, setContext] = useContext(ContextGlobal);

    const ID = context.user.ID;

    const [state, setState] = useState({
        status: 'loading',
        pending: []
    })

    useEffect(()=> {
        api.get('/requests/managed/'+ID).then(result => {
            setState({...state, status: 'loaded', pending: result.data})
        })
    }, [])

    const pendientes = state.pending.some((req) => req.status === 'pending')
    console.log(pendientes)

    return<>
    <div className="col-xl-5">
        <div className="row">
            <div className="col-md-12">
                <div className="card rounded p-3 mb-4 border">
                    <h2 className="card-header">Tus peticiones resueltas</h2>
                    <div className="card-body pb-4">
                        {pendientes && <p>No tienes peticiones resueltas</p>}
                        {state.status === 'loaded' && (
                        <>
                            {state.pending
                            .filter((pendingItem) => pendingItem.status === 'approved' || pendingItem.status === 'rejected')
                            .map((pendingItem) => (
                                <div key={pendingItem.ID} className="mb-3 card-body border">
                                    <p className="mb-2">Fecha petición: {pendingItem.created}</p>
                                    <p className="mb-2">
                                        Fecha solicitada: del {pendingItem.fecha} al {pendingItem.fecha2}
                                    </p>
                                    <p className="mb-2">Motivo: {pendingItem.comments}</p>
                                    <p className="mb-2">
                                        Estado: 
                                        {pendingItem.status === 'approved' && <span className='bg-success p-2 rounded'>Aprobada</span>}
                                        {pendingItem.status === 'rejected' && <span className='bg-danger p-2 rounded'>Rechazada</span>}
                                    </p>
                                </div>
                            ))}
                        </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
}

export default Result;