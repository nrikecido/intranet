const express = require ('express');
const router = express.Router();
const DB = require ('../config/bd');
const utils = require('../config/utils');
const hash = require('../config/password');
const authtoken = require('../config/authtoken');
const { group } = require('console');

// ¿Usuarios del jefe? Se hará más adelante
router.get('/list', async (req, resp) => {

    try{
		const result = await DB.select(['holidays.ID', 'holidays.userID', 'holidays.enjoyed', 'holidays.available', DB.raw('DATEDIFF(CURDATE(), jobstate.antiquity) as daysWorked')])
		.from('holidays')
        .join('jobstate', 'holidays.userID', '=', 'jobstate.userID')
        .select(DB.raw('DATE_FORMAT(jobstate.antiquity, "%d-%m-%Y") as año'))
        .groupBy('userID')
		
		if (result.length > 0) {
            return resp.status(200).json({ status: true, data: result });
        } else {
            return resp.status(404).json({ status: false, data: [] });
        }

	}catch (error){
		console.error(error);
        return resp.status(500).json({ status: false, error: "Error interno del servidor." });
	}
})

// Obtener el propio holidays
router.get('/self', [authtoken], async (req, resp) => {
    const ID = req.user.ID;
    try{
		const result = await DB.select(['ID', 'userID', 'enjoyed', 'available'])
		.from('holidays')
        .where('ID', ID)
		
		if (result.length > 0) {
            return resp.status(200).json({ status: true, data: result });
        } else {
            return resp.status(404).json({ status: false, data: [] });
        }
	}catch (error){
		console.error(error);
        return resp.status(500).json({ status: false, error: "Error interno del servidor." });
	}
})

// Obtener perfiles para el jefe
router.get('/:id', async (req, resp) => {
    const ID = req.params.id;
    try{
		const result = await DB.select(['ID', 'userID', 'enjoyed', 'available'])
		.from('holidays')
        .where('userID', ID)
		
		if (result.length > 0) {
            return resp.status(200).json({ status: true, data: result });
        } else {
            return resp.status(404).json({ status: false, data: [] });
        }
	}catch (error){
		console.error(error);
        return resp.status(500).json({ status: false, error: "Error interno del servidor." });
	}
})

// Introducir datos (solo el jefe)
router.post('/', async (req, resp) => {

    try{
		const result = await DB('holidays').insert({
            userID: req.body.userID,
            enjoyed: req.body.enjoyed,
            available: req.body.available
        })
		
        return resp.json({ status: true, data: "Datos introducidos correctamente" });
	} catch (error) {
	  console.error('Error al crear un nuevo usuario:', error);
  
	  return resp.json({ status: false, error: 'Algo falló' });
	}
})

router.put('/', async (req, resp) => {

    try {
    const ID = req.body.userID;
    const whitelist = ['userID', 'enjoyed', 'available'];
    const toEdit = {};

    Object.keys(req.body).forEach(e => {
        if (whitelist.includes(e)) {
            toEdit[e] = req.body[e]
        }
    });

    const result = await DB('holidays')
        .update(toEdit)
        .where('userID', ID)

    if (result > 0) {
		return resp.status(200).json({ status: true, message: 'Entrada actualizada correctamente', data: toEdit });
		} else {
		return resp.status(404)({ status: false, message: 'Entrada no actualizada', data: [] });
	};
    } catch (error) {
        console.error('Error al crear un nuevo usuario:', error);
  
	    return resp.status(500).json({ status: false, error: 'Algo falló' });
    }
});

// Borrar usuario (solo el jefe también)
router.delete('/', [authtoken], async (req, resp) => {

	const result = await DB('holidays')
	.delete()
	.where('ID', req.body.userID);

	if(result > 0){
		resp.json({ status: true, message: 'Perfil eliminado correctamente', deletedProfile: req.user});
	} else {
		resp.json({ status: false, message: 'Ha habido algún error' })
	}
});


module.exports = router;