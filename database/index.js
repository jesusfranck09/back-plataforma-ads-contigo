var mysql = require('mysql');
var con = mysql.createPool({
    database: "baseplataforma", // El nombre de la base de datos en RDS
    host: "baseplataforma.cgeovhwjvxf3.us-east-1.rds.amazonaws.com", // El endpoint de tu base de datos en RDS
    user: "Franck", // Tu nombre de usuario de MySQL
    password: "Programacion2020", // Tu contraseña de MySQL
    connectionLimit: 10 // Ajusta el número de conexiones concurrentes que tu aplicación puede manejar
});

console.log("Conectado a la BD");

module.exports = con;


// var mysql = require('mysql')
// var con = mysql.createPool({
//     database:"ads_contigo_local",
//     host:"localhost",
//     user:"root",
//     password:"jesus33."
// },
//     console.log("conectado a la BD")
// ) 

// module.exports =  con;

// var mysql = require ('mysql')
// var coneccion= mysql.createConnection({
//     database:'directorioalfa',
//     host:'localhost',
//     user:'root',
//     password:'user'
// })

// coneccion.connect(function(error){
//    console.log('este es el error',error)
//    if(error) throw error   
//    console.log('conectado a la base de datos')
// })
// module.exports=coneccion


