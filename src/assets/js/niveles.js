
const nombresNiveles = [
    'Estudiante de Cine',
    'Aficionado al Séptimo Arte',
    'Amante del Cine',
    'Entusiasta Cinéfilo',
    'Crítico de Cine',
    'Maestro de la Pantalla Grande',
    'Cineasta Experto',
    'Gurú del Cine',
    'Estrella de Cine',
    'Director Cinematográfico'
]

const experienciaRequerida = [
    50,
    100,
    150,
    200,
    250,
    300,
    400,
    500,
    750,
    1000
]


export function obtenerNivel(xp) {

    const nivelActual = experienciaRequerida.reduce((nivelAcumulado, xpNecesaria, index, arreglo) => {

        if(nivelAcumulado.limiteAlcanzado) return nivelAcumulado;

        if(nivelAcumulado.xpRestante - xpNecesaria >= 0) {
            if(index === arreglo.length-1) {
                // Se ha superado el ultimo nivel, se asigna el rango maximo.
                return {
                    nombreNivel: nombresNiveles[index],
                    xpRestante: nivelAcumulado.xpRestante - xpNecesaria,
                    nivel: index+1,
                    limiteAlcanzado: true
                }
            } else {
                // Nuevo nivel alcanzado, se resta el xpRestante para el siguiente nivel.
                return {
                    xpRestante: nivelAcumulado.xpRestante - xpNecesaria,
                }
            }

        } else {
            // Asignar nivel actual y conservar la xpRestante.
            return {
                nombreNivel: nombresNiveles[index],
                xpRestante: nivelAcumulado.xpRestante,
                xpSiguienteNivel: xpNecesaria,
                nivel: index+1,
                limiteAlcanzado: true,
            }
        }

    }, {xpRestante: xp, limiteAlcanzado: false});

    return {
        nombreNivel: nivelActual.nombreNivel,
        xpRestante: nivelActual.xpRestante,
        xpSiguienteNivel: nivelActual.xpSiguienteNivel,
        nivel: nivelActual.nivel
    }
}