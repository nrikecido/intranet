import { useEffect, useState } from "react";
import api from "../../../config/api";

const ManageList = (props) => {

  console.log(props)

  const [state, setState] = useState({
    status: "loading",
    requests: [],
  });

  useEffect(() => {
    api.get("/requests/list").then((result) => {
      setState({ ...state, status: "loaded", requests: result.data });
    });
  }, []);

  const pending = state.requests.filter((req) => req.status === 'pending');

  return (
    <>
      <div className="col-xl-5">
        <div className="row">
          <div className="col-md-12">
            <div className="card rounded p-3 mb-4 border">
              <h2 className="card-header">Gestión de peticiones pendientes</h2>
              <div className="card-body pb-4">
                {pending.length === 0 && <p>No tienes peticiones pendientes</p>}
                {pending.map((request) => {
                  return (
                    <div className="mb-3 card-body border" key={request.ID}>
                      <p className="mb-2">
                        Nombre y apellidos: {request.name} {request.surname}
                      </p>
                      <p className="mb-2">Fecha petición: {request.creado}</p>
                      <p className="mb-2">
                        Fechas solicitadas: del {request.enterDate} al {request.enterDate2}
                      </p>
                      <p className="mb-2">Motivo: {request.comments}</p>
                      <button className="btn btn-primary" onClick={()=> props.updateMain('manage', request.ID)}>Gestionar</button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageList;
