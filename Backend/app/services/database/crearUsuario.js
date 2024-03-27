
const generarID = require('../../helpers/generarID');
const hashearPassword = require('../../helpers/hashearPassword');
const obtenerFechaActual = require('../../helpers/obtenerFechaActual');
const conexionMDB = require('./conexionMDB');

async function crearUsuario(datos) {
    const clienteMDB = conexionMDB.conectar();
    const coleccionUsuarios = clienteMDB.db('coupleMubis').collection('usuarios');
    const coleccionClaves = clienteMDB.db('coupleMubis').collection('clavesAcceso');

    let resultado;
    let operacionExitosa = false;

    const passwordHash = await hashearPassword(datos.password);

    const nuevoUsuario = {
        userID: generarID(),
        usuario: datos.usuario,
        email: datos.email,
        password: passwordHash.hash,
        salt: passwordHash.salt,
        fechaCreacion: obtenerFechaActual(),
        imgPerfilID: Math.floor(Math.random() * 15),
        alias: '',
        usarAlias: false,
        usarPrivacidad: true,
        bibliografia: '',
        puntosXP: 0,
        idiomaBusqueda: 0,
        amigos: [],
        invitaciones: [],
        listas: [],
        bloqueados: [],
        estadoCuenta: 1,
        iniciosFallidos: 0,
        reinicioIntentos: obtenerFechaActual(),
    }

    try {
        resultado = await coleccionUsuarios.insertOne( nuevoUsuario );
        await coleccionClaves.updateOne({ clave: datos.clave }, { $set: { valida: false }});    // Invalidar clave una vez usada.
        operacionExitosa = true;

    } catch(error) {
        console.log("Error al intentar crear un nuevo usuario. Error: ", error);
        console.log(error.errorResponse.errInfo.details.schemaRulesNotSatisfied[0]);

    } finally {
        conexionMDB.desconectar();
        return operacionExitosa;
    }
}


module.exports = crearUsuario;