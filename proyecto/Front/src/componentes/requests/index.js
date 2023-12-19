import Kind from "./bar/kind";
import Data from "./bar/data";
import Holiday from "./requestsTypes/holiday";
import Freeday from './requestsTypes/freeday';
import Other from "./requestsTypes/other";
import Pending from './result/pending';
import Result from './result/results';
import ManageList from "./boss/manageList";
import Manage from "./boss/manage";
import { useState } from "react";

const Sign = () => {

    const [state, setState] = useState({
        module: <Data />
    })

    const updateMain = (module, id) => {

        if (module === 'freeday') {setState({...state, module: <Freeday updateMain={updateMain}/>})}

        if (module === 'holiday') {setState({...state, module: <Holiday updateMain={updateMain}/>})}

        if (module === 'other') {setState({...state, module: <Other />})}

        if (module === 'pending') {setState({...state, module: <Pending />})}

        if (module === 'result') {setState({...state, module: <Result />})}

        if(module === 'manageList') {setState({state, module: <ManageList updateMain={updateMain}/>})}

        if(module === 'manage') {setState({state, module: <Manage id={id}/>})}
    }

    return<>
        <div className="row mt-4">
            <Kind updateMain={updateMain}></Kind>
            {state.module}
        </div>
    </>
}

export default Sign;