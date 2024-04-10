

async function editarEditoresView(request, response) {

    if(request.resultado) {
        response.status(200).send("Actualizacion de lista exitosa.");
    } else {
        response.status(400).send("No se pudo actualizar la lista.");
    }

}

module.exports = editarEditoresView;