
function iniciarSesionView(tokens, response) {
    const tiempoExpiracionMilisegundos = 30 * 24 * 60 * 60 * 1000; // 30 dias.

    response.cookie('idToken', tokens.idToken, {
        httpOnly: true,
        maxAge: tiempoExpiracionMilisegundos,
    });
    response.cookie('sessionToken', tokens.sessionToken, {
        httpOnly: true,
        maxAge: tiempoExpiracionMilisegundos,
    })

    response.status(200).send("Has iniciado sesion correctamente. Se le enviado sus tokens.");
}

module.exports = iniciarSesionView;