const express = require('express');
const cors = require('cors');
const app = express();
const port = 3010;

app.use( express.json() );
app.use( cors() )


app.use('/users', require('./routers/users'))
app.use('/jobstate', require('./routers/jobstate'))
app.use('/times', require('./routers/times'))
app.use('/requests', require('./routers/requests'))
app.use('/holidays', require('./routers/holidays'))

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Hubo un error en el servidor')
});

app.get('/', (req, resp) =>{
    resp.send('Hola')
});

app.listen(port, () => {
    console.log('Estoy escuchando por el puerto '+port)
});