import Header from "../componentes/fixedbar/header";
import Sidebar from "../componentes/fixedbar/sidebar";
import { useContext, useEffect } from 'react';
import { ContextGlobal } from '../config/contextglobal';
import API from '../config/api';
import { useNavigate } from 'react-router-dom';

const ContenidoHeader = (props) => {

    const [context, setContext] = useContext(ContextGlobal);
	
	const navigate = useNavigate();

	useEffect(()=>{

		API.get('/users/self').then(d=>{
			if(d.status === true){
				setContext({...context, status: "loaded", user: d.data})
			}else{
				navigate('/workin');
				// setContext({...context, status: "loaded"});		
			}
		})

	}, []);

	if(context.status === 'loading'){
		return <div>Loading...</div>
	}

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