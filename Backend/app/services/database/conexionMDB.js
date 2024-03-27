const { MongoClient } = require("mongodb");

const DB_PROVIDER = process.env.DB_PROVIDER;
const DB_PORT = process.env.DB_PORT;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

const DB_URI = `${DB_PROVIDER}://${DB_USER}:${DB_PASSWORD}@localhost:${DB_PORT}/`;

const client = new MongoClient(DB_URI);

function conectar() {
    // En la nueva version de MongoDB ya no se necesita .connect()
    console.log("Conexion MDB establecida.");
    return client;
}

async function desconectar() {
    await client.close();
    console.log("Conexion MDB finalizada.");
}


module.exports = {
    conectar,
    desconectar
}