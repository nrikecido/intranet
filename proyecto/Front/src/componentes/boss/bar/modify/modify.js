import { useEffect, useState } from "react";
import api from "../../../../config/api";
import { useNavigate } from "react-router-dom";

const Modify = ({id}) => {

    const [state, setState] = useState({
        status: 'loading',
        user: [],
        message: null
    })

    const [job, setJobState] = useState({
        status: 'loading',
        job: [],
        message: null
    })

    const redirect = useNavigate();

    const updateUser = () => {

        const obj= {
            name: state.name,
            surname: state.surname,
            mail: state.mail,
            password: state.password
        }

        api.put('/users/'+id, obj).then(result => {
            setState({message: <p className="bg-success p-3 rounded">Usuario actualizado correctamente</p>})
            setTimeout(()=>{
                redirect('/app/workin/home')
            }, 3000)
        })

        const objJob= {
            department: job.department,
            rangue: job.rangue,
            antiquity: job.antiquity,
            contract: job.contract
        }

        api.put('/jobstate/'+id, objJob).then(result => {
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
                            <label className="mb-2 text-muted">Nombre:</label>
                            <input id="name" 
                            type="text"
                            className="form-control" 
                            name="name" 
                            value={state.name}
                            onChange={(e) => setState({ ...state, name: e.target.value })}
                            required />
                        </p>
                        <p className="mb-3">
                            <label className="mb-2 text-muted">Apellidos:</label>
                            <input 
                            id="apellidos" 
                            type="text" 
                            className="form-control" 
                            name="name" 
                            value={state.surname}
                            onChange={(e) => setState({ ...state, surname: e.target.value })}
                            required />
                        </p>
                        <p className="mb-3">
                            <label className="mb-2 text-muted">Correo:</label>
                            <input 
                            id="mail" 
                            type="mail" 
                            className="form-control" 
                            name="name" 
                            value={state.mail}
                            onChange={(e) => setState({ ...state, mail: e.target.value })}
                            required />
                        </p>
                        <p className="mb-3">
                            <label className="mb-2 text-muted">Password:</label>
                            <input 
                            id="mail" 
                            type="mail" 
                            className="form-control" 
                            name="name" 
                            value={state.password}
                            onChange={(e) => setState({ ...state, password: e.target.value })}
                            required />
                        </p>
                    </div>
                    <div className="card-body pb-4">
                        <p className="mb-3">
                            <label className="mb-2 text-muted">Departamento:</label>
                            <select 
                                id="department" 
                                className="form-control"
                                name="department"
                                value={job.department}
                                onChange={(e) => setJobState({ ...job, department: e.target.value })}
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
                            value={job.rangue}
                            onChange={(e) => setJobState({ ...job, rangue: e.target.value })}
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
                            value={job.contract}
                            onChange={(e) => setJobState({ ...job, contract: e.target.value })}
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
                        <button className='btn btn-success mb-2' onClick={()=>{ updateUser()}} >Crear usuario y dar de alta</button>
                        {state.message}
                        <button className='btn btn-success' >Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
}

export default Modify;