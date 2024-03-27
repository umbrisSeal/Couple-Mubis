
/*
    Recibe una Clave de Accesso y verifica si existe y es valida. en la base de datos.
*/

const conexionMDB = require('./conexionMDB');

async function validarClave(clave) {
    const clienteMDB = conexionMDB.conectar();
    const coleccionClaves = clienteMDB.db('coupleMubis').collection('clavesAcceso');

    let resultado;

    try {
        resultado = await coleccionClaves.findOne({ clave: clave });

    } catch {
        console.log("Error al intentar consultar clave de acceso.");

    } finally {
        conexionMDB.desconectar();

    }

    return (resultado !== null && resultado?.valida) ? true : false;
}

module.exports = validarClave;