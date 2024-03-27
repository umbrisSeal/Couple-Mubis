
const crearUsuario = require("../services/database/crearUsuario");
const validacionSignin = require("../validations/validacionSignin");


async function crearCuenta(request, response) {
    

    if(! await validacionSignin(request, response)) return;

    // Validacion superada, crear un nuevo usuario.
    // ANTES! Verificar que la clave sea valida.
    
    crearUsuario(request.body);


    response.status(200).send('Validacion exitosa. El formulario enviado es correcto.');

    // Cambiar todo el correo a lowercase.

}


module.exports = crearCuenta;


/*
Para crear una cuenta:

    Datos requeridos:
    - Clave de Registro (max lenght 20); pero en realidad solo son 10 digitos.
    - Email max lenght 50 solo emails de google, outlook, yahoo.
    - password.
    - password repeat, debe de ser el mismo.
    - Un CRSF token para proteger usuarios.

    1. Validar que el body contiene un JSON con las keys necesarias.
    2. Aplicar las validaciones a cada una de las secciones.
    ------------------------------------------------------------------

    Para crear la cuenta hay que validar:
        (Modelo)
    1. El correo electronico no existe en la base de datos.
    2. 

    clave": "3MXFWGLVWF",
    "email": "micorreo@gmail.com",
    "usuario": "Rico McPato",
    "password": "Password-hash1",
    "passwordRepetido": "Password-hash1"

*/