import express from "express";
const router = express.Router();

import { registrar, autenticar, confirmar, olvidarPasword, comprobarToken, nuevoPassword, perfil } from '../controllers/usuarioControllers.js'
import checkAuth from "../Middleware/checkAuth.js";

// Autenticación , Registro y confirmación de usuarios

router.post('/',  registrar)  //Para crear usuario
router.post('/login', autenticar)  //Para auth  usuario
router.get('/confirmar/:token', confirmar)  //Para confirmar  usuario
router.post('/olvidar-password', olvidarPasword)  //Para confirmar  usuario

// router.get('/olvidar-password/:token', comprobarToken)  //Para confirmar  usuario
// router.post('/olvidar-password/:token', nuevoPassword)  //Para confirmar  usuario

router.route('/olvidar-password/:token').get(comprobarToken).post(nuevoPassword)

router.get('/perfil', checkAuth, perfil)

export default router;