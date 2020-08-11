const mongoose = require('mongoose');
require('dotenv').config();
const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('DB online');
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hra de iniciar base de datos');
    }


};

module.exports = {
    dbConnection
};