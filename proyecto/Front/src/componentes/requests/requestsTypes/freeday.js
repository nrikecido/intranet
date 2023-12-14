import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Freeday = () => {
    return <>
        <div className="col-xl-8">
            <div className="row">
                <div className="col-md-12">
                    <div className="card rounded p-3 mb-4 border">
                        <h2 className="card-header">Realizar petición de día/s libre/s</h2>
                        <div className='row'>
                            <Calendar className='col-md-6'></Calendar>
                            <div className='col-md-6'>
                                <h3>Días seleccionados</h3>
                                <p>Día de inicio:</p>
                                <p>Día de finalización:</p>
                                <p>Días totales:</p>
                                <p>Motivo:</p>
                                <button className='btn'>Aceptar y enviar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Freeday;