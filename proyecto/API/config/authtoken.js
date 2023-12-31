const DB = require('./bd');

const authtoken = async (req, resp, next) => {

    const token = req.headers.token;

    if (token === undefined){
        return resp.status(401).send({ status: false, error: 'No has enviado el token' })
    }

    const result = await DB.select("users.*", "jobstate.rangue")
        .from('users')
        .where('token', token)
        .join('jobstate', 'users.ID', '=', 'jobstate.userID')

        if (result.length === 0) {
            return resp.status(401).send({ status: false, error: 'Token inválido'})
        }

        req.user = result[0];
        next();
};

module.exports = authtoken;