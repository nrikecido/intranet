import { useState } from "react";
import api from "../../../../config/api";
import { useNavigate } from "react-router-dom";


const Create = (props) => {
    
    const [state, setState] = useState({
        name: '',
        surname: '',
        mail: '',
        password: ''
    })

    const redirect = useNavigate();

    const [message, setMessage] = useState('')

    const newData = () => {
        
        const obj = {
            name: state.name,
            surname: state.surname,
            mail: state.mail,
            password: state.password
        }

        api.post('/users', obj).then(result =>{
            if (result.status === true) {
                props.updateMain('job', result.ID);
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
                    <button className='btn btn-success mb-2' onClick={()=> newData()}>Crear usuario y completar información</button>
                    {message}
                    <button className='btn btn-success' onClick={()=> redirect('/app/workin/home')}>Cancelar</button>
                </div>
            </div>
        </div>
    </div>
    </>
}

export default Create;
