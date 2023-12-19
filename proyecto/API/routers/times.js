const express = require ('express');
const router = express.Router();
const DB = require ('../config/bd');
const utils = require('../config/utils');
const hash = require('../config/password');
const authtoken = require('../config/authtoken');
const knex = require('knex');

// ¿Usuarios del jefe? Se hará más adelante
router.get('/list', async (req, resp) => {

    try{
		const result = await DB.select(['ID', 'userID', 'total', 'created'])
        .select(DB.raw('DATE_FORMAT(enteredDate, "%d-%m-%Y %H:%i:%s") as fecha'))
        .select(DB.raw('DATE_FORMAT(finishedDate, "%d-%m-%Y %H:%i:%s") as fecha2'))
		.from('times')
		
		if (result.length > 0) {
            return resp.status(200).json({ status: true, data: result });
        } else {
            return resp.status(404).json({ status: false, data: result });
        }
	}catch (error){
		console.error(error);
        return resp.status(500).json({ status: false, error: "Error interno del servidor." });
	}
})

// Obtener el propio times
router.get('/self', [authtoken], async (req, resp) => {
    const ID = req.user.ID;
    try{
		const result = await DB.select(['ID', 'userID', 'total', 'created'])
        .select(DB.raw('DATE_FORMAT(enteredDate, "%d-%m-%Y %H:%i:%s") as fecha'))
        .select(DB.raw('DATE_FORMAT(finishedDate, "%d-%m-%Y %H:%i:%s") as fecha2'))
		.from('times')
        .where('userID', ID);
		
		if (result.length > 0) {
            return resp.status(200).json({ status: true, data: result });
        } else {
            return resp.status(404).json({ status: false, data: result, error: 'No hay datos' });
        }
	}catch (error){
		console.error(error);
        return resp.status(500).json({ status: false, error: "Error interno del servidor." });
	}
})

// Obtener perfiles para el jefe
router.get('/:id', async (req, resp) => {
    const userID = req.params.id;
    try{
		const result = await DB.select(['ID', 'userID', 'total', 'created'])
        .select(DB.raw('DATE_FORMAT(enteredDate, "%d-%m-%Y %H:%i:%s") as fecha'))
        .select(DB.raw('DATE_FORMAT(finishedDate, "%d-%m-%Y %H:%i:%s") as fecha2'))
		.from('times')
        .where('userID', userID)
		
		if (result.length > 0) {
            return resp.status(200).json({ status: true, data: result });
        } else {
            return resp.status(404).json({ status: false, data: result });
        }
	}catch (error){
		console.error(error);
        return resp.status(500).json({ status: false, error: "Error interno del servidor." });
	}
})

// Introducir fichaje de inicio
router.post('/start', [authtoken], async (req, resp) => {
    
    const ID = req.user.ID;
    const entry = new Date();

    try {
        // Verificar si ya se registró la salida para la última entrada
        const lastEntry = await DB('times')
            .where('userID', ID)
            .orderBy('enteredDate', 'desc')
            .first();

        if (lastEntry && !lastEntry.finishedDate) {
            return resp.json({ status: false, error: 'Debe registrar la salida antes de una nueva entrada.' });
        }

        // Registrar la nueva entrada
        await DB('times').insert({
            userID: ID,
            enteredDate: entry,
            finishedDate: null, 
            total: 0,
        });

        return resp.json({ status: true, data: "Fichaje de entrada registrado correctamente." });
    } catch (error) {
        console.error('Error al registrar el fichaje de entrada:', error);
        return resp.json({ status: false, error: 'Algo falló' });
    }
});

// Introducir fichaje de finalización y calcular total trabajado
router.post('/finish', [authtoken], async (req, resp) => {
    const ID = req.user.ID;
    const finish = new Date();

    try {
        // Obtener la última entrada para el usuario
        const lastEntry = await DB('times')
            .where('userID', ID)
            .orderBy('enteredDate', 'desc')
            .first();

        if (lastEntry && !lastEntry.finishedDate) {
            // Calcular la diferencia de tiempo en segundos
            const timeDifference = Math.floor((finish - lastEntry.enteredDate) / 1000);

            // Actualizar la salida y el total
            await DB('times')
                .where('userID', ID)
                .andWhere('enteredDate', lastEntry.enteredDate)
                .update({
                    finishedDate: finish,
                    total: timeDifference,
                });

            return resp.json({ status: true, data: "Fichaje de finalización registrado correctamente." });
        } else {
            return resp.json({ status: false, error: 'No se encontró una entrada válida para finalizar.' });
        }
    } catch (error) {
        console.error('Error al registrar el fichaje de finalización:', error);
        return resp.json({ status: false, error: 'Algo falló' });
    }
});

// Obtener fechas individuales
router.post('/:id', [authtoken], async (req, resp) => {

    const ID = req.user.ID;
    const fecha = req.params.id;
    const fechaFinal = fecha.split(' ')[0];
    
    try{
		const result = await DB.select(['ID', 'userID', 'enteredDate', 'finishedDate', 'total', 'created'])
        .select(DB.raw('DATE_FORMAT(enteredDate, "%Y-%m-%d") as fecha'))
		.from('times')
        .where(DB.raw('DATE_FORMAT(enteredDate, "%Y-%m-%d")'), fechaFinal)
        .andWhere('userID', ID)
		
		if (result.length > 0) {
            return resp.status(200).json({ status: true, data: result });
        } else {
            return resp.status(404).json({ status: false, data: result });
        }
        
	}catch (error){
		console.error(error);
        return resp.status(500).json({ status: false, error: "Error interno del servidor." });
	}
})

// Modificar dato (solo el jefe)
router.put('/', async (req, resp) => {

    const ID = req.body.userID;
    const whitelist = ['enteredDate', 'finishedDate'];
    const toEdit = {};

    Object.keys(req.body).forEach(e => {
        if (whitelist.includes(e)) {
            toEdit[e] = req.body[e]
        }
    });

    const result = await DB('times')
        .update(toEdit)
        .where('ID', ID)

    if (result > 0) {
		resp.json({ status: true, message: 'Perfil actualizado correctamente', data: toEdit });
		} else {
		resp.json({ status: false, message: 'Perfil no actualizado', data: toEdit });
	};
});

// Borrar tiempo (solo el jefe también)
router.delete('/', async (req, resp) => {

	const result = await DB('times')
	.delete()
	.where('ID', req.body.userID);

	if(result > 0){
		resp.json({ status: true, message: 'Perfil eliminado correctamente', deletedProfile: req.user});
	} else {
		resp.json({ status: false, message: 'Ha habido algún error' })
	}
});

module.exports = router;