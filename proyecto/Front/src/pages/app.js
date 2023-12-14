import Header from "../componentes/fixedbar/header";
import Sidebar from "../componentes/fixedbar/sidebar";

const ContenidoHeader = (props) => {
    return <>
    <div className="row">
        <div className="col-xl-2">
            <Sidebar></Sidebar>
        </div>
        <div className="col-xl">
            <Header></Header>
            <div>{props.children}</div>
        </div>
    </div>
    </>
}

export default ContenidoHeader;