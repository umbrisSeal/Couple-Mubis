const express = require('express');
const mainRouter = express.Router();




mainRouter.get("/", (req, res) => {
    res.send("Sistema activo.");
})



module.exports = mainRouter;