import mongoose from "mongoose";
import bcrypt from 'bcrypt';


const usuarioSchema = mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true,
            trim:true
        },

        password: {
            type: String,
            required: true,
            trim:true
        },

        email: {
            type: String,
            required: true,
            trim:true,
            unique: true
        },

        token: {
            type: String,
            
        },
        confirmado: {
            type: Boolean,
            default:false
        },
    },

       { timesTamps:true,} //columnas creado y actualizado
    );



    //  ( HASHEAR )Este códigoo de ejecutará antes de hacer el registro en la base de datos, para 
    //  hashear el password. 
    //  Al darle guardar el usuario se pasará al modelo y se aplicaria  esta funcion 
      // -------- Todos los password deben estar protegidos, encriptatos...(hashear) --------
       
    usuarioSchema.pre('save', async function(next) {

        // Validando si ya el password esta hasheado next lo envia al siguiente middelwer
        if(!this.isModified('password'))
        next();
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    })

    //------fn para comprobar el password ----------------

    usuarioSchema.methods.comprobarPasword = async function( passwordFormulario){
        return await bcrypt.compare(passwordFormulario, this.password);
    }

    // Definir módelo

    const Usuario = mongoose.model('Usuario', usuarioSchema);


    export default Usuario;