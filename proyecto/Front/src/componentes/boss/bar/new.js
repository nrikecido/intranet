
const New = (props) => {
    return <>
    <div className="col-xl-5 suggested">
        <div className="row">
            <div className="col-md-12">
                <div className="card rounded p-3 mb-4 border">
                    <h2 className="card-header">Nuevo empleado</h2>
                    <button className="btn" onClick={()=>props.updateMain('create')}>Dar de alta a nuevo empleado</button>
                </div>
            </div>
        </div>
    </div>
    </>
}

export default New;