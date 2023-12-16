import api from "../../../config/api";
import { useState, useEffect} from 'react';

const Signs = () => {

    const [state, setState] = useState({
        status: 'loading',
        sign: []
    })

    useEffect(()=> {
        api.get('/times/self').then(result =>{
            setState({...state, status: 'loaded', sign: result.data})
        })
    }, [])

    const totalSuma = state.sign && state.sign.length > 0 ? state.sign[0].totalSuma : 0;

    const lastThreeSigns = state.sign.slice(Math.max(state.sign.length - 3, 0));

    const renderedSigns = lastThreeSigns.map(sign => (
        <div className="card" key={sign.ID}>
          <p className="card-text border-bottom pb-2">Fecha: {sign.enteredDate.split('T')[0]}</p>
          <p className="card-text border-bottom pb-2">Hora de entrada: {sign.enteredDate.split('T')[1]}</p>
          <p className="card-text border-bottom pb-2">Hora de salida: {sign.finishedDate?.split('T')[1]}</p>
          <p className="card-text border-bottom pb-2">Total trabajado: {sign.total} horas</p>
        </div>
    ));

    return <>
        <div className="col-xl-5 suggested">
            <div className="row">
                <div className="col-md-12">
                    <div className="card rounded p-3 mb-4 border">
                        <h2 className="card-header">Registro de fichajes recientes</h2>
                        {renderedSigns}
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="card rounded p-3 mb-4 border">
                        <h2 className="card-header">Total semana</h2>
                        <p className="card-text border-bottom pb-2">{totalSuma} horas</p>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Signs;