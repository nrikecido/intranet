const express = require ('express');
const router = express.Router();
const DB = require ('../config/bd');
const utils = require('../config/utils');
const hash = require('../config/password');
const authtoken = require('../config/authtoken')

// ¿Usuarios del jefe? Se hará más adelante
router.get('/list', async (req, resp) => {

    try{
		const result = await DB.select(['ID', 'userID', 'department', 'rangue', 'antiquity', 'contract'])
		.from('jobstate')
		
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

// Obtener el propio jobstate
router.get('/self', [authtoken], async (req, resp) => {
    const ID = req.user.ID;
    try{
		const result = await DB.select(['ID', 'userID', 'department', 'rangue', 'antiquity', 'contract'])
		.from('jobstate')
        .where('ID', ID)
		
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
		const result = await DB.select(['ID', 'userID', 'department', 'rangue', 'antiquity', 'contract'])
		.from('jobstate')
        .where('ID', ID)
		
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
		const result = await DB('jobstate').insert({
            userID: req.body.userID,
            department: req.body.department,
            rangue: req.body.rangue,
            antiquity: req.body.antiquity,
            contract: req.body.contract
        })
		
        return resp.json({ status: true, data: "Perfil creado correctamente." });
	} catch (error) {
	  console.error('Error al crear un nuevo usuario:', error);
  
	  return resp.json({ status: false, error: 'Algo falló' });
	}
})

router.put('/', async (req, resp) => {

    const ID = req.body.userID;
    const whitelist = ['userID', 'department', 'rangue', 'antiquity', 'contract'];
    const toEdit = {};

    Object.keys(req.body).forEach(e => {
        if (whitelist.includes(e)) {
            toEdit[e] = req.body[e]
        }
    });

    const result = await DB('jobstate')
        .update(toEdit)
        .where('ID', ID)

    if (result > 0) {
		resp.json({ status: true, message: 'Perfil actualizado correctamente', data: toEdit });
		} else {
		resp.json({ status: false, message: 'Perfil no actualizado', data: toEdit });
	};
});

// Borrar usuario (solo el jefe también)
router.delete('/', [authtoken], async (req, resp) => {

	const result = await DB('jobstate')
	.delete()
	.where('ID', req.body.userID);

	if(result > 0){
		resp.json({ status: true, message: 'Perfil eliminado correctamente', deletedProfile: req.user});
	} else {
		resp.json({ status: false, message: 'Ha habido algún error' })
	}
});


module.exports = router;