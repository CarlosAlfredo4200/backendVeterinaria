import nodemailer from 'nodemailer'

export const emailRegistro = async ( datos ) => {
   
    
    const { email, nombre, token } = datos;

    const transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
        }
      });


//---------- Información del email ----------------

      const informacion = await transport.sendMail({

            from: ' "Proyecto veterinaria" <cuentas@ProyectoVeterinaria.com>',
            to: email,
            subject:'Proyecto veterinaria - Comprueba tu cuenta',
            text:'Comprueba tu cuenta en Proyecto veterinaria',
            
            html: `<p>Hola : ${nombre} Comprueba tu cuenta en Proyecto veterinaria</p>,
            <p>Tu cuenta ya casi esta lista, solo debes conprobarla en el siguiente enlace:</p>
            <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a>
            <p>Si tu no creaste esta cuenta , puedes ignorar este mensaje</p>      
            ` 
      });
}



//-----------------Olvide password ----------------------------------


export const emailOlvidePassword = async ( datos ) => {
   
    
      const { email, nombre, token } = datos;
  
      const transport = nodemailer.createTransport({
          host: process.env.EMAIL_HOST,
          port: process.env.EMAIL_PORT,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
          }
        });
  
  
  //---------- Información del email ----------------
  
        const informacion = await transport.sendMail({
  
              from: ' "Proyecto veterinaria" <cuentas@ProyectoVeterinaria.com>',
              to: email,
              subject:'Proyecto veterinaria - reestablece tu password',
              text:'Comprueba tu cuenta en Proyecto veterinaria',
              
              html: `<p>Hola : ${nombre} has solicitado reestablecer tu password Proyecto veterinaria</p>,
              <p>Sigue el siguiente enlace para generar un nuevo password:</p>
              <a href="${process.env.FRONTEND_URL}/olvidar-password/:${token}">Reestablecer password</a>
              <p>Si tu no creaste esta cuenta , puedes ignorar este mensaje</p>      
              ` 
        });
  }