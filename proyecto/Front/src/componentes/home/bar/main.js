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

    const redirect = useNavigate();

    const isBoss = state.data.rangue === 'boss';

    const antiqui = Math.round((new Date() - new Date(state.data.antiquity)) / (1000 * 60 * 60 * 24) / 365);

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
                        <p className="card-text border-bottom pb-2">Departamento: {state.data?.department === 'manage' &&<span>Dirección</span>}</p>
                        <p className="card-text border-bottom pb-2">Rango: {state.data?.rangue === 'boss' && <span>Mando</span>}</p>
                        <p className="card-text border-bottom pb-2">Antigüedad: {antiqui} año/s, desde {state.data.start} </p>
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