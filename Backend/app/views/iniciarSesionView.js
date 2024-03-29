
function iniciarSesionView(tokens, response) {
    const tiempoExpiracionMilisegundos = 30 * 24 * 60 * 60 * 1000; // 30 dias.

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
    })

    response.status(200).send("Has iniciado sesion correctamente. Se le enviado sus tokens.");
}

module.exports = iniciarSesionView;

/*
    For testing in browser:
    Recieved:
    Set-Cookie: idToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbklEIjoiV1ZIVkhCQlRITEVPSTNJS1VDVlkiLCJ1c2VySUQiOiJUSEtDMFdJR0NHIiwiaWF0IjoxNzExNjYwMjA0LCJleHAiOjE3MTQyNTIyMDQsImlzcyI6Imh0dHBzOi8vd3d3LnJlZnVnaW8xNC5jb20ifQ.yeHxCIxhixKJOFFMFQaurlEdWF0S_zb539X2BiEodJ4; Max-Age=2592000; Path=/; Expires=Sat, 27 Apr 2024 21:10:04 GMT; HttpOnly; Secure; SameSite=Strict

    Set-Cookie: sessionToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbklEIjoiVVlORFQzTVhUT1pTTEVWVVQ0RVciLCJzZXNzaW9uSUQiOiJWWTBNOEVYUFRZOVZBMklCSk01SVlKWjI1TUNQMzIiLCJpYXQiOjE3MTE2NjAyMDQsImV4cCI6MTcxMTY2MjAwNCwiaXNzIjoiaHR0cHM6Ly93d3cucmVmdWdpbzE0LmNvbSJ9.aFSfgD6mROX7CNYcsdHETASMw_yimcx1iwuEceOkHyY; Max-Age=2592000; Path=/; Expires=Sat, 27 Apr 2024 21:10:04 GMT; HttpOnly; Secure; SameSite=Strict

    Set:

    document.cookie = "idToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbklEIjoiV1ZIVkhCQlRITEVPSTNJS1VDVlkiLCJ1c2VySUQiOiJUSEtDMFdJR0NHIiwiaWF0IjoxNzExNjYwMjA0LCJleHAiOjE3MTQyNTIyMDQsImlzcyI6Imh0dHBzOi8vd3d3LnJlZnVnaW8xNC5jb20ifQ.yeHxCIxhixKJOFFMFQaurlEdWF0S_zb539X2BiEodJ4; expires=Sat, 27 Apr 2024 21:10:04 GMT; Max-Age=2592000; path=/; SameSite=Strict; Secure"

    document.cookie = "sessionToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbklEIjoiVVlORFQzTVhUT1pTTEVWVVQ0RVciLCJzZXNzaW9uSUQiOiJWWTBNOEVYUFRZOVZBMklCSk01SVlKWjI1TUNQMzIiLCJpYXQiOjE3MTE2NjAyMDQsImV4cCI6MTcxMTY2MjAwNCwiaXNzIjoiaHR0cHM6Ly93d3cucmVmdWdpbzE0LmNvbSJ9.aFSfgD6mROX7CNYcsdHETASMw_yimcx1iwuEceOkHyY; expires=Sat, 27 Apr 2024 21:10:04 GMT; Max-Age=2592000; path=/; SameSite=Strict; Secure"

*/