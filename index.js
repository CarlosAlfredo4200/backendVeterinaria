//const express = require('express')
import express from "express";
import conectarDB from "./config/db.js";
import dotenv from 'dotenv'
import usuarioRoutes from "./routes/usuarioRoutes.js";
import cors from 'cors'

const app = express()
app.use(express.json());

dotenv.config()

conectarDB()

// --Configurar CORS.  el localhost 4000 hacepta peticiones desde 3000 pueden ser varias--

// const whitelist = [process.env.FRONTEND_URL ];
// const corsOptions = {
//     origin: function(origin, callback){
//         if(whitelist.includes(origin)){ 
//             //consultar API 
//             callback(null, true);
//         }else{
//             callback(new Error('Error de Cors'))
//         }
//     },
// };
 
// app.use(cors(corsOptions))
app.use(cors())



app.use('/api/usuarios', usuarioRoutes)
 

const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=> {
    console.log(`Servidor corriendo en el puerto: ${PORT}`);
})