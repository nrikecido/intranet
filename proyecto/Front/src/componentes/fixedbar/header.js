import React from 'react';

const Header = () => {
  return (
    <div className="container-fluid p-0">
      <div className="d-flex flex-wrap bg-dark p-3 rounded">
        <div className="container-fluid">
          <h1 className="text-white">Company, S.A</h1>
        </div>
        <div className="container-fluid">
          <div className="row text-white">
            <div className="col-md-4"><p>Dirección: Calle Manuel Bolívar, s/n</p></div>
            <div className="col-md-4"><p>Director: Pedro Sánchez</p></div>
            <div className="col-md-4"><p>Teléfono: 654654654</p></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
