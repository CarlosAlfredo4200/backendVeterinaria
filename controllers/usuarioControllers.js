//import res from "express/lib/response";
import generarId from "../modells/helpers/generarId.js";
import generarJWT from "../modells/helpers/generarJWT.js";
import Usuario from "../modells/Usuario.js";
import { emailRegistro ,emailOlvidePassword } from '../modells/helpers/email.js'

const registrar = async (req, res) => {
  //-------------- Evitar registros duplicados -----------

  const { email } = req.body; //Consultar a la db
  const existeUsuario = await Usuario.findOne({ email }); // Encontrar el primero que coincida (NULL si no lo encuentra)

  if (existeUsuario) {
    const error = new Error("Este usuario ya esta registrado!!!");
    return res.status(400).json({ msg: error.message });
  }
  try {
    const usuario = new Usuario(req.body);
    usuario.token = generarId();
    await usuario.save();

     // Enviar email de confirmación
      emailRegistro({
      email: usuario.email,
      nombre: usuario.nombre, 
      token: usuario.token
    })
    res.json({msg:'Usuario creado correctamente!!!. Revia tu email para confirmar tu cuenta.'});
  } catch (error) {
    console.log(error);
  }
};

//------------------ Auth usuario ---------------------
const autenticar = async (req, res) => {
  const { email, password } = req.body;

  //-------- Comprobar si usuario existe -----------
  const usuario = await Usuario.findOne({ email });

  if (!usuario) {
    const error = new Error("El usuario no existe!!!");
    return res.status(404).json({ msg: error.message });
  }

  //-------- Comprobar si usuario esta confirmado -----------
  if (!usuario.confirmado) {
    const error = new Error("Tu cuenta no ha sido confirmada!!!");
    return res.status(403).json({ msg: error.message });
  }

  //-------- Comprobar password -----------
  if (await usuario.comprobarPasword(password)) {
     
    res.json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      token: generarJWT(usuario._id),
    });
  } else {
    const error = new Error("El password es incorrecto!!!");
    return res.status(403).json({ msg: error.message });
  }
};


//----------Confirmar usuario ------------------------------------
const confirmar = async (req, res) => {
   
  const { token } = req.params;
  const usuarioConfirmar = await Usuario.findOne({ token });
  if (!usuarioConfirmar) {
    const error = new Error("Token no valido!!!");
    return res.status(403).json({ msg: error.message });
  }
  
  try {
    usuarioConfirmar.confirmado = true;
    usuarioConfirmar.token = "";
    await usuarioConfirmar.save();
    res.json({ msg: "Usuario confirmado correctamente!!!" });
  } catch (error) {
    console.log(error);
  }
};


// -------------Olvidar password ---------------------

const olvidarPasword = async (req, res) => {

   const { email } = req.body;
   
  //-------- Comprobar si usuario existe -----------
  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    const error = new Error("El usuario no existe!!!");
    return res.status(404).json({ msg: error.message });
  }
  try {
    usuario.token = generarId();
    await usuario.save();
     

   // --- Enviar el email ---
    emailOlvidePassword({
      email: usuario.email,
      nombre: usuario.nombre, 
      token: usuario.token,
    })
     res.json({ msg: "Hemos enviado un email con las instrucciones" });
  } catch (error) {
    console.log(error);
  }
};


//--------- Comprobar totkn para cambiar el password-----------

const comprobarToken = async (req, res) => {
  
  const { token } = req.params;
  const tokenValido = await Usuario.findOne({ token });
  

  
  if (tokenValido) {
     
    res.json({ msg: " Token valido y el usuario existe" });
  } else {
    
    const error = new Error("token NO VALIDO !!!");
    return res.status(403).json({ msg: error.message });
  }
};


//--------- Nuevo password-----------

const nuevoPassword = async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;

  
  // Nuevamente comprobar que el token sea valido

   const usuario = await Usuario.findOne({ token });
    if (usuario) {
     
    usuario.password = password;
    usuario.token = "";

    try {
      await usuario.save();
      res.json({ msg: "Password modificado correctamente" });
    } catch (error) {
      console.log(error);
    }
  } else {
    const error = new Error("token NO VALIDO!!!");
    return res.status(403).json({ msg: error.message });
  }
};


//---------------------------------- Perfin usuario ---------------------------------

const perfil = async (req, res) => {
  
  const { usuario } = req; //Leyendo del servidor

  res.json(usuario)
  
};


export { registrar, autenticar, confirmar , olvidarPasword, comprobarToken, nuevoPassword, perfil };
