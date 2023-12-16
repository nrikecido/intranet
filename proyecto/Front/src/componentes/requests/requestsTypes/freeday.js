import React, { useState, useContext } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import api from '../../../config/api';
import {ContextGlobal} from '../../../config/contextglobal';
import {useNavigate} from 'react-router-dom';

const Freeday = () => {

    const [context, setContext] = useContext(ContextGlobal);

    const [state, setState] = useState({
        userID: context.user.ID,
        requestType: 'freeday',
        startDate: '',
        finishDate: '',
        comments: ''
    })

    const redirect = useNavigate();

    const [message, setMessage] = useState('');

    const sendRequest = () => {

        const requestData = {
            userID: state.userID,
            requestType: state.requestType,
            startDate: state.startDate,
            finishDate: state.finishDate,
            comments: state.comments
        };

        if (Object.values(requestData).some(value => value === undefined || value === '')) {
            console.log('nada')
        } else {
            api.post('/requests', requestData).then(() => {
                setMessage('Registrado correctamente.')
                setTimeout(() => {
                    redirect('/app/workin/home')
                }, 3000)
            })
        }
    }

    const [dateRangue, setDateRangue] = useState({
        startDate: null,
        endDate: null
    })

    const today = new Date();

    const onChange = (newDate) => {
        if (!dateRangue.startDate || dateRangue.startDate < today) {
            setDateRangue({startDate: newDate, endDate: null})
            setState({ ...state, startDate: fecha(newDate) });
        } else {
            if (newDate >= dateRangue.startDate) {
                setDateRangue({...dateRangue, endDate: newDate})
                setState({ ...state, finishDate: fecha(newDate) });
            } else {
                setDateRangue({startDate: newDate, endDate: null})
                setState({ ...state, startDate: fecha(newDate), finishDate: '' });
            }
        }
    }

    const fecha = (date) => {
        if (date){
        const day = date.getDate();
        const month = date.getMonth() +1;
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
        }
        return "";
    }

    const difDate = () => {
        if (dateRangue.startDate && dateRangue.endDate) {
            const oneDay = 24 * 60 * 60 * 1000;
            const startDate = new Date (dateRangue.startDate);
            const endDate = new Date (dateRangue.endDate);
            const diff = Math.round(Math.abs((startDate - endDate) / oneDay))
            return diff
        }
    }

    return <>
        <div className="col-xl-8">
            <div className="row">
                <div className="col-md-12">
                    <div className="card rounded p-3 mb-4 border">
                        <h2 className="card-header">Realizar petición de día/s libre/s: </h2>
                        <div className='row'>
                            <Calendar className='col-md-6' onChange={onChange}></Calendar>
                            <div className='col-md-6'>
                                <p>Día de inicio: {!dateRangue.startDate && <p className='bg-success p-2 rounded'>Selecciona fecha de inicio</p>}
                                    <input
                                    type="text"
                                    className="form-control rounded-input"
                                    id="startDate"
                                    value={state.startDate}
                                    onChange={(e) => setState({ ...state, startDate: e.target.value })}
                                    >
                                    </input>
                                 </p>
                                <p>Día de finalización: {dateRangue.startDate && !dateRangue.endDate &&<p className='bg-success p-2 rounded'>Ahora selecciona fecha final</p>}
                                    <input
                                    type="text"
                                    className="form-control rounded-input"
                                    id="finishDate"
                                    value={state.finishDate}
                                    onChange={(e) => setState({ ...state, finishDate: e.target.value })}
                                    >
                                    </input>
                                </p>
                                <p>Días totales: {difDate()}</p>
                                <p>Motivo: {dateRangue.startDate && dateRangue.endDate &&<p className='bg-success p-2 rounded' type="text">Ahora introduce el motivo</p>}</p>
                                {dateRangue.startDate && dateRangue.endDate && 
                                <textarea 
                                rows={4}
                                className="form-control rounded-input"
                                id='comments'
                                value={state.comments}
                                onChange={(e) => setState({...state, comments: e.target.value})}
                                ></textarea>}
                                <button className='btn' onClick={sendRequest}>Aceptar y enviar</button>
                            </div> {message}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Freeday;