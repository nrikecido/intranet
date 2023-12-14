import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const History = () => {
  const [date, setDate] = useState(new Date());

  const onChange = (newDate) => {
    setDate(newDate);
  };

  return <>
    <div className="col-xl-7">
        <div className="row">
            <div className="col-md-12">
                <div className="card rounded p-3 mb-4 border">
                    <h2 className="card-header">Calendario</h2>
                    <div className='row'>
                        <Calendar className='col-md-6' onChange={onChange} value={date} />
                        <div className='col-md-6'>
                            <h3>Selecciona un día para obtener el registro de fichajes</h3>
                            <p className='p-2'>Día seleccionado: 14-10-2023</p>
                            <div>
                                <h4>Registro de fichaje</h4>
                                <div className='p-2'>
                                    <p className="card-text border-bottom pb-2">Fichaje de entrada: 14:20</p>
                                    <p className="card-text border-bottom pb-2">Fichaje de salida: 22:00</p>
                                    <p className="card-text border-bottom pb-2">Total descanso en minutos: 14</p>
                                    <p className="card-text border-bottom pb-2">Total trabajado en horas: 7:40</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>;
};

export default History;
