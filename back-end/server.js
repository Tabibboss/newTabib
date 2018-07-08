// Express es el Web Framework (permite crear un web server para recibir y enviar datos en la web)
var express = require('express');
var app = express();
// body-parser es un middleware para Express que sirve para interpretar los datos que recibirá el servicio en distintos formatos (objetos JSON, archivos, etc.)
var bodyParser = require('body-parser');
app.use(bodyParser.json());

// Habilitar CORS (Cross-Origin Requests)
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
});


// Sequelize es en ORM Framework para Bases de Datos relaciones (permite manipular las tablas de una base de datos como objetos en la aplicación)
var Sequelize = require('sequelize');
// var myDatabase = new Sequelize('rami', 'root', '12345678'); // database, user, password

var myDatabase = new Sequelize("rami", 'root', '12345678', {
    host: "localhost",
    dialect: "mysql",
    logging: function () {},
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },

    define: {
        paranoid: true
    }
});



// Crear Modelos (Tablas) y rutas (endpoints)
require('./models/usuario')(app, myDatabase);



// Proveer los archivos del front-end CUANDO SE HALLAN COMPILADO
app.use('/', express.static(__dirname + '/../front-end/release'));


// Iniciar el servidor
var puerto = 4000;
app.listen(puerto, function() {
	console.log("Run In Port: " + puerto);
});
