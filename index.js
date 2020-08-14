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

// Directorio publico
app.use(express.static('public'));



// Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/upload', require('./routes/uploads'));



app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto: ' + process.env.PORT);
});