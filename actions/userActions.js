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
             bcrypt.hash(data[6],salt, function(error,hash){
              //   console.log("data[6]" , data[6])
                 if(error){
                    throw error
                 } else{
                   //  let idAdmin = parseInt(data[7]);
                  //  console.log(`insert into administrador(nombre,apellidos,razonSocial,RFC,telefono,correo,statusCorreo,contraseña,fk_adminGral) values ('${data[0]}','${data[1]}','${data[2]}','${data[3]}','${data[4]}','${data[5]}','TRUE' , '${hash}',${idAdmin})`)
                    client.query(`insert into adminAlfa(nombre,apellido,correo,telefono,extensionTelefonica,puesto,contraseña,fk_empresa) values ('${data[0]}','${data[1]}','${data[2]}','${data[3]}','${data[4]}','${data[5]}','${hash}','${data[7]}')`);
                  
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
             bcrypt.hash(data[6],salt, function(error,hash){
              //   console.log("data[6]" , data[6])
                 if(error){
                    throw error
                 } else{
                   //  let idAdmin = parseInt(data[7]);
                  //  console.log(`insert into administrador(nombre,apellidos,razonSocial,RFC,telefono,correo,statusCorreo,contraseña,fk_adminGral) values ('${data[0]}','${data[1]}','${data[2]}','${data[3]}','${data[4]}','${data[5]}','TRUE' , '${hash}',${idAdmin})`)
                    client.query(`insert into empresas(rfc,razonSocial,correo,telefono,paginaWeb,domicilioFiscal,contraseña) values ('${data[0]}','${data[1]}','${data[2]}','${data[3]}','${data[4]}','${data[5]}','${hash}')`);
                  
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
        client.query(`select * from clientes where fk_empresa='${data[0]}'`, function (err,results,fields ) {
            
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


const insertCotizaciones = (data)=> { 
    console.log("data de insertCotizaciones",data)
    return new Promise((resolve,reject)=>{  
        var date= new Date()
        let fecha = date.toLocaleString('es')        
       console.log("fecha", fecha)
    client.query(`insert into cotizaciones(rfc,razonSocial,nombre,apellidos,correo1,correo2,telefono1,fechaEmision,promocion) values('${data[0]}','${data[1]}','${data[2]}','${data[3]}','${data[4]}','${data[5]}','${data[6]}','${fecha}','${data[7]}')`) 
      
    resolve({message:"registro exitoso"})
    })
    }

    const insertTotales = (data)=> { 
        console.log("data de insertTotales",data)
        return new Promise((resolve,reject)=>{  
         
        client.query(`insert into totales(subtotal,iva,total) values('${data[0]}','${data[1]}','${data[2]}')`) 
          
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
         
            
             const insertContacto = (data)=> { 
            console.log("data de insertContacto",data)
            return new Promise((resolve,reject)=>{
           client.query(`insert into contacto(nombre,apellidos,correo1,correo2,telefono1,extensionTelefonica,telefono2,puesto) values('${data[0]}','${data[1]}','${data[2]}','${data[3]}','${data[4]}','${data[5]}','${data[6]}','${data[7]}')`) 
           resolve({message:"registro exitoso"})
            })
            }  

            const insertProductoServicio = (data)=> { 
                console.log("data de insertProductoServicio",data)
                return new Promise((resolve,reject)=>{  
                    //  let fk_empresas =(data[8]); 
                    //  console.log("fk_empresas back",fk_empresas) 
                            
            
                 client.query(`insert into productoServicio(tipo,concepto,precio) values('${data[0]}','${data[1]}','${data[2]}')`) 
              //  client.query(`insert into clientes (rfc,empresa,nombre,apellido,correo1,correo2,telefono1,telefono2) values('${data[0]}','${data[1]}','${data[2]}','${data[3]}','${data[4]}','${data[5]}','${data[6]}','${data[7]}')`) 
                
                
                    resolve({message:"registro exitoso"})
                })
                }

                const insertClientesAlfa = (data)=> { 
                    console.log("data de insertClientesAlfa",data)
                    return new Promise((resolve,reject)=>{   
                     client.query(`insert into clientesads(rfc,razonSocial,fk_empresa) values('${data[0]}','${data[1]}','${data[2]}')`) 
                        resolve({message:"registro exitoso"})
                    })
                    }

                    const getTablaClientesAlfa = ( data)  => {
                        return new Promise((resolve,reject)=>{
                            client.query(`select * from clientesads where fk_empresa='${data[0]}'`, function (err,results,fields ) {
                                
                                var string = JSON.stringify(results)
                                var resultados=JSON.parse(string);
                    
                                resolve(resultados)
                                console.log("resultados",resultados)
                            }) 
                        })
                        }


                    const SendEmailCotizacion   = ( data)  => {
                        return new Promise((resolve,reject)=>{
                            var date= new Date()
                            let fecha = date.toLocaleString('es')
                            
                            var transporter = nodemailer.createTransport({
                  
                                secure: false,
                                host: 'mail.diagnostico035.com',
                                port: 587,
                                auth: {
                                        user: 'info@diagnostico035.com',
                                        pass: 'jpY9f23#',
                                       
                                    },
                                tls: {rejectUnauthorized: false},
                                });
                                const mailOptions = {
                                  from: 'info@diagnostico035.com', // sender address
                                to: `lizbeth.cuevas@ads.com.mx`, // list of receivers
                                subject: 'Cotizacion de producto o servicio' + " " + fecha, // Subject line
                                text: 'Archivo de cotización PDF',
                                html: `<p>En base a su amable solicitud, me permito poner a su consideración nuestra
                                propuesta referente a los productos y servicios de su interés.<center><br/><br/>${data[1]}<br/>
                                Ejecutivo de ventas
                                ALFA DISEÑO DE SISTEMAS, S.A. DE C.V.<br/>
                                www.ads.com.mx<br/>${data[2]}</center>
                                </p> `, // plain text body
                                attachments: [{
                                  filename: 'Archivo de cortización.pdf',
                                  path: `C:/Users/UserAdmin/Downloads/${data[0]}`,
                                  contentType: 'application/pdf'
                                }]
                                };
                                transporter.sendMail(mailOptions, function (err, info) {
                                  if("este es el error" , err)
                                    console.log(err)
                                  else
                                    console.log("esta es la info" ,  info);
                                });
                            resolve({message:"Correo Enviado"})      
                        })
                    }            
                
        
    

                        
                

module.exports={ 
    getTablaClientesAlfa,
    insertTotales,
    SendEmailCotizacion,
    insertClientesAlfa,
    insertProductoServicio,
    insertContacto,
    getTablaProductoServicio,
    getProductoServicio,
    updateCliente,
    deleteCliente,
    signupEmpresas,  
    signupAlfa,
    loginAdminAlfa,
    loginEmpresas,
    getTablaClientes,    
    insertCotizaciones,
    getEmpresas,
    getCotizacionesTabla,
    getIdCotizacion,
    getClienteRFC,
    insertClientes   

}