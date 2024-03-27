
/*
    Devuelve toda la informacion de un usuario a partir de su ID de usuario o su email.
*/

const verificarCorreo = require("../../validations/verificarCorreo");
const conexionMDB = require('./conexionMDB');

async function consultaUsuario(referenciaUsuario) {
    const regexIdUsuario = /^[A-Z0-9]{10}$/;

    const clienteMDB = conexionMDB.conectar();
    const coleccionUsuarios = clienteMDB.db('coupleMubis').collection('usuarios');

    let resultado;

    if(verificarCorreo(referenciaUsuario)) {
        // Buscar por correo.
        try {
            resultado = await coleccionUsuarios.findOne({email: referenciaUsuario});
        } catch {
            resultado = null;
        }

    } else if(regexIdUsuario.test(referenciaUsuario)) {
        // Buscar por userID.
        try {
            resultado = await coleccionUsuarios.findOne({userID: referenciaUsuario});
        } catch {
            resultado = null;
        }
    } else {
        // La referencia es incorrecta.
        resultado = null;
    }

    conexionMDB.desconectar();
    return resultado === null ? {} : resultado;
}

module.exports = consultaUsuario;


/*
  const query = { $or: [{ name: 'myValue' }, { age: 'myValue' }] };
*/