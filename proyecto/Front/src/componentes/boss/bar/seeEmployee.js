import { useEffect, useState, useContext } from 'react';
import {ContextGlobal} from '../../../config/contextglobal';
import api from '../../../config/api';
import {useNavigate} from 'react-router-dom';


const SeeEmployee = ({id, updateMain}) => {

    const [context, setContext] = useContext(ContextGlobal)

    const [state, setState] = useState({
        status: 'loading',
        data: []
    });

    const redirect = useNavigate();

    useEffect(() => {
        api.get('/users/'+id).then(result => {
            setState({...state, status: 'loaded', data: result.data})
        })
    }, [])

    const [jobState, setJobState] = useState({
        status: 'loading',
        data: []
    })

    useEffect(() => {
        api.get('/jobstate/'+id).then(result => {
            setJobState({...jobState, status: 'loaded', data: result.data})
        })
    }, [])

    const [delUser, setDeleteuser] = useState({
        message: '',
        button: false
    })

    const deleteMessage = () => {
        setDeleteuser({...delUser, message: <p className='bg-danger p-3 rounded text-white'>¿Seguro que quiere eliminar al usuario? Esta accíon no se puede deshacer</p>, button: true})
    }

    const deleteUser = (id) => {
        api.delete('/users/'+id)
        setDeleteuser({...delUser, message: <p>Usuario eliminado</p>, button: false})
        setTimeout(()=> {
            redirect('/app/workin/home')
        }, 3000)
    }

    const rangue = (data) => {
        if(data === 'boss') {
            return <span>Mando</span>
        } else {
            return <span>Peón</span>
        }
    }

    const department = (data) => {
        if(data === 'sell') {
            return <span>Ventas</span>
        } else {
            return <span>Dirección</span>
        }
    }

    const contract = (data) => {
        if (data === 'short') {return <span>Corta duración</span>}
        if (data === 'long') {return <span>Larga duración</span>}
        if (data === 'prove') {return <span>Período de prueba</span>}
        if (data === 'undefined') {return <span>Indefinido</span>}
    }
    
    return <>
    <div className="col-xl-7 suggested">
            <div className="row">
                <div className="col-md-12">
                    <div className="card rounded p-3 mb-4 border">
                        <h2 className="card-header">Datos de empleado</h2>
                        {state.data.map(user=> {
                            return <div className="card-body pb-4">
                                <p className="card-text border-bottom pb-2">Nombre: {user.name}</p>
                                <p className="card-text border-bottom pb-2">Apellidos: {user.surname}</p>
                                <p className="card-text border-bottom pb-2">Correo: {user.mail}</p>
                                <button className='btn btn-success mb-3' onClick={()=> updateMain('modifyUser', user.ID)}>Modificar/completar datos de empleado</button>
                            </div>
                        })}
                        {jobState.data.map(jobState=> {
                            return <div className="card-body pb-4">
                                <p className="card-text border-bottom pb-2">Departamento: {department(jobState.department)}</p>
                                <p className="card-text border-bottom pb-2">Rango: {rangue(jobState.rangue)}</p>
                                <p className="card-text border-bottom pb-2">Antigüedad: {jobState.año}</p>
                                <p className="card-text border-bottom pb-2">Contrato: {contract(jobState.contract)}</p>
                                <button className='btn btn-success mb-3' onClick={()=> updateMain('modifyJob', jobState.userID)}>Modificar/completar datos de relación laboral</button>
                                <button className='btn btn-danger mb-3' onClick={()=> updateMain('main', jobState.userID)}>Atrás</button>
                            </div>
                        })}
                        
                    </div>
                    {state.data.map(user=> {
                    return <div>
                        {delUser.button === false &&<button className='btn btn-danger' onClick={()=> {deleteMessage()}}>Eliminar empleado</button>}
                        {delUser.message}
                        {delUser.button &&<button className='btn btn-danger' onClick={()=> {deleteUser(user.ID)}}>Confirmar eliminar usuario</button>}
                    </div>})}
                </div>
            </div>
        </div>
    </>
}

export default SeeEmployee;