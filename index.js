var express = require('express');
var cors = require('cors');
require('dotenv').config();
const { dbConnection } = require('./database/config');

var app = express();
app.use(cors());

// connecion a la base de datos
dbConnection();


// Rutas
app.get('/', (req, res) => {
    res.status(400).json({
        ok: true,
        msg: 'Hola Munso'
    });
});


app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto: ' + process.env.PORT);
});