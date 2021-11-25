const express = require('express');
require("dotenv").config();
const {dbConection} = require('./database/config');
const cors = require('cors');

console.log(process.env);

//Crear el servidor de express

const app = express();

//Base de datos
dbConection();

//CORS
app.use(cors())


//Directorio publico
app.use( express.static('public') );

//Lectura y parse del body
app.use( express.json() );

//Rutas
app.use('/api/auth',require('./routes/auth'));
app.use('/api/users',require('./routes/users'));

    
//TODO: CRUD: Eventos



//Escuchar peticiones
app.listen( process.env.PORT, () =>{
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
} );