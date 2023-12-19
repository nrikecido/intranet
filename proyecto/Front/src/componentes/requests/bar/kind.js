import api from "../../../config/api";
import {useState, useEffect} from 'react';

const Main = (props) => {

    const [state, setState] = useState({
        status: 'loading',
        user: []
    })

    useEffect(()=>{
        api.get('/users/self'). then(result =>{
            setState({...state, status: 'loaded', user: result.data})
        })
    }, [])

    const isBoss = state.user.rangue === 'boss';

    return <>
    <div className="col-xl-3 suggested">
        <div className="row">
            <div className="col-md-12">
                <div className="card rounded p-3 mb-4 border">
                    <h2 className="card-header">TIPO PETICIÓN</h2>
                    <div className="card-body pb-4">
                        <h3>Selecciona una</h3>
                        <div className="mb-3">
                            <button className="btn btn-lg d-block mb-2" onClick={() => {props.updateMain('freeday')}}>Día Libre</button>
                            <button className="btn btn-lg d-block mb-2" onClick={() => {props.updateMain('holiday')}}>Vacaciones</button>
                            <button className="btn btn-lg d-block mb-2" onClick={() => {props.updateMain('other')}}>Otras peticiones</button>
                        </div>
                        <div className="mb-3">
                            <h3>Peticiones hechas</h3>
                            <button className="btn btn-lg d-block mb-2" onClick={() => {props.updateMain('pending')}}>Pendientes</button>
                            <button className="btn btn-lg d-block" onClick={() => {props.updateMain('result')}}>Resueltas</button>
                        </div>
                        {isBoss &&<div className="mb-3">
                            <h3>Gestionar peticiones</h3>
                            <button className="btn btn-lg d-block mb-2" onClick={() => {props.updateMain('manageList')}}>Pendientes</button>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
}

export default Main;