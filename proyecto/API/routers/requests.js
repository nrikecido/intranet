const express = require ('express');
const router = express.Router();
const DB = require ('../config/bd');
const utils = require('../config/utils');
const hash = require('../config/password');
const authtoken = require('../config/authtoken')

// ¿Usuarios del jefe? Se hará más adelante
router.get('/list', async (req, resp) => {

    try{
		const result = await DB.select(['ID', 'userID', 'requestType', 'startDate', 'finishDate', 'comments', 'status', 'created'])
		.from('requests')
		
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

// Obtener el propio requests
router.get('/self', [authtoken], async (req, resp) => {
    const ID = req.user.ID;
    try{
		const result = await DB.select(['ID', 'userID', 'requestType', 'startDate', 'finishDate', 'comments','status', 'created'])
		.from('requests')
        .where('userID', ID)
		
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
		const result = await DB.select(['ID', 'userID', 'requestType', 'startDate', 'finishDate', 'comments','status', 'created'])
		.from('requests')
        .where('userID', ID)
		
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

// Introducir petición
router.post('/', [authtoken], async (req, resp) => {
    const ID = req.user.ID;
    try{
		const result = await DB('requests').insert({
            userID: ID,
            requestType: req.body.requestType,
            startDate: req.body.startDate,
            finishDate: req.body.finishDate,
            comments: req.body.comments
        })
        .where('userID', ID)
        return resp.json({ status: true, data: result, message: "Petición registrada correctamente." });
	} catch (error) {
	  console.error('Error al introducir el nuevo registro:', error);
  
	  return resp.json({ status: false, error: 'Algo falló' });
	}
})

// Modificar datos (solo el jefe)
router.put('/', async (req, resp) => {

    const ID = req.body.userID;
    const whitelist = ['userID', 'requestType', 'startDate', 'finishDate', 'status'];
    const toEdit = {};

    Object.keys(req.body).forEach(e => {
        if (whitelist.includes(e)) {
            toEdit[e] = req.body[e]
        }
    });

    const result = await DB('requests')
        .update(toEdit)
        .where('userID', ID)

    if (result > 0) {
		resp.json({ status: true, message: 'Perfil actualizado correctamente', data: toEdit });
		} else {
		resp.json({ status: false, message: 'Perfil no actualizado', data: toEdit });
	};
});

// Borrar usuario (solo el jefe también)
router.delete('/', [authtoken], async (req, resp) => {

	const result = await DB('requests')
	.delete()
	.where('ID', req.body.userID);

	if(result > 0){
		resp.json({ status: true, message: 'Perfil eliminado correctamente', deletedProfile: req.user});
	} else {
		resp.json({ status: false, message: 'Ha habido algún error' })
	}
});


module.exports = router;