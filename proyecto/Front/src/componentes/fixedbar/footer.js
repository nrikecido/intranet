import api from '../../config/api';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Footer = ({id}) => {

    const redirect = useNavigate();

    const See = () => {
        if(id) {
            redirect('app')
        }
    }

    return<>
    <div className="container p-2">
        <button className='btn' title='¡Apúntate!' onClick={()=> show(id)}>Ver empleado</button>
    </div>
    </> 
}

export default Footer;