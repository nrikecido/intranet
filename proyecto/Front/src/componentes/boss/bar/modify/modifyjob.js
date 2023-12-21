import { useEffect, useState } from "react";
import api from "../../../../config/api";
import { useNavigate } from "react-router-dom";

const ModifyJob = ({id, updateMain}) => {

    const [state, setState] = useState({
        status: 'loading',
        user: [],
        message: null
    })

    useEffect(()=> {
        api.get('/jobstate/'+id).then(result => {
            setState({...state, status: 'loaded', user: result.data})
        })
    }, [])

    const redirect = useNavigate();

    const updateUser = () => {

        const obj= {
            department: state.department,
            rangue: state.rangue,
            antiquity: state.antiquity,
            contract: state.contract
        }

        api.put('/jobstate/'+id, obj).then(result => {
            setState({message: <p className="bg-success p-3 rounded">Usuario actualizado correctamente</p>})
            setTimeout(()=>{
                redirect('/app/workin/home')
            }, 3000)
        })
    }

    return <>
    <div className="col-xl-7 suggested">
        <div className="row">
            <div className="col-md-12">
                <div className="card rounded p-3 mb-4 border">
                    <h2 className="card-header">Modificar datos de empleado</h2>
                    <div className="card-body pb-4">
                        <p className="mb-3">
                            <label className="mb-2 text-muted">Departamento:</label>
                            <select 
                                id="department" 
                                className="form-control"
                                name="department"
                                value={state.department}
                                onChange={(e) => setState({ ...state, department: e.target.value })}
                                required
                            >
                                <option value="">Selecciona un departamento</option>
                                <option value="trasport">Transporte</option>
                                <option value="sell">Ventas</option>
                            </select>
                        </p>
                        <p className="mb-3">
                            <label className="mb-2 text-muted">Rango:</label>
                            <select id="rango" 
                            type="text" 
                            className="form-control" 
                            name="rango" 
                            value={state.rangue}
                            onChange={(e) => setState({ ...state, rangue: e.target.value })}
                            required
                            >
                                <option value="">Selecciona un rango</option>
                                <option value="worker">Peón</option>
                                <option value="boss">Mando</option>
                                {/* Agrega más opciones según tus necesidades */}
                            </select>
                        </p>
                        <p className="mb-3">
                            <label className="mb-2 text-muted">Contrato:</label>
                            <select id="contrato" 
                            type="text" 
                            className="form-control" 
                            name="contrato" 
                            value={state.contract}
                            onChange={(e) => setState({ ...state, contract: e.target.value })}
                            required
                            >
                                <option value="">Selecciona un contrato</option>
                                <option value="undefined">Indefinido</option>
                                <option value="short">Duración determinada</option>
                                <option value="long">Larga duración</option>
                                <option value="prove">Período de prueba</option>
                                {/* Agrega más opciones según tus necesidades */}
                            </select>
                        </p>
                    </div>
                    <div className="card rounded p-3 mb-4">
                        <button className='btn btn-success mb-2' onClick={()=>{ updateUser()}} >Guardar cambios</button>
                        {state.message}
                        <button className='btn btn-success' onClick={()=> updateMain('main')} >Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
}

export default ModifyJob;