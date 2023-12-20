import { useEffect, useState } from "react";
import api from "../../../config/api";

const See = ({userID, updateMain}) => {

    console.log(userID)

    const [state, setState] = useState({
        status: 'loading',
        signs: []
    })

    useEffect(()=> {
        api.get(`/times/${userID}`).then(result => {
            setState({...state, status: 'loaded', signs: result.data})
        })
    }, [])

    return <>
        <div className="col-xl-5 suggested">
            <div className="row">
                <div className="col-md-12">
                    <div className="card rounded p-3 mb-4 border">
                    {state.signs.length === 0 && <p>No existen fichajes para este usuario</p>}
                    {state.signs.map(signs=> {
                        return <div>
                            <p className="card-header"> Día {signs.creado}: entrada {signs.fecha.split(' ')[1]}, salida {signs.fecha2.split(' ')[1]}, total: {Math.round(signs.total/60)} hora/s</p>
                        </div>
                    })}
                    <button className="btn btn-success" onClick={()=> updateMain('history')}>Volver</button>
                    </div>
                </div>
            </div>
        </div>
    </>

}

export default See;