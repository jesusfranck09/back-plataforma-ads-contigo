
const client  = require('../database');
const bcrypt =  require('bcrypt');
const puppeteer = require('puppeteer');
const nodemailer = require("nodemailer")
const {jsonwebtoken} = require('../utils/index');
const SALT_WORK_FACTOR =10

const signupAlfa = (data) => {
    console.log("esto contiene data:",data)
 return new Promise((resolve,reject) =>{
    // console.log("esto contiene data:",data[0], )
     bcrypt.genSalt(SALT_WORK_FACTOR,function(error,salt){
         if (error){    
              reject(error,{message:'error',token:error})
         } else{
             bcrypt.hash(data[3],salt, function(error,hash){
              //   console.log("data[6]" , data[6])
                 if(error){
                    throw error
                 } else{
                   //  let idAdmin = parseInt(data[7]);
                  //  console.log(`insert into administrador(nombre,apellidos,razonSocial,RFC,telefono,correo,statusCorreo,contraseña,fk_adminGral) values ('${data[0]}','${data[1]}','${data[2]}','${data[3]}','${data[4]}','${data[5]}','TRUE' , '${hash}',${idAdmin})`)
                    client.query(`insert into adminAlfa(nombre,apellido,correo,contraseña,fk_empresa) values ('${data[0]}','${data[1]}','${data[2]}','${hash}','${data[4]}')`);
                  
                       resolve({           
                        message:"el registro en signup fue exitoso",

                     })
                       
                 }
             })
         }

     })
     
 })   
} 
const signupEmpresas = (data) => {
    console.log("esto contiene data:",data)
 return new Promise((resolve,reject) =>{
    // console.log("esto contiene data:",data[0], )
     bcrypt.genSalt(SALT_WORK_FACTOR,function(error,salt){
         if (error){    
              reject(error,{message:'error',token:error})
         } else{
             bcrypt.hash(data[4],salt, function(error,hash){
              //   console.log("data[6]" , data[6])
                 if(error){
                    throw error
                 } else{
                   //  let idAdmin = parseInt(data[7]);
                  //  console.log(`insert into administrador(nombre,apellidos,razonSocial,RFC,telefono,correo,statusCorreo,contraseña,fk_adminGral) values ('${data[0]}','${data[1]}','${data[2]}','${data[3]}','${data[4]}','${data[5]}','TRUE' , '${hash}',${idAdmin})`)
                    client.query(`insert into empresas(rfc,razonSocial,correo,telefono,contraseña) values ('${data[0]}','${data[1]}','${data[2]}','${data[3]}','${hash}')`);
                  
                       resolve({           
                        message:"el registro en signup fue exitoso",

                     })
                       
                 }
             })
         }

     })
     
 })   
} 


const loginAdminAlfa  = async  data =>{
    console.log('esto es la data',data)
  return new Promise((resolve,reject) =>{ 

   //console.log(' esta es la query',`select * from clientes where correo='${data[0]}' and contraseña = '${data[1]}'`,
   

   client.query(`select * from adminAlfa where correo='${data[0]}'`,
   function(err,results,field){
    if(err){ reject(err)
   //console.log("error", err)
   }

       var string = JSON.stringify(results)

       var resultados=JSON.parse(string);

       if(resultados[0]){
        console.log("resultados",resultados[0])


           bcrypt.compare(data[1],resultados[0].contraseña,function(error,result){
               if(result){
                    resolve({
                    id_admin:resultados[0].id_admin,
                    nombre:resultados[0].nombre,
                    apellido:resultados[0].apellido,                   
                    correo:resultados[0].correo,                   
                    message:"login exitoso",
                    token:jsonwebtoken(resultados[0].correo), //coreo data[0]]
                    fk_empresa:resultados[0].fk_empresa,
            })
               } else{ 
                   resolve({message:"usuario y contraseña incorrecto", token:"no hay token"})
               }
           })
         //no existe el usuario "correo y contraseña"
       
       }else{
           resolve({
               message:"usuario no encontrado ",             
            })
       }   
   })
} )

}

