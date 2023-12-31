const express = require ('express');
const router = express.Router();
const DB = require ('../config/bd');
const utils = require('../config/utils');
const hash = require('../config/password');
const authtoken = require('../config/authtoken')

// ¿Usuarios del jefe? Se hará más adelante
router.get('/list', async (req, resp) => {

    try{
		const result = await DB.select(['users.ID', 'users.name', 'users.surname', 'users.mail', 'jobstate.rangue'])
		.from('users')
        .leftJoin('jobstate', 'users.ID', '=', 'jobstate.userID')
		
		if (result.length > 0) {
            return resp.status(200).json({ status: true, data: result });
        } else {
            return resp.status(404).json({ status: false, data: [] });
        }
          
	}catch (error){
		console.error(error);
        return resp.status(500).json({ status: false, error: console.log(error) });
	}
})

// Obtener el propio perfil
router.get('/self', [authtoken], async (req, resp) => {
    const ID = req.user.ID;
    try{
		const result = await DB.select(['users.ID', 'users.name', 'users.surname', 'users.mail', 'jobstate.rangue'])
		.from('users')
        .where('users.ID', ID)
        .join('jobstate', 'users.ID', '=', 'jobstate.userID')
		
		if (result.length > 0) {
            return resp.status(200).json({ status: true, data: result[0] });
        } else {
            return resp.status(404).json({ status: false, data: [] });
        }
	}catch (error){
		console.error(error);
        return resp.status(500).json({ status: false, error: console.log(error) });
	}
})

// Obtener perfiles para el jefe
router.get('/:id', async (req, resp) => {
    const ID = req.params.id;
    try{
		const result = await DB.select(['ID', 'name', 'surname', 'mail'])
		.from('users')
        .where('ID', ID)
		
		if (result.length > 0) {
            return resp.status(200).json({ status: true, data: result });
        } else {
            return resp.status(404).json({ status: false, data: [] });
        }

	}catch (error){
		console.error(error);
        return resp.status(500).json({ status: false, error: console.log(error) });
	}
})

// Introducir datos (solo el jefe)
router.post('/', async (req, resp) => {

    try{
        if(!utils.validarCorreo(req.body.mail)){
            return resp.json({status: false, error: 'Formato de correo electrónico no válido'})
        }
		const result = await DB('users').insert({
            name: req.body.name,
            surname: req.body.surname,
            mail: req.body.mail,
            password: req.body.password,
            token: hash.newHash(req.body.mail + req.body.password)
        })
		
        if (result.length > 0) {
            return resp.status(200).json({ status: true, message: 'Perfil creado correctamente', data: result });
        } else {
            return resp.status(404).json({ status: false, data: [] });
        }
	} catch (error) {
        console.error(error);
        return resp.status(500).json({ status: false, error: console.log(error) });
	}
})

// Modificar datos (solo el jefe)
router.put('/:id', async (req, resp) => {

    try{
        const whitelist = ['name', 'surname', 'mail', 'password'];
        const toEdit = {};

        if (req.body.mail && !utils.validarCorreo(req.body.mail)) {
            return resp.json({ status: false, error: 'Correo electrónico no válido' })
        };

        Object.keys(req.body).forEach(e => {
            if (whitelist.includes(e)) {
                toEdit[e] = req.body[e]
            }
        });

        const result = await DB('users')
            .update(toEdit)
            .where('ID', req.params.id)

        if (result > 0) {
            resp.status(200).json({ status: true, message: 'Perfil actualizado correctamente', data: toEdit });
        } else {
            resp.status(404).json({ status: false, message: 'Perfil no actualizado', data: [] });
        };
    } catch (error){
        console.error(error);
        return resp.status(500).json({ status: false, error: console.log(error) });
    }
});

// Borrar usuario (solo el jefe también) Repasar cuando haga el frontEnd
router.delete('/:id', async (req, resp) => {
    try{
        const ID = req.params.id;
        const result = await DB('users')
        .delete()
        .where('ID', ID);

        if(result > 0){
            resp.status(200).json({ status: true, message: 'Perfil eliminado correctamente', deletedProfile: ID});
        } else {
            resp.status(404).json({ status: false, message: 'Ha habido algún error' })
        }

    } catch(error){
        console.error(error);
        return resp.status(500).json({ status: false, error: console.log(error) });
    }
});

router.post('/login', async (req, resp) => {

	const userData = await DB('users')
      .select(['ID', 'token'])
      .where('mail', req.body.mail)
	  .where('password', req.body.password)
      .first();

	if (userData !== undefined ) {
		const newToken = hash.newHash(userData.token);
		await DB('users')
		.where('ID', userData.ID)
		.update('token', newToken)
	  	return resp.json({ status: true, data: newToken });
	} else {
	  // Las credenciales son incorrectas, devolvemos un error
	  resp.status(401).json({ error: 'Credenciales inválidas' });
	}
});

module.exports = router;