const Other = () => {
    return <>
        <div className="col-xl-8">
            <div className="row">
                <div className="col-md-12">
                    <div className="card rounded p-3 mb-4 border">
                        <h2 className="card-header">Otras peticiones</h2>
                        <div className="card-body pb-4">
                            <div className="mb-3">
                                <h3>Selecciona la opción que más se ajusta a tu petición:</h3>
                                <button className="btn btn-lg d-block mb-2">Modificar datos personales</button>
                                <button className="btn btn-lg d-block mb-2">Modificar día de vacaciones o día libre</button>
                                <button className="btn btn-lg d-block mb-2">Solicitar reunión con superior jerárquico</button>
                                <button className="btn btn-lg d-block mb-2">Otros</button>
                                <button className="btn btn-success btn-lg d-block mb-2">Aceptar y enviar</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </>
}

export default Other;