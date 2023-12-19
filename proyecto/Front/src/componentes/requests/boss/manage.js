import { useEffect, useState } from "react";
import api from "../../../config/api";
import { useNavigate } from "react-router-dom";

const Manage = ({id}) => {

    const [state, setState] = useState({
        status: 'loading',
        requests: []
    });

    const redirect = useNavigate();

    useEffect(()=>{
        api.get(`/requests/${id}`).then(result=> {
            setState({...state, status: 'loaded', requests: result.data})
        })
    }, [])

    const [message, setMessage] = useState('')

    const [manage, setManage] = useState({
        option: 'pending'
    })

    const sendManage = (requestID) => {

        const obj = {
            status: manage.option,
        };

        api.put(`/requests/${requestID}`, obj).then((result) => {
            if (result.status === true) {
                setMessage(<p>La solicitud ha sido gestionada correctamente</p>)
                setTimeout(() => {
                    redirect('/app/workin/home')
                }, 3000);
            } else {
                setMessage(<p>Ha habido algún error. Inténtalo de nuevo</p>)
            }
        });
    }

    return (
        <>
          <div className="col-xl-5">
            <div className="row">
              <div className="col-md-12">
                <div className="card rounded p-3 mb-4 border">
                  <h2 className="card-header">Gestión de peticiones pendientes</h2>
                  {state.requests.map((request) => {
                    return (
                        <div className="mb-3 card-body border" key={request.ID}>
                            <p className="mb-2">
                            Nombre y apellidos: {request.name} {request.surname}
                            </p>
                            <p className="mb-2">Fecha petición: {request.created}</p>
                            <p className="mb-2">
                            Fechas solicitadas: del {request.fecha} al {request.fecha2}
                            </p>
                            <p className="mb-2">Motivo: {request.comments}</p>
                            <select
                            id="option"
                            className="form-control"
                            name="option"
                            value={manage.option}
                            onChange={(e) => setManage({ ...manage, option: e.target.value })}
                            required
                            >
                            <option value="pending">Elija una</option>
                            <option value="approved">Aprobar</option>
                            <option value="rejected">Rechazar</option>
                            </select>
                            <button
                            className="btn btn-danger"
                            onClick={() => sendManage(request.ID)}
                            >
                            Enviar Gestión
                            </button>
                        </div>
                    );
                  })}
                  {message}
                </div>
              </div>
            </div>
          </div>
        </>
      );
}

export default Manage;