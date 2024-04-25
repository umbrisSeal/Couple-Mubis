
function iniciarSesionView(tokens, response) {
    const tiempoExpiracionMilisegundos = 30 * 24 * 60 * 60 * 1000; // 30 dias.

    response.clearCookie('idToken');
    response.clearCookie('sessionToken');

    response.cookie('idToken', tokens.idToken, {
        maxAge: tiempoExpiracionMilisegundos,
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
    });
    response.cookie('sessionToken', tokens.sessionToken, {
        maxAge: tiempoExpiracionMilisegundos,
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
    });

    response.status(200).send("Has iniciado sesion correctamente. Se le enviado sus tokens.");
}

module.exports = iniciarSesionView;