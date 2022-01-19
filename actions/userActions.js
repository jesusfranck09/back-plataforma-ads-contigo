const client  = require('../database');
const bcrypt =  require('bcrypt');
const puppeteer = require('puppeteer');
const nodemailer = require("nodemailer")
const {jsonwebtoken} = require('../utils/index');
const SALT_WORK_FACTOR =10
const downloadsFolder = require('downloads-folder');
const { response } = require('express');

    const signupAlfa = (data) => {
    return new Promise((resolve,reject) =>{
        bcrypt.genSalt(SALT_WORK_FACTOR,function(error,salt){
            if (error){    
                reject(error,{message:'error',token:error})
            } else{
                bcrypt.hash(data[7],salt, function(error,hash){
                    if(error){
                        throw error
                    } else{
                        client.query(`insert into adminAlfa(nombre,apellido,correo,telefono,extensionTelefonica,celular,puesto,contraseña,fk_empresa,fk_rolAdministrador) values ('${data[0]}','${data[1]}','${data[2]}','${data[3]}','${data[4]}','${data[5]}','${data[6]}','${hash}','${data[8]}','${data[9]}')`);                  
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
    return new Promise((resolve,reject) =>{
        //  bcrypt.genSalt(SALT_WORK_FACTOR,function(error,salt){
            //  if (error){    
            //       reject(error,{message:'error',token:error})
            //  } else{
                //  bcrypt.hash(data[6],salt, function(error,hash){
                //      if(error){
                //         throw error
                //      } else{
                        // client.query(`insert into empresas(rfc,razonSocial,correo,telefono,paginaWeb,domicilioFiscal,contraseña) values ('${data[0]}','${data[1]}','${data[2]}','${data[3]}','${data[4]}','${data[5]}','${hash}')`);    
                        client.query(`insert into empresas(rfc,razonSocial,correo,telefono,paginaWeb,domicilioFiscal) values ('${data[0]}','${data[1]}','${data[2]}','${data[3]}','${data[4]}','${data[5]}')`);
                        resolve({           
                            message:"el registro en signup fue exitoso",
                        })                       
                    //  }
                //  })
            //  }

        //  })     
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
                    client.query(`select * from empresas where id_empresa = '${resultados[0].fk_empresa}'`,function(err, resultEmpresa, fieldsEmpresa){
                        var stringEmpresa =  JSON.stringify(resultEmpresa)
                        var resultadosEmpresa = JSON.parse(stringEmpresa)
                        // console.log("resultEmpresa",resultadosEmpresa)
                        resolve({
                            id_admin:resultados[0].id_admin,
                            nombre:resultados[0].nombre,
                            apellido:resultados[0].apellido,                   
                            correo:resultados[0].correo, 
                            telefono:resultados[0].telefono,
                            extensionTelefonica:resultados[0].extensionTelefonica,
                            puesto:resultados[0].puesto,
                            message:"login exitoso",
                            token:jsonwebtoken(resultados[0].correo), //coreo data[0]]
                            fk_empresa:resultados[0].fk_empresa, 
                            fk_rolAdministrador:resultados[0].fk_rolAdministrador, 
                            razonSocial:resultadosEmpresa[0].razonSocial

                    })
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
    return new Promise((resolve,reject) =>{  client.query(`select * from empresas where correo='${data[0]}'`,
    function(err,results,field){
        if(err){ reject(err)
    }
        var string = JSON.stringify(results)
        var resultados=JSON.parse(string);
        if(resultados[0]){

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
            client.query(`select * from clientesads where fk_empresa='${data[0]}'`, function (err,results,fields ) {            
                var string = JSON.stringify(results)
                var resultados=JSON.parse(string);
                resolve(resultados)
            }) 
        })
    }


    const getEmpresas   = ( data)  => {
        return new Promise((resolve,reject)=>{        
            client.query(`select * from empresas where rfc='${data[0]}'`, function (err,result,fields ) {            
                var string = JSON.stringify(result)
                var resultados=JSON.parse(string);          
                resolve(resultados)
            }) 
        })
        }

    const insertCotizaciones = (data)=> { 
        // console.log("esto es data de cotizacion",data) 
        return new Promise( (resolve,reject)=>{  
            client.query(`insert into cotizaciones(fechaEmision,NumFolio,cantidad,descuento,descuentoAplicado,TotalPrecioProducto,statusCotizacion,fk_cliente,fk_productoServicio,fk_adminalfa,fk_empresa,fechaExpiracion,vigencia,fk_contacto,tipoSolicitud) values('${data[0]}','${data[1]}','${data[2]}','${data[3]}','${data[4]}','${data[5]}','Enviada','${data[6]}','${data[7]}','${data[8]}','${data[9]}','${data[10]}','activa','${data[11]}','${data[12]}')`);
            resolve({message:"registro exitoso"})
        })
    }

    const getCotizacionesTabla  = ( data)  => {
                return new Promise((resolve,reject)=>{
                    client.query(`select * from cotizaciones  where  fk_adminalfa='${data[0]}'` , function (err,results,fields ) {            
                        var string = JSON.stringify(results)
                        var resultados=JSON.parse(string);
                        resolve(resultados)                   
                    }) 
            })
    }

    const getIdCotizacion  = ( data)  => {
        console.log("data",data)
        return new Promise((resolve,reject)=>{
            client.query(`select * from cotizaciones inner join clientesads on cotizaciones.fk_cliente= clientesads.id_cliente where fk_cliente='${data[0]}'` , function (err,results,fields ) {            
                var string = JSON.stringify(results)
                var resultados=JSON.parse(string);    
                resolve(resultados)                
            }) 
        })
    }
  
    const getClienteRFC = ( data)  => {
        return new Promise((resolve,reject)=>{                    
            client.query(`select * from clientesads where rfc='${data[0]}' OR razonSocial='${data[0]}'`, function (err,result,fields ) {                        
                var string = JSON.stringify(result)
                var resultados=JSON.parse(string);                      
                resolve(resultados) 
            }) 
        })
    }

    const insertClientes = (data)=> { 
        return new Promise((resolve,reject)=>{  
            client.query(`insert into clientes (rfc,empresa,nombre,apellido,correo1,correo2,telefono1,telefono2) values('${data[0]}','${data[1]}','${data[2]}','${data[3]}','${data[4]}','${data[5]}','${data[6]}','${data[7]}')`) 
        resolve({message:"registro exitoso"})
        })
    }

    const deleteCliente   = ( data)  => {
        return new Promise((resolve,reject)=>{                        
            client.query(`delete from clientes where id_cliente='${data[0]}'`) 
        })
    }

    const updateCliente   = ( data)  => {
        return new Promise((resolve,reject)=>{                            
            client.query(`update clientes set rfc= '${data[1]}' , empresa='${data[2]}', nombre= '${data[3]} ', apellido='${data[4]}',correo1='${data[5]}',correo2='${data[6]}',telefono1='${data[7]}', telefono2='${data[8]}' where id_cliente='${data[0]}'`) 
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

  
    const insertContacto = (data)=> { 
        return new Promise((resolve,reject)=>{
            client.query(`insert into contacto(nombre,apellidos,correo1,correo2,telefono1,extensionTelefonica,telefono2,puesto,tipoContacto,fk_clientesads) values('${data[0]}','${data[1]}','${data[2]}','${data[3]}','${data[4]}','${data[5]}','${data[6]}','${data[7]}','${data[8]}','${data[9]}')`) 
            resolve({message:"registro exitoso"})
        })
    }  

    // const insertProductoServicio = (data)=> { 
    //     return new Promise((resolve,reject)=>{                                  
    //         client.query(`insert into productoServicio(tipo,concepto,precio,consecutivo,tipoLicenciamiento,LineaProducto) values('${data[0]}','${data[1]}','${data[2]}','${data[3]}','${data[4]}','${data[5]}')`) 
    //     resolve({message:"registro exitoso"})
    //     })
    // } 
    // const getTablaProductoServicio  = ( data)  => {
    //     return new Promise((resolve,reject)=>{                                
    //         client.query(`select * from productoServicio`,  function (err,result,fields ) {                                    
    //             var string = JSON.stringify(result)
    //             var resultados=JSON.parse(string);                                
    //             resolve(resultados)                                    
    //         }) 
    //     })
    // }   

    const insertProductoServicio = (data)=> { 
        return new Promise((resolve,reject)=>{                                  
            client.query(`insert into productoServicio(tipo,concepto,precio,consecutivo,tipoLicenciamiento,LineaProducto,fk_empresa) values('${data[0]}','${data[1]}','${data[2]}','${data[3]}','${data[4]}','${data[5]}','${data[6]}')`) 
        resolve({message:"registro exitoso"})
        })
    }

    const getTablaProductoServicio  = ( data)  => {
        return new Promise((resolve,reject)=>{                                
            client.query(`select * from productoServicio where fk_empresa ='${data[0]}'`,  function (err,result,fields ) {                                    
                var string = JSON.stringify(result)
                var resultados=JSON.parse(string);                                
                resolve(resultados)                                    
            }) 
        })
    }   


    const insertClientesAlfa = (data)=> { 
        return new Promise((resolve,reject)=>{ 
            client.query(`insert into clientesads(rfc,razonSocial,tamanoEmpresa,giroEmpresarial,domicilioFiscal,paginaWeb,acceso,fk_empresa) values('${data[0]}','${data[1]}','${data[2]}','${data[3]}','${data[4]}','${data[5]}','false','${data[6]}')`) 
            resolve({message:"registro exitoso"})            
        })
    }

    const getTablaClientesAlfa = ( data)  => {
        return new Promise((resolve,reject)=>{
            client.query(`select * from clientesads where fk_empresa='${data[0]}' ORDER BY razonSocial ASC`, function (err,results,fields ) {                
                var string = JSON.stringify(results)
                var resultados=JSON.parse(string);   
                resolve(resultados)
            }) 
        })
    }


    
    const SendEmailCotizacion   = ( data)  => {

        let directorio = downloadsFolder()

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
                    path: directorio + "/" + data[0],
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
                
    const insertTotales = ( data)  => {
        return new Promise((resolve,reject)=>{
            // client.query(`select MAX(id_cotizaciones) as maxid from cotizaciones`,function(err,results,fields){
            //     var string =JSON.stringify(results)
            //     var resultados = JSON.parse(string);   
            // })
            client.query(`insert into totales(subtotal,iva,total,NumFolio) values('${data[1]}','${data[2]}','${data[3]}','${data[0]}')`)

        })
    } 

    const getIdClientesAlfa = ( data)  => {
        return new Promise((resolve,reject)=>{
            client.query(`select * from clientesads where id_cliente='${data[0]}'`, function (err,results,fields ) {                
                var string = JSON.stringify(results)
                var resultados=JSON.parse(string); 
                resolve(resultados)
            }) 
        })
    }
    
    const getTablaContactos = ( data)  => {
        return new Promise((resolve,reject)=>{
            client.query(`select * from contacto where fk_clientesads='${data[0]}' ORDER BY apellidos ASC`, function (err,results,fields ) {                
                var string = JSON.stringify(results)
                var resultados=JSON.parse(string);   
                resolve(resultados)
            }) 
        })
    }

    const getProductoServicioByFolio = ( data)  => {
        // console.log("select * from cotizaciones inner join productoservicio on cotizaciones.fk_productoservicio = productoservicio.id_productoServicio  where cotizaciones.NumFolio =",data[0])
        return new Promise((resolve,reject)=>{
            client.query(`select * from cotizaciones inner join productoservicio on cotizaciones.fk_productoservicio = productoservicio.id_productoServicio  where cotizaciones.NumFolio ='${data[0]}'`,function(err,results,fields){
                var string =JSON.stringify(results)
                var resultados = JSON.parse(string);
                resolve(resultados)
                // conosle.log("esto es resultados",resultados)
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
            client.query(`update cotizaciones set statusCotizacion = '${data[1]}' where NumFolio ='${data[0]}'`)
            resolve({message:"actualizacion exitosa"})
        })
    }
    
    const GetClienteId = ( data)  => {
        return new Promise((resolve,reject)=>{             
            client.query(`select * from clientesads where id_cliente ='${data[0]}'`, function (err,results,fields ) {                
                var string = JSON.stringify(results)
                var resultados=JSON.parse(string);                      
                resolve(resultados)
            }) 
        })
    }


    const updateContacto = ( data)  => {
        return new Promise((resolve,reject)=>{
            client.query(`update contacto set  nombre='${data[1]}',apellidos='${data[2]}',correo1='${data[3]}',correo2='${data[4]}',telefono1='${data[5]}',extensionTelefonica='${data[6]}',telefono2='${data[7]}',puesto='${data[8]}',tipoContacto='${data[9]}' where id_contacto='${data[0]}'`) 
            resolve({message:"actualizacion exitosa"})
        })
    }

    const deliteContacto  = ( data)  => {
        return new Promise((resolve,reject)=>{                        
            client.query(`delete from contacto where id_contacto='${data[0]}'`) 
            // resolve({message:"delite exitoso"})
        })   
    }

    const CotizacionVencida   = ( data)  => {
        return new Promise((resolve,reject)=>{                        
            client.query(`update cotizaciones set vigencia = "vencida"  where NumFolio='${data[0]}'`);
            resolve({message:`folio ${data[0]} vencida`})
        })
    }

    const getContactosId   = ( data)  => {
        return new Promise((resolve,reject)=>{
            client.query(`select * from contacto where fk_clientesads='${data[0]}'`, function (err,results,fields ) {                
                var string = JSON.stringify(results)
                var resultados=JSON.parse(string);
                resolve(resultados)
            }) 
        })
    }

    const getCotizacionFk_Contactos = ( data)  => {
        return new Promise((resolve,reject)=>{
            client.query(`select * from contacto where id_contacto='${data[0]}'`, function (err,results,fields ) {                
                var string = JSON.stringify(results)
                var resultados=JSON.parse(string);   
                resolve(resultados)
            }) 
        })
    }

   const AccesoSistema = ( data)  => {
                return new Promise((resolve,reject)=>{
                    let año  = new Date().getFullYear()
                    function generateUUID() {
                        var d = new Date().getTime();
                        var uuid = 'xCxxyx'.replace(/[xy]/g, function (c) {
                            var r = (d + Math.random() * 16) % 16 | 0;
                            d = Math.floor(d / 16);
                            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
                        });
                        return uuid;
                    }
                    let folio = (generateUUID()).toUpperCase() + año;
                    bcrypt.genSalt(SALT_WORK_FACTOR,function(error,salt){
                        if (error){    
                             reject(error,{message:'error',token:error})
                        } else{
                            bcrypt.hash(folio,salt, function(error,hash){
                                if(error){
                                   throw error
                                } else{
                                    client.query(`update clientesads set acceso = "true", fk_contactoAcceso = '${data[2]}' where  id_cliente = '${data[0]}'`)     
                                    client.query(`update contacto set contraseña = '${hash}' where  id_contacto = '${data[2]}'`)     
                                    var transporter = nodemailer.createTransport({  
                                        secure: false,
                                        host: 'mail.diagnostico035.com',
                                        port: 587,
                                        auth: {
                                                user: 'info@diagnostico035.com',
                                                pass: 'zAvb54$3',                       
                                            },
                                        tls: {rejectUnauthorized: false},
                                        });
                                        const mailOptions = {
                                            from: 'info@diagnostico035.com', // sender address
                                        to: `${data[1]}`, // list of receivers
                                        // subject: 'Cotizacion de producto o servicio' + " " + fecha, // Subject line
                                        subject: 'Gracias por su interés en Alfa y Diseño de Sistemas', // Subject line
                                        text: 'Datos de acceso',
                                        html: `<p>Alfa y Diseño de Sistemas, es un Distribuidor Asociado Master de CONTPAQi®
                                            que ha recibido el reconocimiento como el Primer Lugar en Ventas por 16 Años consecutivos en la
                                            Ciudad de México.
                                            <br/>
                                            Basado en su solicitud de acceso, Se le otorgan los siguientes datos para que usted disfrute de los beneficios de la plataforma de ADS en el sitio https://www.google.com<br/><br/><br/>
                                            Correo: ${data[1]}<br/>
                                            Contraseña:${folio}<br/>
                                            <br/>
                                            Estimado cliente se le sugiere cambiar su <strong>contraseña</strong> para la seguridad de su sesión.
                                            <br/>
                                            <br/>
                                            Saludos cordiales, 
                                            <center><br/><br/><br/>
                                        El equipo de desarrollo de <br/>
                                        ALFA DISEÑO DE SISTEMAS, S.A. DE C.V.<br/>
                                        www.ads.com.mx<br/></center>
                                        </p> `
                                        };
                                        transporter.sendMail(mailOptions, function (err, info) {
                                            if("este es el error" , err)
                                            console.log(err)
                                            else
                                            console.log("esta es la info" ,  info);
                                    
                                        });
                                      resolve({           
                                       message:"acceso permitido",
                                    })
                                      
                                }
                            })
                        }
               
                    })
                })
            }
        
    const LoginClientes = ( data)  => {
        // console.log("data",data)
        return new Promise((resolve,reject) =>{ 
            client.query(`select * from contacto where correo1= '${data[0]}'`,
                function(err,results,field){
                    if(err){ reject(err)
                    }
                var string = JSON.stringify(results)
                var resultados=JSON.parse(string);
                // console.log("resultados",resultados)
                if(resultados[0]){
                    client.query(`select * from clientesads where acceso = 'true' and id_cliente = '${resultados[0].fk_clientesads}'`,function(error,result,fields){
                        let string2 = JSON.stringify(result)
                        let resultados2 = JSON.parse(string2)
                        bcrypt.compare(data[1],resultados[0].contraseña,function(error,res){
                            if(res){
                                resolve({
                                id_cliente:resultados2[0].id_cliente,
                                correo:resultados[0].correo1,
                                rfc:resultados2[0].rfc,
                                razonSocial:resultados2[0].razonSocial,
                                fk_empresa:resultados2[0].fk_empresa,
                                nombreRepresantante:resultados[0].nombre,
                                apellidosRepresantante:resultados[0].apellidos,
                                tamanoEmpresa:resultados2[0].tamanoEmpresa,
                                giroEmpresarial:resultados2[0].giroEmpresarial,
                                telefono:resultados2[0].telefono,
                                paginaWeb:resultados2[0].paginaWeb,
                                domicilioFiscal:resultados2[0].domicilioFiscal,                               
                                message:"login exitoso",
                                token:jsonwebtoken(resultados2[0].correo) 
                        })
                            } else{ 
                                resolve({message:"usuario y contraseña incorrecto", token:"no hay token"})
                            }
                        })       
                    })
                   
                }else{
                    resolve({
                        message:"sin resultados",             
                    })
                }   
            })
        } )
    }
    const TransactionClientes = ( data)  => {
        return new Promise((resolve,reject)=>{
            client.query(`insert into transaccionesClientes (id_cliente,rfc,fecha,hora) values ('${data[1]}','${data[0]}','${data[2]}','${data[3]}')`)
            resolve({message:"actualización exitosa"})
        })
    }

    const GetClienteByCorreo = ( data)  => {
        return new Promise((resolve,reject)=>{
            client.query(`select * from clientesads inner join contacto on contacto.fk_clientesads = clientesads.id_cliente where contacto.correo1='${data[0]}'`, function (err,results,fields ) {  
                var string = JSON.stringify(results)
                var resultados=JSON.parse(string);
                // console.log("resultados",resultados)              

                resolve(resultados)
            })
        })
    }

    const UpdatePasswordCliente = ( data)  => {
        return new Promise((resolve,reject)=>{
            bcrypt.genSalt(SALT_WORK_FACTOR,function(error,salt){
                if (error){    
                        reject(error,{message:'error',token:error})
                } else{
                    bcrypt.hash(data[1],salt, function(error,hash){
                        if(error){
                            throw error
                        } else{
                            client.query(`update contacto set contraseña = '${hash}' where id_contacto  = '${data[0]}'`)
                            resolve({message:"actualización exitosa"})
                        }
                    })
                }                       
            })
            
        })
    }

    const RegisterSupport = ( data)  => {
        return new Promise((resolve,reject)=>{
            client.query(`insert into soporte (fechaSoporte,consola,numeroPoliza,asunto,fk_cliente) values('${data[0]}','${data[1]}','${data[2]}','${data[3]}','${data[4]}')`)
            resolve({message:"actualización exitosa"})                
        })
    }
    const GetAdminAlfa = ( data)  => {
        return new Promise((resolve,reject)=>{
            client.query(`select * from adminalfa where id_admin ='${data[0]}'`, function (err,results,fields ) {                
                var string = JSON.stringify(results)
                var resultados=JSON.parse(string);
                // console.log("resultados",resultados)
                resolve(resultados)
            })
        })
    }

    const getCotizacionByFolio = ( data)  => {
        return new Promise((resolve,reject)=>{
            client.query(`select * from cotizaciones inner join productoservicio on cotizaciones.fk_productoservicio = productoservicio.id_productoservicio 
            inner join contacto on cotizaciones.fk_contacto = contacto.id_contacto
            inner join clientesads on cotizaciones.fk_cliente = clientesads.id_cliente
            where cotizaciones.NumFolio='${data[0]}'`, function (err,result,fields ) {                        
                var string = JSON.stringify(result)
                var resultados=JSON.parse(string); 
                // console.log("resultados",resultados)                     
                resolve(resultados) 
            }) 
        })
    }

    const QuitarAccesoSistema = ( data)  => {
        return new Promise((resolve,reject)=>{
            client.query(`update clientesads set acceso = 'false', fk_contactoAcceso = ''  where id_cliente  = '${data[0]}'`)
            client.query(`update contacto set contraseña = '' where  id_contacto = '${data[1]}'`)  
            resolve({message:"acceso removido"})
        })
    }   
    const insertURLVideos = (data)=> { 
            // console.log("esta es la data",data)
            return new Promise((resolve,reject)=>{ 
                client.query(`insert into videosprivados(descripcion,autor,urlVideos,fechaInicio,fechaExpiracion,statusVideo,fk_empresa) values('${data[0]}','${data[1]}','${data[2]}','${data[3]}','${data[4]}','true','${data[5]}')`) 
                resolve({message:"registro exitoso"})            
            })
        }
    
    const getURLVideos = ( data)  => {
        return new Promise((resolve,reject)=>{
            client.query(`select * from videosPrivados where fk_empresa='${data[0]}'`, function (err,results,fields ) {                
                var string = JSON.stringify(results)
                var resultados=JSON.parse(string);
                resolve(resultados)
            })
        })
    } 
    
    

    const ventas = (data)=> {   
        console.log("valor de data venta",data)     
        // console.log("esto es data de ventas",`insert into ventas(numFolio,cantidad,descuento,descuentoAplicado,TotalPrecioProducto,fechaPago,hora,banco,referenciaPago,tipoPago,importe,fechaInicialPoliza,statusPoliza,fk_productoServicio,fk_cliente,fk_adminalfa,fk_empresa,fk_contacto) values('${data[0]}','${data[1]}','${data[2]}','${data[3]}','${data[4]}','${data[5]}','${data[6]}','${data[7]}','${data[8]}','${data[9]}','${data[10]}','${data[11]}','${data[12]}','true','${data[13]}','${data[14]}','${data[15]}','${data[16]}','${data[17]},'${data[18]}')`);
        return new Promise( (resolve,reject)=>{  
            client.query(`insert into ventas(numFolio,cantidad,descuento,descuentoAplicado,TotalPrecioProducto,ProductoPrecioUnitario,TotalPrecioProductoIVA,fechaPago,hora,banco,referenciaPago,tipoPago,importe,fechaInicialPoliza,statusPoliza,fk_productoServicio,fk_cliente,fk_adminalfa,fk_empresa,fk_contacto)values('${data[0]}','${data[1]}','${data[2]}','${data[3]}','${data[4]}','${data[5]}','${data[6]}','${data[7]}','${data[8]}','${data[9]}','${data[10]}','${data[11]}','${data[12]}','true','${data[13]}','${data[14]}','${data[15]}','${data[16]}','${data[17]}','${data[18]}')`);
            resolve({message:"registro exitoso"})
        })
    }
     

       const insertTotalesVenta = ( data)  => {
           console.log("insertTotalesVenta",data)
        return new Promise((resolve,reject)=>{
            // client.query(`select MAX(id_cotizaciones) as maxid from cotizaciones`,function(err,results,fields){
            //     var string =JSON.stringify(results)
            //     var resultados = JSON.parse(string);   
            // })
            client.query(`insert into totalVenta(subTotal,IVA,total,numFolioVenta)values('${data[0]}','${data[1]}','${data[2]}','${data[3]}')`);

        })
    } 
    const RegisterPoliza = ( data)  => {
     return new Promise((resolve,reject)=>{
        client.query(`insert into polizas (fechaInicial,statusPoliza,fk_productoServicio,fk_cliente,fk_contacto) values ('${data[0]}','${data[1]}','${data[2]}','${data[3]}','${data[4]}')`)
        resolve({message:"Registro exitoso"})
     })
    } 
    const GetPolizas = ( data)  => {
        return new Promise((resolve,reject)=>{
            client.query(`select * from polizas inner join clientesads on polizas.fk_cliente = clientesads.id_cliente inner join productoServicio on polizas.fk_productoServicio = productoServicio.id_productoServicio where clientesads.fk_empresa = '${data[0]}'`,function(err,results,fields){
                var string = JSON.stringify(results)
                var resultados=JSON.parse(string);
                resolve(resultados)
            })
        })
    } 
    const ActivarPoliza = ( data)  => {
        return new Promise((resolve,reject)=>{
           client.query(`update polizas set fechaInicial = '${data[0]}', statusPoliza = 'activa' where id_polizas = '${data[1]}'`)
           resolve({message:"Activacion exitosa"})
        })
    } 
    const EditarPoliza = ( data)  => {
        return new Promise((resolve,reject)=>{
           client.query(`update polizas set fechaInicial = '${data[0]}', statusPoliza = 'activa' where id_polizas = '${data[1]}'`)
           resolve({message:"Activacion exitosa"})
        })
    } 
    const GetPoliza = ( data)  => {
        return new Promise((resolve,reject)=>{
            client.query(`select * from polizas inner join productoServicio on polizas.fk_productoServicio = productoServicio.id_productoServicio where polizas.fk_cliente = '${data[0]}'`,function(err,results,fields){
                var string = JSON.stringify(results)
                var resultados=JSON.parse(string);
                console.log("resultados poliza",resultados)
                resolve(resultados)
            })
        })
    } 
module.exports={
    insertTotalesVenta,
    GetPoliza,
    EditarPoliza,
    ActivarPoliza,
    GetPolizas,
    RegisterPoliza,
    RegisterPoliza,
    ventas,
    getURLVideos,
    insertURLVideos,
    QuitarAccesoSistema,
    getCotizacionByFolio,
    GetAdminAlfa,
    RegisterSupport,
    UpdatePasswordCliente,
    GetClienteByCorreo,
    TransactionClientes,
    LoginClientes,
    AccesoSistema,
    getCotizacionFk_Contactos,
    getContactosId, 
    CotizacionVencida,
    deliteContacto,
    updateContacto,
    GetClienteId,
    insertTotales,
    getProductoServicioByFolio, 
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