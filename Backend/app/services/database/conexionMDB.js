const { MongoClient } = require("mongodb");

const DB_PROVIDER = process.env.DB_PROVIDER;
const DB_PORT = process.env.DB_PORT;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

const DB_URI = `${DB_PROVIDER}://${DB_USER}:${DB_PASSWORD}@localhost:${DB_PORT}/`;

//let client;
const client = new MongoClient(DB_URI);
console.log("Cliente MongoDB creado.");

function conectar() {
    // En la nueva version de MongoDB ya no se necesita .connect()
    // Se modifico para usar mongoDB connection Pool:
    //client = new MongoClient(DB_URI);
    //console.log("Conexion MDB establecida.");
    return client;
}

async function desconectar() {
    //await client.close();
    //console.log("Conexion MDB finalizada.");
    console.log("La conexion no se cerrara.");
}


module.exports = {
    conectar,
    desconectar
}