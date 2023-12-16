import React from 'react';
import imagen from '../../media/IMG_20230822_131214.jpg';
import { Link } from 'react-router-dom';
import { state, useState, useEffect} from 'react';
import api from '../../config/api';

const Sidebar = () => {

    const [state, setState] = useState({
        status: 'loading',
        data: []
    });

    useEffect(() => {
        api.get('/users/self').then(result => {
            setState({...state, status: 'loaded', data: result.data})
        })
    }, [])

  return (
    <div className="d-flex flex-column flex-shrink-0 p-5 bg-dark text-white rounded">
        <img className="img-fluid rounded-circle p-2 mt-2" style={{ width: "200px" }} src={imagen} alt="profile" />
        <div className="mt-5 p-3">
            <p>{state.data.name} {state.data.surname}</p>
            <p>{state.data.rangue}</p>
            {state &&<p>En línea</p>}
        </div>
        <p class="mt-5 p-3">
            <p class="pst-group-item d-flex justify-content-between apgn-items-center sd-active">
                <p class="sidebar-item"><Link className='text-white' style={{ textDecoration: 'none' }} to={'/app/workin/home'}>DATOS</Link></p>
            </p>
            <p class="pst-group-item d-flex justify-content-between apgn-items-center sd-active">
                <p class="sidebar-item"><Link className='text-white' style={{ textDecoration: 'none' }} to={'/app/workin/sign'}>FICHAJES</Link></p>
            </p>
            <p class="pst-group-item d-flex justify-content-between apgn-items-center sd-active">
                <p class="sidebar-item"><Link className='text-white' style={{ textDecoration: 'none' }} to={'/app/workin/times'}>TIEMPOS</Link></p>
            </p>
            <p class="pst-group-item d-flex justify-content-between apgn-items-center sd-active">
                <p class="sidebar-item"><Link className='text-white' style={{ textDecoration: 'none' }} to={'/app/workin/requests'}>PETICIONES</Link></p>
            </p>
            <p class="pst-group-item d-flex justify-content-between apgn-items-center sd-active">
                <p class="sidebar-item"><Link className='text-white' style={{ textDecoration: 'none' }} to={'/app/workin/enterprise'}>EMPRESA</Link></p>
            </p>
            <p class="pst-group-item d-flex justify-content-between apgn-items-center sd-active">
                <p class="sidebar-item">Cerrar sesión</p>
            </p>
        </p>
    </div>
  );
}

export default Sidebar;
