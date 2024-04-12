
/*
    Toma un numero entero indicado la imagen de perfil deseada del diccionario definido en este mismo archivo.
*/

const imagenesPerfil = {
    1: 'anonimo.jpg',
    2: 'mapache.jpg',
    3: 'zorro.jpg',
    4: 'mapache.jpg',
    5: 'jirafa.jpg',
    6: 'foca.jpg',
    7: 'topo.jpg',
    8: 'hormiga.jpg',
    9: 'hongos.jpg',
    10: 'pez.jpg',
    11: 'ballena.jpg',
    12: 'tigre.jpg',
    13: 'hornitorrinco.jpg',
    14: 'oso.jpg',
    15: 'marmota.jpg',
}

function obtenerImgPerfil(imgPerfilID) {
    if(imgPerfilID < 0 || imgPerfilID > 15) return imagenesPerfil[1];

    return imagenesPerfil[imgPerfilID];
}

module.exports = obtenerImgPerfil;