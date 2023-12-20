import React, { useContext, useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import api from '../../../config/api';
import { ContextGlobal } from '../../../config/contextglobal';

const History = ({updateMain}) => {

    const [context, setContext] = useContext(ContextGlobal);

    const isBoss = context.user.rangue === 'boss';

    const [date, setDate] = useState(new Date());

    const onChange = (newDate) => {
        setDate(newDate);
    };

    const fecha = (date) => {
        const day = date.getDate();
        const month = date.getMonth() +1;
        const year = date.getFullYear();
        return year+ '-' +month+'-'+day;
    }

    const [state, setState] = useState({
        status: 'loading',
        data: null
    })

    const sendData = async selectedDate => {
        try {
          const formattedDate = fecha(selectedDate);
          const result = await api.post('/times/' + formattedDate);
          setState({ ...state, status: 'Hay datos', data: result.data[0] });
        } catch (error) {
          console.error('Error fetching data:', error);
          setState({ ...state, status: 'No hay datos', message: 'No hay registros para ese día' });
        }
    };

    useEffect(() => {
        sendData(date)
    }, [date]);

    const [userState, setUserState] = useState({
        status: 'loading',
        users: []
    })

    useEffect(()=> {
        api.get('/users/list').then(result => {
            setUserState({...userState, status: 'loaded', users: result.data})
        })
    }, [])

    return <>
    <div className="col-xl-7">
        <div className="row">
            <div className="col-md-12">
                <div className="card rounded p-3 mb-4 border">
                    <h2 className="card-header">Calendario</h2>
                    <div className='row'>
                        <Calendar className='col-md-6' onChange={onChange}/>
                        <div className='col-md-6'>
                            <h3>Selecciona un día para obtener el registro de fichajes</h3>
                            {date &&<p className='p-2'>Fecha seleccionada: {fecha(date)}</p>}
                            {state.data &&<div>
                                <h4>Registro de fichaje</h4>
                                <div className='p-2'>
                                    <p className="card-text border-bottom pb-2">Fichaje de entrada: {state.data.enteredDate.split('T')[1]}</p>
                                    <p className="card-text border-bottom pb-2">Fichaje de salida: {state.data.finishedDate.split('T')[1]}</p>
                                    <p className="card-text border-bottom pb-2">Total descanso en minutos: </p>
                                    <p className="card-text border-bottom pb-2">Total trabajado en horas: {state.data.total}</p>
                                </div>
                            </div>}
                            {!state.data && <p>No hay registros para ese día</p>}
                        </div>
                    </div>
                </div>
                {isBoss && 
                    <div className="card rounded p-3 mb-4 border">
                        <p>Ver fichajes de empleados</p>
                        <div className='row'>
                            <div>
                                <h4>Selecciona uno</h4>
                                <select
                                className="form-select"
                                onChange={(e)=> updateMain('see', e.target.value)}
                                >
                                <option value="">Selecciona un empleado</option>
                                {userState.users.map((user) => (
                                    <option key={user.ID} value={user.ID}>
                                    {user.ID} {user.name} {user.surname}
                                    </option>
                                ))}
                                </select>
                            </div>
                        </div>
                    </div>
                }

            </div>
        </div>
    </div>
    </>;
};

export default History;