const loginEmpresas = async  data =>{
    console.log('esto es la data',data)
  return new Promise((resolve,reject) =>{ 

   //console.log(' esta es la query',`select * from clientes where correo='${data[0]}' and contraseña = '${data[1]}'`,
   

   client.query(`select * from empresas where correo='${data[0]}'`,
   function(err,results,field){
    if(err){ reject(err)
   //console.log("error", err)
   }

       var string = JSON.stringify(results)

       var resultados=JSON.parse(string);

       if(resultados[0]){
        console.log("resultados",resultados[0])


           bcrypt.compare(data[1],resultados[0].contraseña,function(error,result){
               if(result){
                    resolve({
                    id_empresa:resultados[0].id_empresa,
                    rfc:resultados[0].rfc,
                    razonSocial:resultados[0].razonSocial,                   
                    correo:resultados[0].correo,  
                    telefono:resultados[0].telefono,                
                    message:"login exitoso",
                    token:jsonwebtoken(resultados[0].correo) //coreo data[0]]
   
            })
               } else{ 
                   resolve({message:"usuario y contraseña incorrecto", token:"no hay token"})
               }
           })
         //no existe el usuario "correo y contraseña"
       
       }else{
           resolve({
               message:"usuario no encontrado ",
             
            })
       }   
   })
} )

}
const getTablaClientes   = ( data)  => {
    return new Promise((resolve,reject)=>{
        client.query(`select * from clientes`, function (err,results,fields ) {
            
            var string = JSON.stringify(results)
            var resultados=JSON.parse(string);

            resolve(resultados)
            console.log("resultados",resultados)
        }) 
    })
    }

//     const getEmpresa = (data) => {
//     console.log('esto es la data de mi empresa',data)
//   return new Promise((resolve,reject) =>{
// //    client.query(`select * from empresas where rfc='${data[0]}'`,
// client.query(`select * from empresas `, function(err,results,field){
//     var string = JSON.stringify(results)
//     var resultados=JSON.parse(string);

//     resolve(resultados)
//     console.log("resultados",resultados)        
//    })
// } )

// }
///////////correcto///////////

const getEmpresas   = ( data)  => {
    return new Promise((resolve,reject)=>{
        
        client.query(`select * from empresas where rfc='${data[0]}'`, function (err,result,fields ) {
            
            var string = JSON.stringify(result)
            var resultados=JSON.parse(string);
          
            resolve(resultados)
            console.log("resultados",resultados)
        }) 
    })
    }

////////////////////////////

// const getEmpresas   = ( data)  => {
//     return new Promise((resolve,reject)=>{
        
//         client.query(`select * from empresas where rfc='${data[0]}'`, function (err,result,fields ) {
            
//             var string = JSON.stringify(result)
//             var resultados=JSON.parse(string);
//           if(result){
//             resolve(resultados)
//           }    else  {
//             resolve({message:"usuario  incorrecto"})
//           }      
//         }) 
//     })
//     }
const insertCotizaciones = (data)=> { 
    console.log("data de insertCotizaciones",data)
    return new Promise((resolve,reject)=>{  

        var nodemailer = require('nodemailer');
        var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
               user: 'cotizacionesads20@gmail.com',
               pass: 'programacion2021'
           }
       });
      
        var mailOptions = {
           
            from: 'cotizacionesads20@gmail.com', // sender address
            to:'lizcuevas68@gmail.com', // list of receivers
            subject: 'Bienvenido a nuestras cotizacions ✔', // Subject line
            text: 'Hello world  de parte de nuestra primera prueba?', // plaintext body
            html: '<b>Hello world ?</b>' // html body
        };
  
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                return console.log(error);
            }
            console.log('Message sent: ' + info);
        });

        
      
//********************************** */
// const nodemailer = require("nodemailer");

// // async..await is not allowed in global scope, must use a wrapper
// async function main() {
//   // Generate test SMTP service account from ethereal.email
//   // Only needed if you don't have a real mail account for testing
//   let testAccount = await nodemailer.createTestAccount();

//   // create reusable transporter object using the default SMTP transport
//   let transporter = nodemailer.createTransport({
//     host: "smtp.ethereal.email",
//     port: 535,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: 'cotizacionesads20@gmail.com', // generated ethereal user
//       pass: 'programacion2021', // generated ethereal password
//     },
//   });

//   // send mail with defined transport object
//   let info = await transporter.sendMail({
//     from: 'cotizacionesads20@gmail.com', // sender address
//     to: "lizcuevas68@gmail.com", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>", // html body
//   });

//   console.log("Message sent: %s", info.messageId);
//   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//   // Preview only available when sending through an Ethereal account
//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
// }

// main().catch(console.error);






