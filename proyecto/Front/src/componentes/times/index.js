import { useState } from "react"
import History from "./bar/history";
import See from "./boss/see";

const Home = () => {

    const updateMain = (module, userID) => {
        if (module === 'see') {setState({...state, module: <See userID={userID} updateMain={updateMain}/>})}

        if (module === 'history') {setState({...state, module: <History userID={userID} updateMain={updateMain}/>})}
    }

    const [state, setState] = useState({
        module: <History  updateMain={updateMain}/>,
    })

    return<>
        <div className="row mt-4">
            {state.module}
        </div>
    </>
}

export default Home;