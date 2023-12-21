import { useEffect, useState } from "react";
import api from "../../../../config/api";
import { useNavigate } from "react-router-dom";

const Modify = ({id, updateMain}) => {

    const [state, setState] = useState({
        status: 'loading',
        user: [],
        message: null
    })

    useEffect(()=> {
        api.get('/users/'+id).then(result => {
            setState({...state, status: 'loaded', user: result.data})
        })
    }, [])

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
                    <button className='btn btn-success mb-2' onClick={()=>{ updateUser()}} >Guardar cambios</button>
                    {state.message}
                    <button className='btn btn-success' onClick={()=> updateMain('main')} >Cancelar</button>
                    
                </div>
            </div>
        </div>
    </div>
    </>
}

export default Modify;