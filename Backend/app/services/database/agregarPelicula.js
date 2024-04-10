const obtenerAñoPelicula = require("../../helpers/obtenerAñoPelicula");

const conexionMDB = require("./conexionMDB");

async function agregarPelicula(listaID, datosPelicula) {

    const nuevaPelicula = {
        id: datosPelicula.id,
        vista: false,
        urlPoster: datosPelicula.poster_path,
        titulo: datosPelicula.title,
        año: obtenerAñoPelicula(datosPelicula.release_date),
    }
    
    const clienteMDB = conexionMDB.conectar();
    const coleccionListas = clienteMDB.db('coupleMubis').collection('listas');
    let resultado;

    try {
        const peliculas = await coleccionListas.findOne({listaID: listaID}, {projection: {_id: false, peliculas: true}});
        const peliculaYaAgregada = peliculas.peliculas.some((pelicula) => pelicula.id === nuevaPelicula.id);
        if(peliculaYaAgregada) {
            throw new Error("La pelicula ya existe en la lista.");
        }
        resultado = await coleccionListas.updateOne({listaID: listaID}, {$push: {peliculas: nuevaPelicula}});
    } catch {
        resultado = false;
    } finally {
        conexionMDB.desconectar();
    }

    return resultado;
}

module.exports = agregarPelicula