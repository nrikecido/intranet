const express = require ('express');
const router = express.Router();
const DB = require ('../config/bd');
const utils = require('../config/utils');
const hash = require('../config/password');
const authtoken = require('../config/authtoken')

// ¿Usuarios del jefe? Se hará más adelante
router.get('/list', async (req, resp) => {

    try{
		const result = await DB.select(['requestID', 'holidayStart', 'holidayFinish', 'totalHolidays', 'commentary'])
		.from('holidays_requests')
		
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

// Obtener el propio holidays_requests
router.get('/self', [authtoken], async (req, resp) => {
    const ID = req.user.ID;
    try{
		const result = await DB.select(['requestID', 'holidayStart', 'holidayFinish', 'totalHolidays', 'commentary'])
		.from('holidays_requests')
        .where('requestID', ID)
		
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

// Obtener perfiles para el jefe
router.get('/:id', async (req, resp) => {
    const ID = req.params.id;
    try{
		const result = await DB.select(['requestID', 'holidayStart', 'holidayFinish', 'totalHolidays', 'commentary'])
		.from('holidays_requests')
        .where('requestID', ID)
		
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

// Introducir datos (solo el jefe)
router.post('/', async (req, resp) => {

    try{
		const result = await DB('holidays_requests').insert({
            requestID: req.body.requestID,
            holidayStart: req.body.holidayStart,
            holidayFinish: req.body.holidayFinish,
            totalHolidays: req.body.totalHolidays,
            commentary: req.body.commentary
        })
        return resp.json({ status: true, data: req.body, message: "Petición registrada correctamente." });
	} catch (error) {
	  console.error('Error al introducir el nuevo registro:', error);
  
	  return resp.json({ status: false, error: 'Algo falló' });
	}
})

router.put('/', async (req, resp) => {

    const ID = req.body.requestID;
    const whitelist = ['holidayStart', 'holidayFinish', 'totalHolidays', 'commentary'];
    const toEdit = {};

    Object.keys(req.body).forEach(e => {
        if (whitelist.includes(e)) {
            toEdit[e] = req.body[e]
        }
    });

    const result = await DB('holidays_requests')
        .update(toEdit)
        .where('requestID', ID)

    if (result > 0) {
		resp.json({ status: true, message: 'Registro actualizado correctamente', data: toEdit });
		} else {
		resp.json({ status: false, message: 'Registro no actualizado', data: toEdit });
	};
});

// Borrar usuario (solo el jefe también)
router.delete('/', [authtoken], async (req, resp) => {

	const result = await DB('holidays_requests')
	.delete()
	.where('ID', req.body.userID);

	if(result > 0){
		resp.json({ status: true, message: 'Perfil eliminado correctamente', deletedProfile: req.user});
	} else {
		resp.json({ status: false, message: 'Ha habido algún error' })
	}
});


module.exports = router;