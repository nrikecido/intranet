const express = require ('express');
const router = express.Router();
const DB = require ('../config/bd');
const utils = require('../config/utils');
const hash = require('../config/password');
const authtoken = require('../config/authtoken')

// ¿Usuarios del jefe? Se hará más adelante
router.get('/list', async (req, resp) => {

    try{
		const result = await DB.select(['requests.ID', 'requests.userID', 'requests.requestType', 'requests.comments', 'requests.status', 'requests.created', 'users.name', 'users.surname'])
        .select(DB.raw('DATE_FORMAT(startDate, "%d-%m-%Y") as fecha'))
        .select(DB.raw('DATE_FORMAT(finishDate, "%d-%m-%Y") as fecha2'))
        .select(DB.raw('DATE_FORMAT(requests.created, "%d-%m-%Y") as creado'))
		.from('requests')
        .join('users', 'requests.userID', '=', 'users.ID')
		
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

// Obtener el propio requests
router.get('/self', [authtoken], async (req, resp) => {
    const ID = req.user.ID;
    try{
		const result = await DB.select(['ID', 'userID', 'requestType', 'comments','status', 'rejected'])
        .select(DB.raw('DATE_FORMAT(startDate, "%d-%m-%Y") as fecha'))
        .select(DB.raw('DATE_FORMAT(finishDate, "%d-%m-%Y") as fecha2'))
        .select(DB.raw('DATE_FORMAT(created, "%d-%m-%Y") as creado'))
		.from('requests')
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

// Obtener perfiles para el jefe
router.get('/managed/:id', async (req, resp) => {
    const ID = req.params.id;
    try{
		const result = await DB.select(['requests.ID', 'requests.userID', 'requests.requestType', 'requests.comments', 'requests.status', 'requests.created', 'requests.rejected', 'users.name', 'users.surname'])
        .select(DB.raw('DATE_FORMAT(startDate, "%d-%m-%Y") as fecha'))
        .select(DB.raw('DATE_FORMAT(finishDate, "%d-%m-%Y") as fecha2'))
        .select(DB.raw('DATE_FORMAT(requests.created, "%d-%m-%Y") as creado'))
		.from('requests')
        .join('users', 'requests.userID', '=', 'users.ID')
        .where('users.ID', ID)
		
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
		const result = await DB.select(['requests.ID', 'requests.userID', 'requests.requestType', 'requests.comments', 'requests.status', 'requests.created', 'requests.rejected', 'users.name', 'users.surname'])
        .select(DB.raw('DATE_FORMAT(startDate, "%d-%m-%Y") as fecha'))
        .select(DB.raw('DATE_FORMAT(finishDate, "%d-%m-%Y") as fecha2'))
        .select(DB.raw('DATE_FORMAT(requests.created, "%d-%m-%Y") as creado'))
		.from('requests')
        .join('users', 'requests.userID', '=', 'users.ID')
        .where('requests.ID', ID)
		
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
        if (result > 0){
            return resp.status(200).json({ status: true, data: result, message: "Petición registrada correctamente." });
            
        } else {
            return resp.status(404).json({ status: false, data: []});
        }
	} catch (error) {
	  console.error('Error al introducir el nuevo registro:', error);
  
	  return resp.status(500).json({ status: false, error: 'Algo falló' });
	}
})

// Gestionar vacaciones
router.put('/:id', async (req, resp) => {

    try{
    const ID = req.params.id;
    const whitelist = ['status', 'rejected'];
    const toEdit = {};

    Object.keys(req.body).forEach(e => {
        if (whitelist.includes(e)) {
            toEdit[e] = req.body[e]
        }
    });

    const result = await DB('requests')
        .update(toEdit)
        .where('ID', ID)

    if (result > 0) {
		return resp.status(200).json({ status: true, message: 'Petición actualizada correctamente', data: toEdit });
		} else {
		return resp.status(404).json({ status: false, message: 'Perfil no actualizado', data: [] });
	};
    } catch(error){
        console.error('Error al introducir el nuevo registro:', error);
  
	    return resp.status(500).json({ status: false, error: 'Algo falló' });
    }
});

// Borrar vacaciones
router.delete('/:id', async (req, resp) => {

    try{
        const result = await DB('requests')
	.delete()
	.where('ID', req.params.id);

	if(result > 0){
		return resp.status(200).json({ status: true, message: 'Perfil eliminado correctamente', deletedProfile: req.user});
	} else {
		return resp.status(404).json({ status: false, message: 'Ha habido algún error' })
	}

    } catch (error) {
        console.error('Error al eliminar:', error);
  
	    return resp.status(500).json({ status: false, error: 'Algo falló' });
    }
});


module.exports = router;