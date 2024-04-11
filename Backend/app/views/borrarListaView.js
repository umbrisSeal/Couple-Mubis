

function borrarListaView(request, response) {

    if(request.respuesta) {
        response.status(200).send("Lista eliminada exitosamente.");
        return;
    } else {
        response.status(400).send("Ha ocurrido un error mientras se borraba la lista.");
        return;
    }

}

module.exports = borrarListaView;