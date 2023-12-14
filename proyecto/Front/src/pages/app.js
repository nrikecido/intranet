import Header from "../componentes/fixedbar/header";
import Sidebar from "../componentes/fixedbar/sidebar";
import './app.css'

const ContenidoHeader = (props) => {
    return <>
        <div className="app-container">
            <Sidebar></Sidebar>
            <div className="main-container">
                <Header></Header>
                <div className="main-container">{props.children}</div>
            </div>
        </div>
    </>
}

export default ContenidoHeader;