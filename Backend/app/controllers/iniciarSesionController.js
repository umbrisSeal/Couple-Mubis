const iniciarSesionModel = require("../models/iniciarSesionModel");
const validacionLogin = require("../validations/validacionLogin");
const iniciarSesionView = require("../views/iniciarSesionView");

async function iniciarSesionController(request, response) {

    if(! await validacionLogin(request, response))  return;

    const tokens = await iniciarSesionModel(request, response);

    if(!tokens) {
        response.status(403).send("Ha ocurrido un error al authenticar al usuario.");
        return;
    }

    // Llamar a la vista, para que retorne cookies con los tokens.
    iniciarSesionView(tokens, response);
}


module.exports = iniciarSesionController;