
const express = require('express');
const token = express.Router();

const auth = require('../auth/authenticar');
const obtenerUserIdToken = require('../helpers/obtenerUserIdToken');

token.get("/", auth, (request, response) => {
    const userID = obtenerUserIdToken(request.cookies['idToken']);
    response.status(200).send(userID);
});

module.exports = token;