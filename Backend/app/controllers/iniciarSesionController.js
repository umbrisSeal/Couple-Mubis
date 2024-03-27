const iniciarSesionModel = require("../models/iniciarSesionModel");
const validacionLogin = require("../validations/validacionLogin");

async function iniciarSesionController(request, response) {

    if(! await validacionLogin(request, response))  return;

    /*
        Verificar que tenga una estructura correcta el body.

        Model: Consultar/Verificar la contraseña hasheada contra la version de bases de datos.
        Model: Generar ID TOKEN y SESSION TOKEN.
        Vista: Retorna 2 cookies con los tokens.
        Vista: Retorna un mensaje de operacion exitosa.
    */

    const tokens = await iniciarSesionModel(request, response);

    if(!tokens) {
        response.status(403).send("Ha ocurrido un error al authenticar al usuario.");
        return;
    }


    response.send("Wow, te haz autenticado exitosamente.");
}


module.exports = iniciarSesionController;