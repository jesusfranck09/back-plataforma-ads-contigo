var mysql = require ('mysql')

var coneccion= mysql.createConnection({
    database:'directorioalfa',
    host:'localhost',
    user:'root',
    password:'user'
})

coneccion.connect(function(error){
   console.log('este es el error',error)
   if(error) throw error   
   console.log('conectado a la base de datos')
})
module.exports=coneccion
