
/*
    Consulta la base de datos para verificar si un email dado existe en la base de datos.
*/

const conexionMDB = require('./conexionMDB');

async function emailExiste(email) {
    const clienteMDB = conexionMDB.conectar();
    


    await conexionMDB.desconectar();
}


module.exports = emailExiste;