// *************************************
        var date= new Date()
        let fecha = date.toLocaleString('es')
        
    //    console.log("fecha", fecha)
    client.query(`insert into cotizaciones(rfc,razonSocial,nombre,apellidos,correo1,correo2,telefono1,telefono2,servicio,precio,iva,total,promocion,vendedor,fecha,fk_adminalfa) values('${data[0]}','${data[1]}','${data[2]}','${data[3]}','${data[4]}','${data[5]}','${data[6]}','${data[7]}','${data[8]}','${data[9]}','${data[10]}','${data[11]}','${data[12]}','${data[13]}','${fecha}','${data[14]}')`) 
      
    resolve({message:"registro exitoso"})
    })
    }

      const getCotizacionesTabla  = ( data)  => {
            console.log("data",data)
            return new Promise((resolve,reject)=>{
                client.query(`select * from cotizaciones where fk_adminalfa='${data[0]}'` , function (err,results,fields ) {            
                    var string = JSON.stringify(results)
                    var resultados=JSON.parse(string);    
                    resolve(resultados)
                    console.log("resultados",resultados)
                   
                }) 
            })
            }

            const getIdCotizacion  = ( data)  => {
            console.log("data",data)
            return new Promise((resolve,reject)=>{
                client.query(`select * from cotizaciones where id_cotizacion='${data[0]}'` , function (err,results,fields ) {            
                    var string = JSON.stringify(results)
                    var resultados=JSON.parse(string);    
                    resolve(resultados)
                    console.log("resultados",resultados)
                   
                }) 
            })
            }

            const getClienteRFC   = ( data)  => {
                return new Promise((resolve,reject)=>{
                    
                    client.query(`select * from clientes where rfc='${data[0]}'`, function (err,result,fields ) {
                        
                        var string = JSON.stringify(result)
                        var resultados=JSON.parse(string);
                      
                        resolve(resultados)
                        console.log("resultados",resultados)                        
                        
                    }) 
                })
                }

            const insertClientes = (data)=> { 
                console.log("data de inserClientes",data)
                return new Promise((resolve,reject)=>{  
                    //  let fk_empresas =(data[8]); 
                    //  console.log("fk_empresas back",fk_empresas) 
                            
            
                 client.query(`insert into clientes (rfc,empresa,nombre,apellido,correo1,correo2,telefono1,telefono2) values('${data[0]}','${data[1]}','${data[2]}','${data[3]}','${data[4]}','${data[5]}','${data[6]}','${data[7]}')`) 
              //  client.query(`insert into clientes (rfc,empresa,nombre,apellido,correo1,correo2,telefono1,telefono2) values('${data[0]}','${data[1]}','${data[2]}','${data[3]}','${data[4]}','${data[5]}','${data[6]}','${data[7]}')`) 
                
                
                    resolve({message:"registro exitoso"})
                })
                }

                const deleteCliente   = ( data)  => {
                    return new Promise((resolve,reject)=>{
                        
                        client.query(`delete from clientes where id_cliente='${data[0]}'`, function (err,result,fields ) {
                            
                            var string = JSON.stringify(result)
                            var resultados=JSON.parse(string);
                        
                            resolve(resultados)
                            console.log("resultados",resultados)                        
                            
                        }) 
                    })
                    }

                    const updateCliente   = ( data)  => {
                        return new Promise((resolve,reject)=>{
                            
                            client.query(`update clientes  set  rfc= '${data[1]}' , empresa='${data[2]}', nombre= '${data[3]} ', apellido='${data[4]}',correo1='${data[5]}',correo2='${data[6]}',telefono1='${data[7]}', telefono2='${data[8]}' where id_cliente='${data[0]}'`,  function (err,result,fields ) {
                                
                                var string = JSON.stringify(result)
                                var resultados=JSON.parse(string);
                            
                                resolve(resultados)
                                console.log("resultados",resultados)                        
                                
                            }) 
                        })
                        }

                        const getProductoServicio   = ( data)  => {
                            return new Promise((resolve,reject)=>{
                                
                                client.query(`select * from productoServicio where id_productoServicio='${data[0]}'`,  function (err,result,fields ) {
                                    
                                    var string = JSON.stringify(result)
                                    var resultados=JSON.parse(string);
                                
                                    resolve(resultados)
                                    console.log("resultados",resultados)                        
                                    
                                }) 
                            })
                            }

                        const  getTablaProductoServicio  = ( data)  => {
                            return new Promise((resolve,reject)=>{
                                
                                client.query(`select * from productoServicio`,  function (err,result,fields ) {
                                    
                                    var string = JSON.stringify(result)
                                    var resultados=JSON.parse(string);
                                
                                    resolve(resultados)
                                    console.log("resultados",resultados)                        
                                    
                                }) 
                            })
                            }
                            
    

                        
                

module.exports={ 
    getTablaProductoServicio,
    getProductoServicio,
    updateCliente,
    deleteCliente,
    signupEmpresas,  
    signupAlfa,
    loginAdminAlfa,
    loginEmpresas,
    getTablaClientes,
    // getEmpresa,
    insertCotizaciones,
    getEmpresas,
    getCotizacionesTabla,
    getIdCotizacion,
    getClienteRFC,
    insertClientes   

}