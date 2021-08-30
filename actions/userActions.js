const client  = require('../database');
const bcrypt =  require('bcrypt');
const puppeteer = require('puppeteer');
const nodemailer = require("nodemailer")
const {jsonwebtoken} = require('../utils/index');
const SALT_WORK_FACTOR =10

const signupAlfa = (data) => {
    console.log("esto contiene data:",data)
 return new Promise((resolve,reject) =>{
     bcrypt.genSalt(SALT_WORK_FACTOR,function(error,salt){
         if (error){    
              reject(error,{message:'error',token:error})
         } else{
             bcrypt.hash(data[6],salt, function(error,hash){
                 if(error){
                    throw error
                 } else{
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
     bcrypt.genSalt(SALT_WORK_FACTOR,function(error,salt){
         if (error){    
              reject(error,{message:'error',token:error})
         } else{
             bcrypt.hash(data[6],salt, function(error,hash){
                 if(error){
                    throw error
                 } else{
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
  return new Promise((resolve,reject) =>{ 
      client.query(`select * from adminAlfa where correo='${data[0]}'`,
        function(err,results,field){
            if(err){ reject(err)
   }

       var string = JSON.stringify(results)
       var resultados=JSON.parse(string);
       if(resultados[0]){
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
  return new Promise((resolve,reject) =>{  client.query(`select * from empresas where correo='${data[0]}'`,
   function(err,results,field){
    if(err){ reject(err)
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
    return new Promise( (resolve,reject)=>{  
        client.query(`insert into cotizaciones(fechaEmision,NumFolio,promocion,cantidad,descuento,descuentoAplicado,TotalPrecioProducto,statusCotizacion,fk_cliente,fk_productoServicio,fk_adminalfa,fk_empresa,fechaExpiracion) values('${data[0]}','${data[10]}','${data[1]}','${data[2]}','${data[3]}','${data[4]}','${data[5]}','Enviada','${data[6]}','${data[7]}','${data[8]}','${data[9]}','${data[11]}')`);
        resolve({message:"registro exitoso"})
    })
}

const getCotizacionesTabla  = ( data)  => {
            return new Promise((resolve,reject)=>{
                client.query(`select * from cotizaciones  where  fk_adminalfa='${data[0]}'` , function (err,results,fields ) {            
                    var string = JSON.stringify(results)
                    var resultados=JSON.parse(string);  
                    console.log("resultados", resultados)  
                    resolve(resultados)                   
                }) 
        })
        }

    const getIdCotizacion  = ( data)  => {
        return new Promise((resolve,reject)=>{
            client.query(`select * from cotizaciones where fk_cliente='${data[0]}'` , function (err,results,fields ) {            
                var string = JSON.stringify(results)
                var resultados=JSON.parse(string);    
                resolve(resultados)
                
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
            client.query(`insert into clientes (rfc,empresa,nombre,apellido,correo1,correo2,telefono1,telefono2) values('${data[0]}','${data[1]}','${data[2]}','${data[3]}','${data[4]}','${data[5]}','${data[6]}','${data[7]}')`) 
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
                    
                }) 
            })
            }

        const  getTablaProductoServicio  = ( data)  => {
            return new Promise((resolve,reject)=>{                                
                client.query(`select * from productoServicio`,  function (err,result,fields ) {                                    
                    var string = JSON.stringify(result)
                    var resultados=JSON.parse(string);                                
                    resolve(resultados)                                    
                }) 
            })
            }    
            
        // const insertProductoServicio = (data)=> { 
        //     return new Promise((resolve,reject)=>{          
        //         client.query(`insert into productoServivio(concepto,precio) values('${data[0]}','${data[1]}','${data[2]}')`) 
        //         resolve({message:"registro exitoso"})
        //     })
        //     } 
         
            
    const insertContacto = (data)=> { 
    console.log("data de insertContacto",data)
        return new Promise((resolve,reject)=>{
            client.query(`insert into contacto(nombre,apellidos,correo1,correo2,telefono1,extensionTelefonica,telefono2,puesto,fk_clientesads) values('${data[0]}','${data[1]}','${data[2]}','${data[3]}','${data[4]}','${data[5]}','${data[6]}','${data[7]}','${data[8]}')`) 
            resolve({message:"registro exitoso"})
    })
    }  

    const insertProductoServicio = (data)=> { 
        console.log("data de insertProductoServicio",data)
        return new Promise((resolve,reject)=>{                      
            client.query(`insert into productoServicio(tipo,concepto,precio,consecutivo) values('${data[0]}','${data[1]}','${data[2]}','${data[3]}')`) 
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
                console.log("Data",data)
                client.query(`select * from clientesads where fk_empresa='${data[0]}'`, function (err,results,fields ) {                
                    var string = JSON.stringify(results)
                    var resultados=JSON.parse(string);   
                    console.log("resultados getTablaClientesAlfa",resultados)
                    resolve(resultados)
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
                    to: `jesus.francisco@ads.com.mx`, // list of receivers
                    // subject: 'Cotizacion de producto o servicio' + " " + fecha, // Subject line
                    subject: 'Gracias por su interés en Alfa y Diseño de Sistemas', // Subject line
                    text: 'Archivo de cotización PDF',
                    html: `<p>Alfa y Diseño de Sistemas, es un Distribuidor Asociado Master de CONTPAQi®
                        que ha recibido el reconocimiento como el Primer Lugar en Ventas por 16 Años consecutivos en la
                        Ciudad de México.
                        <br/>
                        Basado en su solicitud de cotización, adjunto en este email nuestra propuesta comercial.
                        <br/>
                        Por favor, avísime si tiene alguna pregunta respondiendo a este correo electrónico o llamandome
                        a los teléfonos 55 3603 9970 y 55 5553 2049.
                        <br/>
                        <br/>
                        Saludos cordiales, 
                        <center><br/><br/>${data[1]}<br/>
                    Ejecutivo de ventas <br/>
                    ALFA DISEÑO DE SISTEMAS, S.A. DE C.V.<br/>
                    www.ads.com.mx<br/>${data[2]}</center>
                    </p> `, // plain text body
                    attachments: [{
                        filename: 'Archivo de cortización.pdf',
                        path: `C:/Users/Frnk.000/Downloads/${data[0]}`,
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
                    
    // const insertCotizaciones = (data)=> { 
    //     return new Promise( (resolve,reject)=>{  
    //         client.query(`insert into cotizaciones(fechaEmision,NumFolio,promocion,cantidad,descuento,descuentoAplicado,TotalPrecioProducto,fk_cliente,fk_productoServicio,fk_adminalfa,fk_empresa) values('${data[0]}','${data[10]}','${data[1]}','${data[2]}','${data[3]}','${data[4]}','${data[5]}','${data[6]}','${data[7]}','${data[8]}','${data[9]}')`);
    //         resolve({message:"registro exitoso"})
    //     })
    // }
                
    const InsertTotales = ( data)  => {
        return new Promise((resolve,reject)=>{
            // client.query(`select MAX(id_cotizaciones) as maxid from cotizaciones`,function(err,results,fields){
            //     var string =JSON.stringify(results)
            //     var resultados = JSON.parse(string);
            //     console.log("redsultados", resultados)    
            // })
            client.query(`insert into totales(subtotal,iva,total,NumFolio) values('${data[1]}','${data[2]}','${data[3]}','${data[0]}')`)

        })
        } 

    const getIdClientesAlfa = ( data)  => {
        return new Promise((resolve,reject)=>{
            console.log("Data",data)
            client.query(`select * from clientesads where id_cliente='${data[0]}'`, function (err,results,fields ) {                
                var string = JSON.stringify(results)
                var resultados=JSON.parse(string);   
                console.log("resultados getIdClientesAlfa",resultados)
                resolve(resultados)
            }) 
        })
        }
        
    const getTablaContactos = ( data)  => {
        return new Promise((resolve,reject)=>{
            console.log("Data",data)
            client.query(`select * from contacto where fk_clientesads='${data[0]}'`, function (err,results,fields ) {                
                var string = JSON.stringify(results)
                var resultados=JSON.parse(string);   
                console.log("resultados getTablaContactos",resultados)
                resolve(resultados)
            }) 
        })
        }

        const GetProductoServicioByFolio = ( data)  => {
            return new Promise((resolve,reject)=>{
                client.query(`select * from cotizaciones inner join productoservicio on cotizaciones.fk_productoservicio = productoservicio.id_productoServicio  where cotizaciones.NumFolio = '${data[0]}'`,function(err,results,fields){
                    var string =JSON.stringify(results)
                    var resultados = JSON.parse(string);
                    resolve(resultados)
                })
    
            })
        }

        const GetTotalesByFolio = ( data)  => {
            return new Promise((resolve,reject)=>{
                client.query(`select * from totales where NumFolio = '${data[0]}'`,function(err,results,fields){
                    var string =JSON.stringify(results)
                    var resultados = JSON.parse(string);
                    resolve(resultados)
                })
    
            })
        }

        const UpdateStatusCotizacion = ( data)  => {
            return new Promise((resolve,reject)=>{
                console.log("data",data)
                client.query(`update cotizaciones set statusCotizacion = '${data[1]}' where NumFolio ='${data[0]}'`)
                resolve({message:"actualizacion exitosa"})
            })
        }

        const GetClienteId = ( data)  => {
            return new Promise((resolve,reject)=>{             
                client.query(`select * from clientes where id_cliente ='${data[0]}'`, function (err,results,fields ) {                
                    var string = JSON.stringify(results)
                    var resultados=JSON.parse(string);                      
                    resolve(resultados)
                }) 
            })
            }

module.exports={
    GetClienteId,
    InsertTotales,
    GetProductoServicioByFolio, 
    GetTotalesByFolio,
    UpdateStatusCotizacion,
    getTablaContactos,
    getIdClientesAlfa,    
    insertCotizaciones,
    getTablaClientesAlfa,   
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