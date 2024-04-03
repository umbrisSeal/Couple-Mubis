
const obtenerImgPerfil = require("../helpers/obtenerImgPerfil");
const obtenerNombreUsuario = require("../services/database/obtenerNombreUsuario");

async function obtenerListaView(userID, datos, response) {

    const datosLista = datos.datosLista;
    const datosEditores = datos.datosEditores;
    const datosLectores = datos.datosLectores;

    let lista = {};
    lista.nombre = datosLista.nombre;

    // Autoridad: si es dueño 3, si es editor 2, si es lector 1, si no aparece 0.
    if(datosLista.dueño === userID) {
        lista.autoridad = 3;
    } else if(datosLista.editores.includes(userID)) {
        lista.autoridad = 2;
    } else if(datosLista.lectores.includes(userID)) {
        lista.autoridad = 1;
    } else {
        lista.autoridad = 0;
    }

    if(lista.autoridad === 0 && lista.esPrivada) {
        response.status(403).send("No tiene los permisos necesarios para ver esta lista.");
        return;
    }

    lista.esPublica = !datosLista.esPrivada;

    /*
    No se pueden usar async await o Promises, o cualquier otro tipo de funcion asyncrona dentro de ningun ciclo de iteracion que no sea For.
    lista.editores = datosLista.editores.map(async (editorID) => {
        return await obtenerNombreUsuario(editorID);
    })
    */

    lista.editores = [];
    lista.lectores = [];

    for(let i = 0; i < datosEditores.length; i++) {
        const editorId = datosEditores[i].userID;
        const editorNombre = await obtenerNombreUsuario(editorId);
        const editorImgPerfil = obtenerImgPerfil(datosEditores[i].imgPerfilID);  // Necesitamos obtener el listado de imagnes.
        const objetoEditor = {
            id: editorId,
            nombre: editorNombre,
            imgPerfil: editorImgPerfil,
        };
        lista.editores.push(objetoEditor);
    }

    for(let i = 0; i < datosLectores.length; i++) {
        const lectorId = datosLectores[i].userID;
        const lectorNombre = await obtenerNombreUsuario(lectorId);
        const lectorImgPerfil = obtenerImgPerfil(datosLectores[i].imgPerfilID);
        const objetoLector = {
            id: lectorId,
            nombre: lectorNombre,
            imgPerfil: lectorImgPerfil,
        };
        lista.lectores.push(objetoLector);
    }

    lista.peliculas = datosLista.peliculas;

    response.status(200).json(lista);
    return;
}

module.exports = obtenerListaView;