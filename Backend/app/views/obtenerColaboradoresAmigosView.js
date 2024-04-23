const obtenerImgPerfil = require("../helpers/obtenerImgPerfil");

function obtenerColaboradoresAmigosView(request, response) {

    if(request.error) {
        console.log("ErroR!");
        response.status(404).send("Se ha producido un error al intentar obtener la informacion.");
        return;
    }

    const datosAmigos = request.datosAmigos;
    const colaboradoresLista = request.colaboradoresLista;

    const colaboradoresAmigos = datosAmigos.map((amigo) => {
        return {
            id: amigo.userID,
            nombre: amigo.usarAlias ? amigo.alias : amigo.usuario,
            imgPerfil: obtenerImgPerfil(amigo.imgPerfilID),
            esColaborador: colaboradoresLista.includes(amigo.userID)
        }
    });

    response.send(colaboradoresAmigos);
}

module.exports = obtenerColaboradoresAmigosView;