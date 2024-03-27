
/*
    Consulta la base de datos para verificar si un email dado existe en la base de datos.
*/

const conexionMDB = require('./conexionMDB');

async function emailExiste(email) {
    const clienteMDB = conexionMDB.conectar();
    const coleccionUsuarios = clienteMDB.db('coupleMubis').collection('usuarios');

    const resultado = await coleccionUsuarios.findOne({ email: email });

    await conexionMDB.desconectar();

    return resultado === null ? false : true;
}


module.exports = emailExiste;