

function confirmarAmistadView(request, response) {
    if(request.error) {
        response.status(400).send("No se pudo verificar la amistad.");
        return;
    }
    response.status(200).send(request.sonAmigos);
}

module.exports = confirmarAmistadView;