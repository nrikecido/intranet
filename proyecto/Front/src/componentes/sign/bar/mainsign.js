
const Main = () => {
    return <>
    <div className="col-xl-7 suggested">
            <div className="row">
                <div className="col-md-12">
                    <div className="card rounded p-3 mb-4 border">
                        <h2 className="card-header">FICHAR</h2>
                        <div className="card-body pb-4">
                            <div className="mb-3">
                                <h3>Fichajes de jornada</h3>
                                <button className="btn btn-success btn-lg d-block mb-2">Inicio Jornada</button>
                                <button className="btn btn-danger btn-lg d-block">Fin Jornada</button>
                            </div>
                            <div>
                                <h3>Fichajes de descanso</h3>
                                <button className="btn btn-success btn-lg d-block mb-2">Inicio Descanso</button>
                                <button className="btn btn-danger btn-lg d-block">Fin Descanso</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </>
}

export default Main;