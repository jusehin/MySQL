const Sequelize = require("sequelize");
const sequelize = new Sequelize("mysql://root:@localhost:3306/acamica");

sequelize.query("SELECT * FROM bandas", { type: sequelize.QueryTypes.SELECT }).then(resultados => console.log(resultados))

sequelize.query("SELECT * FROM bandas WHERE integrantes > :integrantes", { replacements: { integrantes: 5 }, type: sequelize.QueryTypes.SELECT }).then(projects => console.log(projects))

sequelize.query("SELECT * FROM bandas WHERE nombre = ?", { replacements: ["The Cranberries"], type: sequelize.QueryTypes.SELECT }).then(projects => console.log(projects))

sequelize.query("UPDATE bandas SET integrantes = 10 WHERE nombre = ?", { replacements: ["Hercules and Love Affair"] }).then(projects => console.log(projects))

sequelize.query("DELETE FROM banda WHERE nombre = ?", { replacements: ["Otra banda"] }).then(resultados => console.log(resultados))

sequelize.query("INSERT INTO bandas(nombre, integrantes, fecha_inicio) VALUES (?,?,?)", { replacements: ["Otra banda", "23", "2014-02-02"] }).then(function(resultados) {
    console.log(resultados)
})