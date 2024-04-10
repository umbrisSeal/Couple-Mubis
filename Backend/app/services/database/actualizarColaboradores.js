
/*
    Debe recibir un objeto que contena 4 arreglos: agregarEditores, agregarLectores, borrarEditores, borrarLectores, que contienen userIDs y un listaID.
*/

const objetoVacio = require("../../helpers/objetoVacio");
const conexionMDB = require("./conexionMDB");

async function actualizarColaboradores(configuracionColaboradores) {

    const {agregarEditores, agregarLectores, borrarEditores, borrarLectores, listaID} = configuracionColaboradores;

    // Revisar si se requiere hacer alguna actualizacion.
    if(objetoVacio(agregarEditores) && objetoVacio(agregarLectores) && objetoVacio(borrarEditores) && objetoVacio(borrarLectores)) {
        return true;
    }

    const clienteMDB = conexionMDB.conectar();
    const coleccionUsuarios = clienteMDB.db('coupleMubis').collection('usuarios');
    const coleccionListas = clienteMDB.db('coupleMubis').collection('listas');

    let resultado;


    try {
        // Eliminando la referencia de la listaID en los editores y lectores a borrar:
        await coleccionUsuarios.updateMany(
            {userID: {$in: [...borrarEditores, ...borrarLectores]}},
            {$pull: {listas: listaID}}
        );
        // Eliminando las referencias de userIDs en la lista:
        await coleccionListas.updateOne(
            {listaID: listaID},
            {
                $pull: {editores: {$in: borrarEditores}, lectores: {$in: borrarLectores}}
            }
        );
        // Agregando las nuevas referencias de userIDs a la lista:
        await coleccionListas.updateOne(
            {listaID: listaID},
            {
                $push: {editores: {$each: agregarEditores}, lectores: {$each: agregarLectores}}
            }
        );
        // Agregando la referencia de la listaID a los nuevos editores y lectores:
        await coleccionUsuarios.updateMany(
            {userID: {$in: [...agregarEditores, ...agregarLectores]}},
            {$push: {listas: listaID}}
        );

        resultado = true;

    } catch(error) {
        resultado = false;
    } finally {
        conexionMDB.desconectar();
    }


    return resultado;
}

module.exports = actualizarColaboradores;