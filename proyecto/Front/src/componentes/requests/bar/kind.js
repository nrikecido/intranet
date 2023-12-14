
const Main = () => {
    return <>
    <div className="col-xl-3 suggested">
            <div className="row">
                <div className="col-md-12">
                    <div className="card rounded p-3 mb-4 border">
                        <h2 className="card-header">TIPO PETICIÓN</h2>
                        <div className="card-body pb-4">
                            <h3>Selecciona una</h3>
                            <div className="mb-3">
                                <button className="btn btn-lg d-block mb-2">Día Libre</button>
                                <button className="btn btn-lg d-block">Vacaciones</button>
                                <button className="btn btn-lg d-block">Otras peticiones</button>
                            </div>
                            <div>
                                <h3>Peticiones hechas</h3>
                                <button className="btn btn-lg d-block mb-2">Pendientes</button>
                                <button className="btn btn-lg d-block">Resueltas</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </>
}

export default Main;