

const conexionMDB = require("./conexionMDB");

async function borrarLista(listaID, colaboradores) {

    const clienteMDB = conexionMDB.conectar();
    const coleccionUsuarios = clienteMDB.db('coupleMubis').collection('usuarios');
    const coleccionListas = clienteMDB.db('coupleMubis').collection('listas');

    let resultado;

    try {
        // Borrar la referencia de la listaID en todos los usuarios involucrados.
        await coleccionUsuarios.updateMany(
            {userID: {$in: colaboradores}},
            {$pull: {listas: listaID}}
        );

        // Borrar la lista.
        await coleccionListas.deleteOne({listaID: listaID});
        resultado = true;

    } catch {
        resultado = false;
    } finally {
        conexionMDB.desconectar();
    }

    return resultado;
}

module.exports = borrarLista;