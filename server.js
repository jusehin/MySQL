const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const Sequelize = require("sequelize");
const sequelize = new Sequelize("mysql://root:@localhost:3306/acamica");

app.use(bodyParser.json())

/*------------------AGREGAR UNA CANCIÓN-----------------*/
app.post("/song/add", (req, res) => {
    const { nombre, duracion, album, banda, fecha_publicacion } = req.body
    sequelize.query("INSERT INTO canciones(nombre, duracion, album, banda, fecha_publicacion) VALUES (?,?,?,?,?)", { replacements: [nombre, duracion, album, banda, fecha_publicacion] }).then(resultados =>
        console.log(resultados));
    res.status(201).json(req.body)
})

/*------------------MODIFICAR UNA CANCIÓN POR SU ID-----------------*/
app.put("/song/modify/:id_song", (req, res) => {
    const { nombre, duracion, album, banda, fecha_publicacion } = req.body
    let id = req.params.id_song
    sequelize.query(`UPDATE canciones SET nombre = "${nombre}", duración = "${duracion}", album = ${album}, banda = ${banda}, fecha_publicación = "${fecha_publicacion}"  WHERE id = ${id}`, { replacements: [nombre, duracion, album, banda, fecha_publicacion] }).then(projects => console.log(projects))
    res.status(201).json(req.body)
})

/*------------------ELIMINAR UNA CANCIÓN POR SU ID-----------------*/
app.delete("/song/delete/:id_song", (req, res) => {
    let id = req.params.id_song
    sequelize.query("DELETE FROM canciones WHERE id = ?", { replacements: [id] }).then(projects => console.log(projects))
    res.status(201).json("Canción eliminada")
})

/*------------------RETORNAR TODAS LAS CANCIONES--------------------*/
app.get("/songs", (req, res) => {
    sequelize.query("SELECT * FROM canciones", { type: sequelize.QueryTypes.SELECT }).then(resultados => res.status(201).json(resultados))
})

/*------------------BUSCAR UNA CANCIÓN POR SU NOMBRE-----------------*/
//Esta búsqueda se hace por query string
app.get("/song", (req, res) => {
    let querySongName = req.query.nombre
    sequelize.query("SELECT * FROM canciones WHERE nombre = ?", { replacements: [querySongName], type: sequelize.QueryTypes.SELECT }).then(resultados => res.status(201).json(resultados))
})

//Esta búsqueda se hace por parámetro
app.get("/song/:name", (req, res) => {
    let songName = req.params.name
    sequelize.query("SELECT * FROM canciones WHERE nombre = ?", { replacements: [songName], type: sequelize.QueryTypes.SELECT }).then(resultados => res.status(201).json(resultados))
})

app.listen(3000, () => {
    console.log("Server running")
})