

function crearListaView(resultado, response) {
    if(resultado) {
        response.status(200).send("Lista creada exitosamente.");
        return;
    } else {
        response.status(500).send("Ha ocurrido un error al intentar crear la lista.");
        return;
    }
}

module.exports = crearListaView;