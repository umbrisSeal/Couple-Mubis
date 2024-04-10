const obtenerUserIdToken = require("../helpers/obtenerUserIdToken");
const solicitarPelicula = require("../services/api/solicitarPelicula");
const agregarPelicula = require("../services/database/agregarPelicula");
const obtenerLista = require("../services/database/obtenerLista");

async function agregarPeliculaModel(request, response) {

    const userID = obtenerUserIdToken(request.cookies['idToken']);
    const listaID = request.body.listaID;
    const peliculaID = request.body.peliculaID;

    const datosLista = await obtenerLista(listaID);

    if(!datosLista) {
        response.status(400).send("No se encontro la lista solicitada.");
        return;
    }

    

    if(datosLista.dueño === userID || datosLista.editores.some((editor) => editor === userID)) {
        // Consultar los datos de la pelicula.
        const datosPelicula = await solicitarPelicula(peliculaID);
        if(!datosPelicula) {
            response.status(400).send("No se encontro la pelicula solicitada");
            return;
        }

        const resultado = await agregarPelicula(listaID, datosPelicula.data);

        request.resultado = resultado;
        return true;
        
    } else {
        response.status(401).send("El usuario no tiene los permisos para editar la lista.");
        return;
    }

}

module.exports = agregarPeliculaModel;