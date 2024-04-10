const actualizarColaboradores = require("../services/database/actualizarColaboradores");
const obtenerLista = require("../services/database/obtenerLista");

async function editarEditoresModel(request) {

    const userID = request.userID;
    const {listaID, nuevosEditores, nuevosLectores} = request.body;
    
    const datosLista = await obtenerLista(listaID);

    if(datosLista.dueño !== userID) return false;

    const usuariosRepetidos = nuevosEditores.filter((nuevoEditor) => {
        return nuevosLectores.includes(nuevoEditor);
    });
    if(usuariosRepetidos.length > 0) return false;  // Hay al menos 1 usuario que sera editor y lector al mismo tiempo.

    // Generar lista de editores a agregar y eliminar.
    const agregarEditores = nuevosEditores.filter((nuevoEditor) => {
        return !datosLista.editores.includes(nuevoEditor);
    });
    const agregarLectores = nuevosLectores.filter((nuevoLector) => {
        return !datosLista.lectores.includes(nuevoLector);
    });
    const borrarEditores = datosLista.editores.filter((editorActual) => {
        return !nuevosEditores.includes(editorActual);
    });
    const borrarLectores = datosLista.lectores.filter((lectorActual) => {
        return !nuevosLectores.includes(lectorActual);
    });

    const configuracionColaboradores = {listaID, agregarEditores, agregarLectores, borrarEditores, borrarLectores};

    request.resultado = await actualizarColaboradores(configuracionColaboradores);

    return;
}

module.exports = editarEditoresModel;

/*
 Formato en el que viene la informacion de la lista en el body del request.
 (Para actualizar editores manda un objeto con editores y lectores)
 (Para actualizar peliculas manda un objeto con el arreglo peliculas y asigna los valores requeridos.).
return {
    nombre: 'Para maratonear!!!',
    autoridad: 3,
    esPublica: true,
    editores: [
        {id: '12RFGTH', nombre: 'Mario Bros', imgPerfil: 'anonimo.png'},
        {id: '1GT67LO', nombre: 'Michael Jackson', imgPerfil: 'anonimo.png'},
        {id: 'GKBIE90', nombre: 'Tea-Bean', imgPerfil: 'anonimo.png'},
    ],
    lectores: [
        {id: 'EGGRGTA', nombre: 'Jose Jose', imgPerfil: 'anonimo.png'},
        {id: 'RIGNOTA', nombre: 'Ringo Star', imgPerfil: 'anonimo.png'},
    ],
    peliculas: [
        {id: 4312, vista: false, urlPoster: 'pmjiwwfT7kRJQ0ATi79upBmSOO9.jpg', titulo: 'Nosotros los Inocentes', año: 1200},
        {id: 4321, vista: false, urlPoster: 'zaqam2RNscH5ooYFWInV6hjx6y5.jpg', titulo: 'luigi', año: 2000},
        {id: 4321, vista: false, urlPoster: '3bhkrj58Vtu7enYsRolD1fZdja1.jpg', titulo: 'peach', año: 2012},
        {id: 4321, vista: false, urlPoster: 'lgEXNBnFsq8oTck1C2giSvnTjzz.jpg', titulo: 'bowser', año: 2011},
        {id: 4321, vista: true, urlPoster: 'vSzOobYVu16MogSALNg1bjTaGc.jpg', titulo: 'monkey', año: 2009},
        {id: 4321, vista: true, urlPoster: 'bhjuTUPgY9S21yDDfRe3PeEYlYY.jpg', titulo: 'billbullet', año: 2009},
        {id: 4321, vista: true, urlPoster: 'bhjuTUPgY9S21yDDfRe3PeEYlYY.jpg', titulo: 'billbullet', año: 2009},
        {id: 4321, vista: true, urlPoster: 'bhjuTUPgY9S21yDDfRe3PeEYlYY.jpg', titulo: 'billbullet', año: 2009},
        {id: 4321, vista: true, urlPoster: 'bhjuTUPgY9S21yDDfRe3PeEYlYY.jpg', titulo: 'billbullet', año: 2009},
        {id: 4321, vista: true, urlPoster: 'bhjuTUPgY9S21yDDfRe3PeEYlYY.jpg', titulo: 'billbullet', año: 2009},
    ],
}
*/