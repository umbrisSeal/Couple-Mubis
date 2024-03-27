
/*
    Recibe un correo electronico y un password
*/

const hashearPassword = require("../../helpers/hashearPassword");
const conexionMDB = require("./conexionMDB");

async function validarPassword(password, email) {
    const clienteMDB = conexionMDB.conectar();
    const coleccionUsuarios = clienteMDB.db('coupleMubis').collection('usuarios');

    let resultado;

    try {
        const {password, salt} = await coleccionUsuarios.findOne({ email: email });
        resultado = {password, salt};

    } catch {
        console.log("Error al intentar obtener datos del usuario.");
        resultado = null;
    } finally {
        conexionMDB.desconectar();
    }

    if(resultado !== null) {
        const passwordHasheado = (await hashearPassword(password, resultado.salt)).hash;

        return passwordHasheado === resultado.password ? true : false;
    } else {
        return false;
    }
}

module.exports = validarPassword;