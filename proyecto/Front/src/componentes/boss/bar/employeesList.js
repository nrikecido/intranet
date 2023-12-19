import { useEffect, useState, useContext } from 'react';
import api from '../../../config/api';


const Employees = (props) => {
    
    const [state, setState] = useState({
        status: 'loading',
        data: []
    });

    useEffect(() => {
        api.get('/users/list').then(result => {
            setState({...state, status: 'loaded', data: result.data})
        })
    }, [])

    return <>
    <div className="col-xl-7">
        <div className="row">
            <div className="col-md-12">
                <h2 className="card rounded p-3 mb-4 border">Empleados</h2>
                {state.data.map(user => {
                return <div className="card rounded p-3 mb-4 border">
                    <div className="card-body pb-4">
                        <p className="card-text border-bottom pb-2">ID empleado: {user.ID}</p>
                        <p className="card-text border-bottom pb-2">Apellidos y nombre: {user.name} {user.surname} </p>
                        <button className="btn" onClick={() => {props.updateMain('see', user.ID)}}>Ver empleado</button>
                        {user.rangue === null &&<p className='bg-warning p-3 rounded'>Faltan datos por introducir</p>}
                    </div>
                </div>})}
            </div>
        </div>
    </div>
    </>
}

export default Employees;