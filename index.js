var express = require('express');
var cors = require('cors');
require('dotenv').config();
const { dbConnection } = require('./database/config');

var app = express();
// Lectura y parseo del body
app.use(express.json());


// configuracion cors
app.use(cors());

// connecion a la base de datos
dbConnection();


// Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));


app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto: ' + process.env.PORT);
});