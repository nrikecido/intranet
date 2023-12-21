import { useState } from "react";
import EmployeesList from "./bar/employeesList";
import New from './bar/new';
import SeeEmployee from "./bar/seeEmployee";
import Create from './bar/new/create';
import Job from "./bar/new/job";
import Modify from "./bar/modify/modify";
import ModifyJob from "./bar/modify/modifyjob";

const Boss = () => {

    const updateMain = (module, userID) => {

        if (module === 'create') {setState({...state, module: <Create updateMain={updateMain}/>, showNew: false})}

        if (module === 'main') {setState({...state, module: <EmployeesList updateMain={updateMain}/>})}

        if (module === 'see') {setState({...state, module: <SeeEmployee updateMain={updateMain} id={userID}/>})}

        if (module === 'job') {setState({...state, module: <Job id={userID}/>})}

        if (module === 'modifyUser') {setState({...state, module: <Modify updateMain={updateMain} id={userID}/>, showNew: false})}

        if (module === 'modifyJob') {setState({...state, module: <ModifyJob updateMain={updateMain} id={userID}/>, showNew: false})}
    }

    const [state, setState] = useState({
        module: <EmployeesList updateMain={updateMain}/>,
        showNew: true
    });

    return<>
        <div className="row mt-4">
            {state.module}
            {state.showNew &&<New updateMain={updateMain}></New>}
        </div>
    </>
}

export default Boss;