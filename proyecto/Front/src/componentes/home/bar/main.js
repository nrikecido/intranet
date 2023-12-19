import { useEffect, useState, useContext } from 'react';
import {ContextGlobal} from '../../../config/contextglobal';
import api from '../../../config/api';
import { useNavigate} from 'react-router-dom';

const Main = () => {

    const [context, setContext] = useContext(ContextGlobal)

    const [state, setState] = useState({
        status: 'loading',
        data: []
    });

    useEffect(() => {
        api.get('/jobstate/self').then(result => {
            setState({...state, status: 'loaded', data: result.data})
        })
    }, [])

    const [request, setRequest] = useState({
        status: 'pending',
        requests: []
    })

    useEffect(()=>{
        api.get('/requests/list').then(result =>{
            setRequest({...request, status: 'loaded', requests: result.data})
        })
    }, [])

    const isBoss = state.data.rangue === 'boss';

    console.log(isBoss)

    const redirect = useNavigate();

    const pending = request.requests && request.requests.some((req) => req.status === 'pending')

    return <>
    <div className="col-xl-7 suggested">
        <div className="row">
            <div className="col-md-12">
                <div className="card rounded p-3 mb-4 border">
                    <h2 className="card-header">Datos generales</h2>
                    <div className="card-body pb-4">
                        <p className="card-text border-bottom pb-2">Nombre: {context.user.name}</p>
                        <p className="card-text border-bottom pb-2">Apellidos: {context.user.surname}</p>
                        <p className="card-text border-bottom pb-2">Correo: {context.user.mail}</p>
                        <p className="card-text border-bottom pb-2">Departamento: {state.data?.department}</p>
                        <p className="card-text border-bottom pb-2">Rango: {state.data?.rangue}</p>
                        <p className="card-text border-bottom pb-2">Antigüedad: {state.data?.antiquity} año</p>
                        <button className="btn">Nóminas: Ir a nóminas</button>
                        {pending && isBoss &&<button className='btn btn-danger p-3 rounded' onClick={()=> redirect('/app/workin/requests')}>Tienes peticiones pendientes</button>}
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
}

export default Main;