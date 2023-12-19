import React from 'react';
import imagen from '../../media/IMG_20230822_131214.jpg';
import { Link, useNavigate  } from 'react-router-dom';
import { state, useState, useEffect, useContext} from 'react';
import api from '../../config/api';
import { ContextGlobal } from '../../config/contextglobal';


const Sidebar = () => {

    const [context, setContext] = useContext(ContextGlobal);

    const [state, setState] = useState({
        status: 'loading',
        data: []
    });

    const redirect = useNavigate();

    useEffect(() => {
        api.get('/users/self').then(result => {
            setState({...state, status: 'loaded', data: result.data})
        })
    }, [])

    const logout = () => {
        setTimeout(() => {
            api.remove_token('token');
            redirect('/workin')
        }, 3000)
    }

  return (
    <div className="d-flex flex-column flex-shrink-0 p-5 bg-dark text-white rounded">
        <img className="img-fluid rounded-circle p-2 mt-2" style={{ width: "200px" }} src={imagen} alt="profile" />
        <div className="mt-5 p-3">
            <p>{state.data.name} {state.data.surname}</p>
            <p>{state.data.rangue}</p>
            {state &&<p>En línea</p>}
        </div>
        <p class="mt-5 p-3">
            {context.user.rangue === 'boss' &&<p class="pst-group-item d-flex justify-content-between apgn-items-center sd-active">
                <p class="sidebar-item"><Link className='text-white' style={{ textDecoration: 'none' }} to={'/app/workin/boss'}>EMPLEADOS</Link></p>
            </p>}
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
                <button class="btn text-white" onClick={() => logout()}>Cerrar sesión</button>
            </p>
        </p>
    </div>
  );
}

export default Sidebar;
