import { useState } from 'react';
import api from '../../../config/api';

const Main = () => {

  const [state, setState] = useState({
    content: '',
    fichajeType: '',
    message: ''
  });

  const showMessage = (message) => {
    setState({...state, message})
    setTimeout(() => {
      setState({...state, message: ''});
    }, 3000)
  }

  const saveData = (field, value) => {
    setState({ ...state, [field]: value });
  }

  const sendSign = () => {
    const obj = {
    content: state.content,
  };

  api.post(`/times/${state.fichajeType}`, obj).then(result => {
    if (result.status === true) {
      showMessage('Fichaje de ' +state.fichajeType + ' correcto')
    }
    });
  }

  const handleFichajeClick = (tipo) => {
    saveData('fichajeType', tipo);
    sendSign();
  }

  return (
    <div className="col-xl-7 suggested">
      <div className="row">
        <div className="col-md-12">
          <div className="card rounded p-3 mb-4 border">
            <h2 className="card-header">FICHAR</h2>
            <div className="card-body pb-4">
              <div className="mb-3">
                <h3>Fichajes de jornada</h3>
                <button
                  className="btn btn-success btn-lg d-block mb-2"
                  onClick={() => handleFichajeClick('start')}
                >
                  Inicio Jornada
                </button>
                <button
                  className="btn btn-danger btn-lg d-block"
                  onClick={() => handleFichajeClick('finish')}
                >
                  Fin Jornada
                </button>
                {state.message&&<p className='bg-success rounded p-3'>{state.message}</p>}
              </div>
              <div>
                <h3>Fichajes de descanso</h3>
                <button
                  className="btn btn-success btn-lg d-block mb-2"
                  onClick={() => handleFichajeClick('breakStart')}
                >
                  Inicio Descanso
                </button>
                <button
                  className="btn btn-danger btn-lg d-block"
                  onClick={() => handleFichajeClick('breakFinish')}
                >
                  Fin Descanso
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
