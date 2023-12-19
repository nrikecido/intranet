import api from "../config/api";
import { useEffect, useState, state } from 'react';
import {redirect, useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {

    const redirect = useNavigate();

    useEffect(() => {
		const token = localStorage.getItem('token');
		if (token === localStorage.token) {redirect('/app/workin/home');}
	}, []);

    const [state, setState] = useState({
        mail: '',
        password: ''
    });

    const saveData = (field, value) => {
        
        const newState = {...state};
        newState[field] = value;

        setState(newState);
    }

    const canSend = () => {

        return ( state.mail.length > 6 && state.password.length > 6);

    }

    const sendLog = () => {

        const obj = {
            mail: state.mail,
            password: state.password
        }

        api.post('/users/login', obj).then(data => {
            
            if (data.status === true) {
                api.save_token(data.data);
                redirect('/app/workin/home')
            }
        })
    }

    return  <>
	<section className="h-100">
		<div className="container h-100">
			<div className="row justify-content-sm-center h-100">
				<div className="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
					<div className="text-center my-5">
						<h1>EMPRESA</h1>
					</div>
					<div className="card shadow-lg">
						<div className="card-body p-5">
							<h1 className="fs-4 card-title fw-bold mb-4 text-center">LOGIN</h1>
							<div className="needs-validation">
								<div className="mb-3">
									<label className="mb-2 text-muted">Num. de trabajador</label>
									<input 
									id="mail" 
									type="email"
                                    placeholder="Ingresa tu número de trabajador"
									className="form-control" 
									name="mail" 
									value={state.mail}
                                    onChange={(event) => {saveData('mail', event.target.value)}} 
                                    required />
								</div>

								<div className="mb-3">
									<label className="text-muted">Password</label>
									<input 
									id="password" 
									type="password"
                                    placeholder="Ingresa tu contraseña" 
									className="form-control" 
									name="password" 
									value={state.password}
                                    onChange={(event) => {saveData('password', event.target.value)}}
                                    required 
									/>
								</div>
								<div className="d-flex align-items-center">
									<div className="form-check">
										<input type="checkbox" name="remember" id="remember" className="form-check-input" />
										<label className="form-check-label">Recuérdame</label>
									</div>
									<button type="button" className="btn btn-primary ms-auto" onClick={sendLog} disabled={!canSend()}>
										Login
									</button>
								</div>
							</div>
						</div>
						<div className="card-footer py-3 border-0">
							<div className="text-center">
								<p>¿Problemas para iniciar sesión? Llama al equipo IT al: 654654654</p>
							</div>
						</div>
					</div>
					<div className="text-center mt-5 text-muted">
						Copyright 2023 Mi compañía 
					</div>
				</div>
			</div>
		</div>
	</section>
	</>
}

export default Login;