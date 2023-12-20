import {useState} from 'react';
import api from '../../../../config/api';
import { useNavigate } from "react-router-dom";

const Job = ({id}) => {

    const [state, setState] = useState({
        department: '',
        rangue: '',
        contract: ''
    })

    const redirect = useNavigate();

    const [message, setMessage] = useState('')

    const success = () => {
        setMessage(<p className="bg-success p-3 rounded">Registro creado para el usuario</p>)
        setTimeout(()=>{
            redirect('/app/workin/home')
        }, 3000)
    }

    const send = ()=> {

        const obj = {
            department: state.department,
            rangue: state.rangue,
            antiquity: state.antiquity,
            contract: state.contract
        }
    
        api.post(`/jobstate/${id[0]}`, obj).then(result =>{
            if (result.status === true) {
                success();
            } else {
               setMessage(<p>Algo salió mal</p>)
            }
        })
    }

    return <>
        <div className="col-xl-7 suggested">
            <div className="row">
                <div className="col-md-12">
                    <div className="card rounded p-3 mb-4 border">
                        <h2 className="card-header">Datos de empleado</h2>
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
                                    {/* Agrega más opciones según tus necesidades */}
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
                                <label className="mb-2 text-muted">Fecha inicio contrato:</label>
                                <input id="rango" 
                                type="date" 
                                className="form-control" 
                                name="rango" 
                                value={state.antiquity}
                                onChange={(e) => setState({ ...state, antiquity: e.target.value })}
                                required
                                >
                                </input>
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
                        <button className='btn btn-success mb-2' onClick={()=>send()} >Crear usuario y dar de alta</button>
                        {message}
                        <button className='btn btn-success' >Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
</>
}
                    
export default Job;