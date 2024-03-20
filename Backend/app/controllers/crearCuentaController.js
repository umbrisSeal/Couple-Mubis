
const validacionSignin = require("../validations/validacionSignin");


function crearCuenta(request, response) {

    if(!validacionSignin(request, response)) return;


    response.status(200).send('Validacion exitosa.');

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