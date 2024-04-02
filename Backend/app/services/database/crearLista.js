
/*
    Toma un nombre de lista y un userID del dueño de la nueva lista y los crea en la base de datos. Tambien el nuevo listaID creado se agregara al atributo "listas" del usuario con el userID correspondiente.
*/

const generarID = require('../../helpers/generarID');
const conexionMDB = require('./conexionMDB');

async function crearLista(nuevoNombre, userID) {

    const nuevaListaID = generarID();

    const nuevaLista = {
        listaID: nuevaListaID,
        nombre: nuevoNombre,
        esPrivada: false,
        dueño: userID,
        editores: [],
        lectores: [],
        peliculas: []
    };


    const clienteMDB = conexionMDB.conectar();
    const coleccionListas = clienteMDB.db('coupleMubis').collection('listas');
    const coleccionUsuarios = clienteMDB.db('coupleMubis').collection('usuarios');

    let resultado;

    try {
        await coleccionListas.insertOne(nuevaLista);
        await coleccionUsuarios.updateOne({userID: userID}, {$push: {listas: nuevaListaID}});
        resultado = true;
    } catch(error) {
        //console.log("Parece que hubo un error: ", error.errorResponse.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied);
        resultado = false;
    } finally {
        conexionMDB.desconectar();
    }


    return resultado;
}

module.exports = crearLista;