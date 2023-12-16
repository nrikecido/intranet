import { createContext, useState } from 'react';

const Context = (props) => {

	const [state, setState] = useState({
		status: 'loading',
		user: null
	}); // puedo poner valores por defecto

	return (
		<ContextGlobal.Provider value={[state, setState]}>
			{props.children}
		</ContextGlobal.Provider>
	)
}

export default Context;
export const ContextGlobal = createContext();