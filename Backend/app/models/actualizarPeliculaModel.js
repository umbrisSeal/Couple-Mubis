const actualizarPeliculas = require("../services/database/actualizarPeliculas");
const obtenerLista = require("../services/database/obtenerLista");
const verificaKeys = require("../validations/verificaKeys");

async function actualizarPeliculaModel(request, response) {

    const {userID, listaID, peliculas} = request;

    const datosLista = await obtenerLista(listaID);

    const colaboradores = [datosLista.dueño, ...datosLista.editores];

    if(!colaboradores.includes(userID)) {
        request.resultado = false;  // El usuario no tiene permiso de hacer esto.
        return;
    }

    const peliculasActualizadas = peliculas.filter((pelicula) => {
        return verificaKeys(pelicula, ['id', 'vista', 'urlPoster', 'titulo', 'año']);
    })


    const resultadoOperacion = await actualizarPeliculas(listaID, peliculasActualizadas);

    request.resultadoOperacion = resultadoOperacion;
}

module.exports = actualizarPeliculaModel;