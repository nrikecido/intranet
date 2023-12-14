import React from 'react';
import imagen from '../../media/IMG_20230822_131214.jpg';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="d-flex flex-column flex-shrink-0 p-5 bg-dark text-white rounded">
        <img className="img-fluid rounded-circle p-2 mt-2" style={{ width: "200px" }} src={imagen} alt="profile" />
        <div className="mt-5 p-3">
            <p>Enrique Juguera</p>
            <p>Trabajador</p>
            <p>En línea</p>
        </div>
        <p class="mt-5 p-3">
            <p class="pst-group-item d-flex justify-content-between apgn-items-center sd-active">
                <p class="sidebar-item"><Link to={'/app/workin'}>DATOS</Link></p>
            </p>
            <p class="pst-group-item d-flex justify-content-between apgn-items-center sd-active">
                <p class="sidebar-item"><Link to={'/app/workin/sign'}>FICHAJES</Link></p>
            </p>
            <p class="pst-group-item d-flex justify-content-between apgn-items-center sd-active">
                <p class="sidebar-item"><Link to={'/app/workin/times'}>TIEMPOS</Link></p>
            </p>
            <p class="pst-group-item d-flex justify-content-between apgn-items-center sd-active">
                <p class="sidebar-item"><Link to={'/app/workin/requests'}>PETICIONES</Link></p>
            </p>
            <p class="pst-group-item d-flex justify-content-between apgn-items-center sd-active">
                <p class="sidebar-item">EMPRESA</p>
            </p>
            <p class="pst-group-item d-flex justify-content-between apgn-items-center sd-active">
                <p class="sidebar-item">Cerrar sesión</p>
            </p>
        </p>
    </div>
  );
}

export default Sidebar;
