var mysql = require('mysql');
var con = mysql.createPool({
    database: "baseplataforma",
    host: "baseplataforma.cgeovhwjvxf3.us-east-1.rds.amazonaws.com",
    user: "Franck",
    password: "Programacion2020",
    connectionLimit: 10,
    connectTimeout: 30000 // Aumenta el tiempo de espera a 30 segundos
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


