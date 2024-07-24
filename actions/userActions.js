const client  = require('../database/index');
const bcrypt =  require('bcryptjs');
const nodemailer = require("nodemailer")
const {jsonwebtoken} = require('../utils/index');
const SALT_WORK_FACTOR =10

    const signupAlfa = (data) => {
    return new Promise((resolve,reject) =>{
        bcrypt.genSalt(SALT_WORK_FACTOR,function(error,salt){
            if (error){    
                reject(error,{message:'error',token:error})
            }else{
                bcrypt.hash(data[7],salt, function(error,hash){
                    if(error){
                        throw error
                    }else{
                        client.query(`insert into adminAlfa(nombre,apellido,correo,telefono,extensionTelefonica,celular,puesto,contraseña,fk_empresa,fk_rolAdministrador) values ('${data[0]}','${data[1]}','${data[2]}','${data[3]}','${data[4]}','${data[5]}','${data[6]}','${hash}','${data[8]}','${data[9]}')`);             
                        ;     
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
                        ;
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
                        ;
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
                ;
            }) 
        })
    }
    const getEmpresas   = ( data)  => {
        return new Promise((resolve,reject)=>{        
            client.query(`select * from empresas where rfc='${data[0]}'`, function (err,result,fields ) {            
                var string = JSON.stringify(result)
                var resultados=JSON.parse(string);          
                resolve(resultados)
                ;
            }) 
        })
    }
    const insertCotizaciones = (data)=> { 
        return new Promise( (resolve,reject)=>{  
            client.query(`insert into cotizaciones(fechaEmision,NumFolio,cantidad,descuento,descuentoAplicado,TotalPrecioProducto,statusCotizacion,fk_cliente,fk_productoServicio,fk_adminalfa,fk_empresa,fechaExpiracion,vigencia,fk_contacto,tipoSolicitud) values('${data[0]}','${data[1]}','${data[2]}','${data[3]}','${data[4]}','${data[5]}','Enviada','${data[6]}','${data[7]}','${data[8]}','${data[9]}','${data[10]}','activa','${data[11]}','${data[12]}')`);
            resolve({message:"registro exitoso"})
            ;
        })
    }
    const getCotizacionesTabla  = ( data)  => {
                return new Promise((resolve,reject)=>{
                    client.query(`select * from cotizaciones  where  fk_adminalfa='${data[0]}'` , function (err,results,fields ) {            
                        var string = JSON.stringify(results)
                        var resultados=JSON.parse(string);
                        resolve(resultados)  
                        ;                 
                    }) 
            })
    }
    const getIdCotizacion  = ( data)  => {
        return new Promise((resolve,reject)=>{
            client.query(`select * from cotizaciones inner join clientesads on cotizaciones.fk_cliente= clientesads.id_cliente where fk_cliente='${data[0]}'` , function (err,results,fields ) {            
                var string = JSON.stringify(results)
                var resultados=JSON.parse(string);    
                resolve(resultados)  
                ;              
            }) 
        })
    }  
    const getClienteRFC = ( data)  => {
        return new Promise((resolve,reject)=>{                    
            client.query(`select * from clientesads where rfc='${data[0]}' OR razonSocial='${data[0]}'`, function (err,result,fields ) {                        
                var string = JSON.stringify(result)
                var resultados=JSON.parse(string);                      
                resolve(resultados) 
                ;
            }) 
        })
    }
    const insertClientes = (data)=> { 
        return new Promise((resolve,reject)=>{  
            client.query(`insert into clientes (rfc,empresa,nombre,apellido,correo1,correo2,telefono1,telefono2) values('${data[0]}','${data[1]}','${data[2]}','${data[3]}','${data[4]}','${data[5]}','${data[6]}','${data[7]}')`) 
            resolve({message:"registro exitoso"})
            ;
        })
    }
    const deleteCliente   = ( data)  => {
        return new Promise((resolve,reject)=>{                        
            client.query(`delete from clientes where id_cliente='${data[0]}'`) 
            ;
        })
    }

    // const updateCliente   = ( data)  => {
    //     return new Promise((resolve,reject)=>{                            
    //         client.query(`update clientes set rfc= '${data[1]}' , empresa='${data[2]}', nombre= '${data[3]} ', apellido='${data[4]}',correo1='${data[5]}',correo2='${data[6]}',telefono1='${data[7]}', telefono2='${data[8]}' where id_cliente='${data[0]}'`) 
    //     })
    // }

    const getProductoServicio   = ( data)  => {
        return new Promise((resolve,reject)=>{                                
            client.query(`select * from productoServicio where id_productoServicio='${data[0]}'`,  function (err,result,fields ) {                                    
                var string = JSON.stringify(result)
                var resultados=JSON.parse(string);                                
                resolve(resultados)
                ;
            }) 
        })
    }  
    const insertContacto = (data)=> { 
        return new Promise((resolve,reject)=>{
            client.query(`select * from contacto where correo1 ='${data[2]}'`,  function (err,result,fields ) {                                    
                var string = JSON.stringify(result)
                var resultados=JSON.parse(string);                                
                if(resultados[0]){
                    resolve({message:"correo existente"})
                    ;
                }else{
                    client.query(`insert into contacto(nombre,apellidos,correo1,correo2,telefono1,extensionTelefonica,telefono2,puesto,tipoContacto,fk_clientesads) values('${data[0]}','${data[1]}','${data[2]}','${data[3]}','${data[4]}','${data[5]}','${data[6]}','${data[7]}','${data[8]}','${data[9]}')`) 
                    resolve({message:"registro exitoso"})
                    ;
                }
            }) 
        })
    }   
    const updateInsertProductoServicio = (data)=> { 
        return new Promise((resolve,reject)=>{  
                client.query(`insert into productoServicio(tipo,concepto,precio,consecutivo,tipoLicenciamiento,LineaProducto,id_actualizacion,asignacion,fechaRegistro,fk_empresa) values('${data[0]}','${data[1]}','${data[2]}','${data[3]}','${data[4]}','${data[5]}','${data[6]}','${data[7]}','${data[8]}','${data[9]}')`) 
                resolve({message:"registro exitoso"})   
                ;   
        })
    }
    // ******************

      const insertProductoServicio =  async data=> { 
        return new Promise((resolve,reject) =>{ 
         client.query(`select * from productoServicio where fk_empresa='${data[9]}' and concepto='${data[1]}' and consecutivo = '${data[3]}' `,
         function(err,results,field){
          var string = JSON.stringify(results)
          var resultados=JSON.parse(string);
          if (resultados[0]){
              resolve({message:"El concepto ya fue registrado"})
          }else{   
            client.query(`insert into productoServicio(tipo,concepto,precio,consecutivo,tipoLicenciamiento,LineaProducto,id_actualizacion,asignacion,fechaRegistro,fk_empresa) values('${data[0]}','${data[1]}','${data[2]}','${data[3]}','${data[4]}','${data[5]}','${data[6]}','${data[7]}','${data[8]}','${data[9]}')`,function(param1,param2){
                var stringParam = JSON.stringify(param2)
                var resultadosParam =  JSON.parse(stringParam)
                client.query(`update productoServicio set asignacion ='${resultadosParam.insertId}' where id_productoServicio = '${resultadosParam.insertId}'`)
            }) 
            resolve({message:"registro exitoso"})
            ;
          }        
      })
      })
    }

// ********* Actualizar despues a esta cuando este funcionando la tabla de productos y servicios********
    const getTablaProductoServicio  = ( data)  => {
        return new Promise((resolve,reject)=>{     
            client.query(`select * from productoServicio where fk_empresa ='${data[0]}'  `, function (err,result,fields ) {                                    
                var string = JSON.stringify(result)
                var resultados=JSON.parse(string);   
                resolve(resultados)     
                ;                               
            }) 
        })
    }   

       const getAllTablaProductoServicio  = ( data)  => {
        return new Promise((resolve,reject)=>{                                
            client.query(`select * from productoServicio where  fk_empresa = '${data[0]}'`, function (err,result,fields ) {                                    
                var string = JSON.stringify(result)
                var resultados=JSON.parse(string);                                
                resolve(resultados)            
                ;                        
            }) 
        })
    } 
    const insertClientesAlfa = (data)=> { 
        return new Promise((resolve,reject)=>{ 
            client.query(`select * from clientesads where rfc = '${data[0]}'`,function(err,results,fields){
                var string = JSON.stringify(results)
                var resultados=JSON.parse(string);   
                if(resultados[0]){
                    resolve({message:"rfc ya registrado"})  
                    ; 
                }else{
                    client.query(`insert into clientesads(rfc,razonSocial,tipoEmpresa,tamanoEmpresa,giroEmpresarial,domicilioFiscal,paginaWeb,acceso,fk_empresa) values('${data[0]}','${data[1]}','${data[2]}','${data[3]}','${data[4]}','${data[5]}','${data[6]}','false','${data[7]}')`) 
                    resolve({message:"registro exitoso"})   
     ;
                }
            })
                    
        })
    }
    const getTablaClientesAlfa = ( data)  => {
        return new Promise((resolve,reject)=>{
            client.query(`select * from clientesads where fk_empresa='${data[0]}' ORDER BY razonSocial ASC`, function (err,results,fields ) {                
                var string = JSON.stringify(results)
                var resultados=JSON.parse(string);   
                resolve(resultados)
                ;
            }) 
        })
    }    
    const SendEmailCotizacion   = (data)  => {
        let telefono = data[5]
        let extension =  data[6]
        var date= new Date()
        let fecha = date.toLocaleString('es') 
        return new Promise((resolve,reject)=>{
        if(data[0] === "1"){
                var transporter = nodemailer.createTransport({  
                secure: true,
                host: 'adscontigo.com',
                port: 465,
                auth: {
                        user: 'ventas@adscontigo.com',
                        pass: 'Nu07b_s38',                       
                },
                
                tls: {rejectUnauthorized: false},
                });
                const mailOptions = {
                from: 'ventas@adscontigo.com',  // sender address
                to: `jesus.francisco@ads.com.mx,${data[4]}`, // list of receivers
                // subject: 'Cotizacion de producto o servicio' + " " + fecha, // Subject line
                subject: 'Gracias por su interés en Alfa Diseño de Sistemas', // Subject line
                text: 'Archivo de cotización PDF',
                html: `<p>
                    Basado en su solicitud de cotización, adjunto en este email nuestra propuesta comercial.
                    <br/>
                    <br/>
                    <br/>
                    Notificar si tiene alguna pregunta respondiendo a este correo electrónico o llamando
                    a los teléfonos ${telefono} extensión ${extension}.
                    <br/>
                    <br/>
                    ${data[11]}
                    <br/><br/>
                    <strong>Alfa Diseño de Sistemas, es un Distribuidor Asociado Master de CONTPAQi®
                    que ha recibido el reconocimiento como el Primer Lugar en Ventas por 17 Años consecutivos en la
                    Ciudad de México.</strong>
                    <br/>
                    <br/>
                    Saludos cordiales, 
                    <center><br/><br/>${data[2]}<br/>
                Ejecutivo de ventas <br/>
                ALFA DISEÑO DE SISTEMAS, S.A. DE C.V.<br/>
                www.ads.com.mx<br/>${data[3]}</center>
                </p>`,
                attachments: [{
                    filename:  data[9],
                    path: data[10],
                    contentType: 'application/pdf'
                }]
                };
                console.log("transporter",transporter);

                transporter.sendMail(mailOptions, function (err, info) {
                    if("este es el error" , err)
                    console.log(err)
                    else
                    console.log("esta es la info" ,  info);
            
            });
            client.query(`delete from urlFirebaseTemporal where folio ='${data[7]}'`)
            resolve({message:"Correo Enviado"})
            ;      
        }if(data[0] === "2"){
            var transporter = nodemailer.createTransport({  
                secure: true,
                host: 'adscontigo.com',
                port: 465,
                auth: {
                        user: 'ventas@adscontigo.com',
                        pass: 'Nu07b_s38',                       
                },
                
                tls: {rejectUnauthorized: false},
                });
                const mailOptions = {
                from: 'ventas@adscontigo.com',  // sender address
                to: ` jesus.francisco@ads.com.mx`, // list of receivers
                // subject: 'Cotizacion de producto o servicio' + " " + fecha, // Subject line
                subject: 'Gracias por su interés en Alfa Diseño de Sistemas', // Subject line
                text: 'Archivo de cotización PDF',
                html: `<p>
                    Basado en su solicitud de cotización, adjunto en este email nuestra propuesta comercial.
                    <br/>
                    <br/>
                    <br/>
                    Notificar si tiene alguna pregunta respondiendo a este correo electrónico o llamando
                    a los teléfonos ${telefono} extensión ${extension}.
                    <br/>
                    <br/>
                    ${data[14]}
                    <br/><br/>
                    <strong>Alfa Diseño de Sistemas, es un Distribuidor Asociado Master de CONTPAQi®
                    que ha recibido el reconocimiento como el Primer Lugar en Ventas por 17 Años consecutivos en la
                    Ciudad de México.</strong>
                    <br/>
                    <br/>
                    Saludos cordiales, 
                    <center><br/><br/>${data[2]}<br/>
                Ejecutivo de ventas <br/>
                ALFA DISEÑO DE SISTEMAS, S.A. DE C.V.<br/>
                www.ads.com.mx<br/>${data[3]}</center>
                </p>`,
                attachments: [{
                    filename:  data[10],
                    path: data[12],
                    contentType: 'application/pdf'
                },{
                    filename:  data[11],
                    path: data[13],
                    contentType: 'application/pdf'
                }]
                };
                console.log("transporter",transporter);

                transporter.sendMail(mailOptions, function (err, info) {
                    if("este es el error" , err)
                    console.log(err)
                    else
                    console.log("esta es la info" ,  info);
            
            });
            client.query(`delete from urlFirebaseTemporal where folio ='${data[7]}'`)
            resolve({message:"Correo Enviado"})     
            ; 
        }if(data[0] === "3"){
            var transporter = nodemailer.createTransport({  
                secure: true,
                host: 'adscontigo.com',
                port: 465,
                auth: {
                        user: 'ventas@adscontigo.com',
                        pass: 'Nu07b_s38',                       
                },
                
                tls: {rejectUnauthorized: false},
                });
                const mailOptions = {
                from: 'ventas@adscontigo.com',  // sender address
                to: ` jesus.francisco@ads.com.mx`, // list of receivers
                // subject: 'Cotizacion de producto o servicio' + " " + fecha, // Subject line
                subject: 'Gracias por su interés en Alfa Diseño de Sistemas', // Subject line
                text: 'Archivo de cotización PDF',
                html: `<p>
                    Basado en su solicitud de cotización, adjunto en este email nuestra propuesta comercial.
                    <br/>
                    <br/>
                    <br/>
                    Notificar si tiene alguna pregunta respondiendo a este correo electrónico o llamando
                    a los teléfonos ${telefono} extensión ${extension}.
                    <br/>
                    <br/>
                    ${data[17]}
                    <br/><br/>
                    <strong>Alfa Diseño de Sistemas, es un Distribuidor Asociado Master de CONTPAQi®
                    que ha recibido el reconocimiento como el Primer Lugar en Ventas por 17 Años consecutivos en la
                    Ciudad de México.</strong>
                    <br/>
                    <br/>
                    Saludos cordiales, 
                    <center><br/><br/>${data[2]}<br/>
                Ejecutivo de ventas <br/>
                ALFA DISEÑO DE SISTEMAS, S.A. DE C.V.<br/>
                www.ads.com.mx<br/>${data[3]}</center>
                </p>`,
                attachments: [{
                    filename:  data[11],
                    path: data[14],
                    contentType: 'application/pdf'
                },{
                    filename:  data[12],
                    path: data[15],
                    contentType: 'application/pdf'
                },,{
                    filename:  data[13],
                    path: data[16],
                    contentType: 'application/pdf'
                }]
                };
                transporter.sendMail(mailOptions, function (err, info) {
                    if("este es el error" , err)
                    console.log(err)
                    else
                    console.log("esta es la info" ,  info);
            
            });
            client.query(`delete from urlFirebaseTemporal where folio ='${data[7]}'`)
            resolve({message:"Correo Enviado"}) 
            ;     
        }if(data[0] === "4"){
            var transporter = nodemailer.createTransport({  
                secure: true,
                host: 'adscontigo.com',
                port: 465,
                auth: {
                        user: 'ventas@adscontigo.com',
                        pass: 'Nu07b_s38',                       
                },
                
                tls: {rejectUnauthorized: false},
                });
                const mailOptions = {
                from: 'ventas@adscontigo.com',  // sender address
                to: `jesus.francisco@ads.com.mx`, // list of receivers
                // subject: 'Cotizacion de producto o servicio' + " " + fecha, // Subject line
                subject: 'Gracias por su interés en Alfa Diseño de Sistemas', // Subject line
                text: 'Archivo de cotización PDF',
                html: `<p>
                    Basado en su solicitud de cotización, adjunto en este email nuestra propuesta comercial.
                    <br/>
                    <br/>
                    <br/>
                    Notificar si tiene alguna pregunta respondiendo a este correo electrónico o llamando
                    a los teléfonos ${telefono} extensión ${extension}.
                    <br/>
                    <br/>
                    ${data[20]}
                    <br/><br/>
                    <strong>Alfa Diseño de Sistemas, es un Distribuidor Asociado Master de CONTPAQi®
                    que ha recibido el reconocimiento como el Primer Lugar en Ventas por 17 Años consecutivos en la
                    Ciudad de México.</strong>
                    <br/>
                    <br/>
                    Saludos cordiales, 
                    <center><br/><br/>${data[2]}<br/>
                Ejecutivo de ventas <br/>
                ALFA DISEÑO DE SISTEMAS, S.A. DE C.V.<br/>
                www.ads.com.mx<br/>${data[3]}</center>
                </p>`,
                attachments: [{
                    filename:  data[12],
                    path: data[16],
                    contentType: 'application/pdf'
                },{
                    filename:  data[13],
                    path: data[17],
                    contentType: 'application/pdf'
                },,{
                    filename:  data[14],
                    path: data[18],
                    contentType: 'application/pdf'
                },{
                    filename:  data[15],
                    path: data[19],
                    contentType: 'application/pdf'
                }]
                };
                console.log("transporter",transporter);

                transporter.sendMail(mailOptions, function (err, info) {
                    if("este es el error" , err)
                    console.log(err)
                    else
                    console.log("esta es la info" ,  info);
            
            });
            client.query(`delete from urlFirebaseTemporal where folio ='${data[7]}'`)
            resolve({message:"Correo Enviado"})      
        }if(data[0] === "5"){
            var transporter = nodemailer.createTransport({  
                secure: true,
                host: 'adscontigo.com',
                port: 465,
                auth: {
                        user: 'ventas@adscontigo.com',
                        pass: 'Nu07b_s38',                       
                },
                
                tls: {rejectUnauthorized: false},
                });
                const mailOptions = {
                from: 'ventas@adscontigo.com',  // sender address
                to: ` jesus.francisco@ads.com.mx`, // list of receivers
                // subject: 'Cotizacion de producto o servicio' + " " + fecha, // Subject line
                subject: 'Gracias por su interés en Alfa Diseño de Sistemas', // Subject line
                text: 'Archivo de cotización PDF',
                html: `<p>
                    <strong> Basado en su solicitud de cotización, adjunto en este email nuestra propuesta comercial.</strong>
                    <br/>
                    <br/>
                    <br/>
                    Notificar si tiene alguna pregunta respondiendo a este correo electrónico o llamando
                    a los teléfonos ${telefono} extensión ${extension}.
                    <br/>
                    <br/>
                    <strong>${data[23]}</strong>
                    <br/><br/>
                    <strong>Alfa Diseño de Sistemas, es un Distribuidor Asociado Master de CONTPAQi®
                    que ha recibido el reconocimiento como el Primer Lugar en Ventas por 17 Años consecutivos en la
                    Ciudad de México.</strong>
                    <br/>
                    <br/>
                    Saludos cordiales, 
                    <center><br/><br/>${data[2]}<br/>
                Ejecutivo de ventas <br/>
                ALFA DISEÑO DE SISTEMAS, S.A. DE C.V.<br/>
                www.ads.com.mx<br/>${data[3]}</center>
                </p>`,
                attachments: [{
                    filename:  data[13],
                    path: data[18],
                    contentType: 'application/pdf'
                },{
                    filename:  data[14],
                    path: data[19],
                    contentType: 'application/pdf'
                },,{
                    filename:  data[15],
                    path: data[20],
                    contentType: 'application/pdf'
                },{
                    filename:  data[16],
                    path: data[21],
                    contentType: 'application/pdf'
                },{
                    filename:  data[17],
                    path: data[22],
                    contentType: 'application/pdf'
                }]
                };
                transporter.sendMail(mailOptions, function (err, info) {
                    if("este es el error" , err)
                    console.log(err)
                    else
                    console.log("esta es la info" ,  info);
            
            });
            client.query(`delete from urlFirebaseTemporal where folio ='${data[7]}'`)
            resolve({message:"Correo Enviado"})  
            ;    
        }
        })

    }                 
    const insertTotales = ( data)  => {
        return new Promise((resolve,reject)=>{
            // client.query(`select MAX(id_cotizaciones) as maxid from cotizaciones`,function(err,results,fields){
            //     var string =JSON.stringify(results)
            //     var resultados = JSON.parse(string);   
            // })
            client.query(`insert into totales(subtotal,iva,total,NumFolio) values('${data[1]}','${data[2]}','${data[3]}','${data[0]}')`)
            ;
        })
    } 
    const getIdClientesAlfa = ( data)  => {
        return new Promise((resolve,reject)=>{
            client.query(`select * from clientesads where id_cliente='${data[0]}'`, function (err,results,fields ) {                
                var string = JSON.stringify(results)
                var resultados=JSON.parse(string); 
                resolve(resultados)
                ;
            }) 
        })
    }    
    const getTablaContactos = ( data)  => {
        return new Promise((resolve,reject)=>{
            client.query(`select * from contacto where fk_clientesads='${data[0]}' ORDER BY apellidos ASC`, function (err,results,fields ) {                
                var string = JSON.stringify(results)
                var resultados=JSON.parse(string);   
                resolve(resultados)
                ;
            }) 
        })
    }
    const getProductoServicioByFolio = ( data)  => {
        return new Promise((resolve,reject)=>{
            client.query(`select * from cotizaciones inner join productoservicio on cotizaciones.fk_productoservicio = productoservicio.id_productoServicio  where cotizaciones.NumFolio ='${data[0]}'`,function(err,results,fields){
                var string =JSON.stringify(results)
                var resultados = JSON.parse(string);
                resolve(resultados)
                ;
            })
        })
    }    
    const getCotizacionesFolio  = ( data)  => {
        return new Promise((resolve,reject)=>{
            client.query(`select * from cotizaciones inner join productoservicio on cotizaciones.fk_productoservicio = productoservicio.id_productoServicio  where cotizaciones.NumFolio ='${data[0]}'`,function(err,results,fields){
                var string =JSON.stringify(results)
                var resultados = JSON.parse(string);
                resolve(resultados)
                ;
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
                ;
            })    
        })
    }
    const UpdateStatusCotizacion = ( data)  => {
        return new Promise((resolve,reject)=>{
            client.query(`update cotizaciones set statusCotizacion = '${data[1]}' where NumFolio ='${data[0]}'`)
            resolve({message:"actualizacion exitosa"})
            ;
        })
    }    
    const GetClienteId = ( data)  => {
        return new Promise((resolve,reject)=>{             
            client.query(`select * from clientesads where id_cliente ='${data[0]}'`, function (err,results,fields ) {                
                var string = JSON.stringify(results)
                var resultados=JSON.parse(string);                      
                resolve(resultados)
                ;
            }) 
        })
    }  
    const GetContactoId = ( data)  => {
        return new Promise((resolve,reject)=>{             
            client.query(`select * from contacto where id_contacto ='${data[0]}'`, function (err,results,fields ) {                
                var string = JSON.stringify(results)
                var resultados=JSON.parse(string);                      
                resolve(resultados)
                ;
            }) 
        })
    }  
    const updateContacto = ( data)  => {
        return new Promise((resolve,reject)=>{
            client.query(`update contacto set  nombre='${data[1]}',apellidos='${data[2]}',correo1='${data[3]}',correo2='${data[4]}',telefono1='${data[5]}',extensionTelefonica='${data[6]}',telefono2='${data[7]}',puesto='${data[8]}',tipoContacto='${data[9]}' where id_contacto='${data[0]}'`) 
            resolve({message:"actualizacion exitosa"})
            ;
        })
    }
    const deliteContacto  = ( data)  => {
        return new Promise((resolve,reject)=>{                        
            client.query(`delete from contacto where id_contacto='${data[0]}'`) 
            resolve({message:"delite exitoso"})
            ;
        })   
    }
    const CotizacionVencida   = ( data)  => {
        return new Promise((resolve,reject)=>{                        
            client.query(`update cotizaciones set vigencia = "vencida"  where NumFolio='${data[0]}'`);
            resolve({message:`folio ${data[0]} vencida`})
            ;
        })
    }
    const getContactosId   = ( data)  => {
        return new Promise((resolve,reject)=>{
            client.query(`select * from contacto where fk_clientesads='${data[0]}'`, function (err,results,fields ) {                
                var string = JSON.stringify(results)
                var resultados=JSON.parse(string);
                resolve(resultados)
                ;
            }) 
        })
    }
    const getCotizacionFk_Contactos = ( data)  => {
        return new Promise((resolve,reject)=>{
            client.query(`select * from contacto where id_contacto='${data[0]}'`, function (err,results,fields ) {                
                var string = JSON.stringify(results)
                var resultados=JSON.parse(string);   
                ;
                resolve(resultados)
            }) 
        })
    }
    const AccesoSistema = ( data)  => {
                console.log("data",data)
                return new Promise((resolve,reject)=>{
                    client.query(`select * from clientesAds where fk_contactoAcceso = '${data[2]}'`,function(err,result,field){
                        var string = JSON.stringify(result)
                        var resultado = JSON.parse(string)
                        console.log("resultado",resultado)
                        if(resultado[0]){
                            resolve({message:"Contacto ya asignado"})
                        }else{
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
                                            ; 
                                            var transporter = nodemailer.createTransport({  
                                                secure: true,
                                                host: 'adscontigo.com',
                                                port: 465,
                                                auth: {
                                                        user: 'ventas@adscontigo.com',
                                                        pass: 'Nu07b_s38',                       
                                                },
                                                
                                                tls: {rejectUnauthorized: false},
                                                });
                                                const mailOptions = {
                                                    from: 'ventas@adscontigo.com',   // sender address
                                                to: `${data[1]},jesus.francisco@ads.com.mx`, // list of receivers
                                                // subject: 'Cotizacion de producto o servicio' + " " + fecha, // Subject line
                                                subject: 'Gracias por su interés en Alfa Diseño de Sistemas', // Subject line
                                                text: 'Datos de acceso',
                                                html: `<p><strong>Alfa Diseño de Sistemas, es un Distribuidor Asociado Master de CONTPAQi®
                                                    que ha recibido el reconocimiento como el Primer Lugar en Ventas por 17 Años consecutivos en la
                                                    Ciudad de México.</strong>
                                                    <br/>
                                                    <br/>
                                                    <br/>
                                                    Basado en su solicitud de acceso, Se le otorgan los siguientes datos para que usted disfrute de los beneficios de la plataforma de ADS en el sitio https://www.ads.com.mx<br/><br/><br/>
                                                    Correo: ${data[1]}<br/>
                                                    Contraseña:${folio}<br/>
                                                    <br/>
                                                        No olvide ingresar al vínculo plataforma.adscontigo.com en su navegador para acceder al sistema de clientes
                                                    <br/>
                                                        Se le sugiere cambiar su <strong>contraseña</strong> para la seguridad de su sesión.
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
                        }
                     })
                    
                })
            }
        
    const LoginClientes = ( data)  => {
        return new Promise((resolve,reject) =>{ 
            client.query(`select * from contacto where correo1= '${data[0]}'`,
                function(err,results,field){
                    if(err){ reject(err)
                    }
                var string = JSON.stringify(results)
                var resultados=JSON.parse(string);
                if(resultados[0]){
                    client.query(`select * from clientesads where acceso = 'true' and id_cliente = '${resultados[0].fk_clientesads}'`,function(error,result,fields){
                        let string2 = JSON.stringify(result)
                        let resultados2 = JSON.parse(string2)
                        ;
                        bcrypt.compare(data[1],resultados[0].contraseña,function(error,res){
                            if(res){
                                resolve({
                                id_contacto:resultados[0].id_contacto,
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
            ;
        })
    }
    const GetClienteByCorreo = ( data)  => {
        return new Promise((resolve,reject)=>{
            client.query(`select * from clientesads inner join contacto on contacto.fk_clientesads = clientesads.id_cliente where contacto.correo1='${data[0]}'`, function (err,results,fields ) {  
                var string = JSON.stringify(results)
                var resultados=JSON.parse(string);             
                ;
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
                            ;
                        }
                    })
                }                       
            })
            
        })
    }
    const RegisterSupport = ( data)  => {
        return new Promise((resolve,reject)=>{
            var consecutivo;
             client.query(`select max(id_soporte) as maxid, folio from soporte`,function(err,results,fields){
                var string = JSON.stringify(results) 
                var resultados = JSON.parse(string)
                if(resultados[0].folio){
                    consecutivo  = data[7] + (resultados[0].folio.length - 1 + 1)
                    client.query(`insert into soporte (fechaSoporte,consola,numeroPoliza,asunto,idTeamviewer,passTeamviewer,folio,telefonoContacto,status,fk_cliente,fk_empresa,fk_contacto,fechaFinalizacion,statusEncuesta) values ('${data[0]}','${data[1]}','${data[2]}','${data[3]}','${data[5]}','${data[6]}','${consecutivo}','${data[10]}','Pendiente','${data[4]}','${data[8]}','${data[9]}',"En proceso","No aplicada")`)
                }else{
                    consecutivo = data[7] + 1
                    client.query(`insert into soporte (fechaSoporte,consola,numeroPoliza,asunto,idTeamviewer,passTeamviewer,folio,telefonoContacto,status,fk_cliente,fk_empresa,fk_contacto,fechaFinalizacion,statusEncuesta) values ('${data[0]}','${data[1]}','${data[2]}','${data[3]}','${data[5]}','${data[6]}','${consecutivo}','${data[10]}','Pendiente','${data[4]}','${data[8]}','${data[9]}',"En proceso","No aplicada")`)
                }
            })
            client.query(`select * from clientesads where id_cliente = '${data[4]}'`,function(err,result,field ){
                var string =  JSON.stringify(result)
                var resultados = JSON.parse(string)
                ;
                let folio =  data[7]
                var transporter = nodemailer.createTransport({  
                    secure: true,
                    host: 'adscontigo.com',
                    port: 465,
                    auth: {
                            user: 'ventas@adscontigo.com',
                            pass: 'Nu07b_s38',                       
                    },
                    
                    tls: {rejectUnauthorized: false},
                    });
                    const mailOptions = {
                        from: 'ventas@adscontigo.com',  // sender address
                to: `miriam.quiroz@ads.com.mx,jesus.francisco@ads.com.mx`, // list of receivers
                // subject: 'Cotizacion de producto o servicio' + " " + fecha, // Subject line
                subject: 'Solicitud de soporte a Alfa Diseño de Sistemas', // Subject line
                text: 'Datos Obtenidos',
                html: `<p><strong> Alfa Diseño de Sistemas, es un Distribuidor Asociado Master de CONTPAQi®
                    que ha recibido el reconocimiento como el Primer Lugar en Ventas por 17 Años consecutivos en la
                    Ciudad de México.</strong>
                    <br/>
                    Basado en la solicitud de soporte, Se le Proporcionan los datos del clinte<br/><br/><br/>
                    Cliente: <strong>${resultados[0].razonSocial}</strong><br/>
                    RFC: <strong>${resultados[0].rfc}</strong><br/>
                    Fecha de solicitud: <strong>${data[0]}</strong><br/>
                    Consola: <strong>${data[1]}</strong><br/>
                    Número de póliza: <strong>${data[2]}</strong><br/>
                    Asunto del soporte: <strong>${data[3]}</strong><br/>
                    Status: <strong>Pendiente de asignar</strong> <br/>
                    Id del Teamviewer: <strong>${data[5]}</strong><br/>
                    Contraseña de acceso: <strong>${data[6]}</strong><br/>
                    Folio de la solicitud: <strong>${folio}</strong><br/>
                    <br/>
                    <strong>Nota: Se requiere seguimiento del proceso de soporte dentro del módulo administración/Soporte técnico y contactar al cliente.</strong>
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
            })
            resolve({message:"actualización exitosa"})                
        })
    }
    const GetAdminAlfa = ( data)  => {
        return new Promise((resolve,reject)=>{
            client.query(`select * from adminalfa where id_admin ='${data[0]}'`, function (err,results,fields ) {                
                var string = JSON.stringify(results)
                var resultados=JSON.parse(string);
                resolve(resultados)
                ;
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
                resolve(resultados) 
                ;
            }) 
        })
    }
    const QuitarAccesoSistema = ( data)  => {
        return new Promise((resolve,reject)=>{
            client.query(`update clientesads set acceso = 'false', fk_contactoAcceso = ''  where id_cliente  = '${data[0]}'`)
            client.query(`update contacto set contraseña = '' where  id_contacto = '${data[1]}'`)  
            resolve({message:"acceso removido"})
            ;
        })
    }   
    const insertURLVideos = (data)=> { 
            // console.log("esta es la data",data)
            return new Promise((resolve,reject)=>{ 
                client.query(`insert into videosprivados(descripcion,autor,urlVideos,fechaInicio,fechaExpiracion,statusVideo,fk_empresa) values('${data[0]}','${data[1]}','${data[2]}','${data[3]}','${data[4]}','true','${data[5]}')`) 
                resolve({message:"registro exitoso"})   
                ;         
        })
    }    
    const getURLVideos = ( data)  => {
        return new Promise((resolve,reject)=>{
            client.query(`select * from videosPrivados where fk_empresa='${data[0]}'`, function (err,results,fields ) {                
                var string = JSON.stringify(results)
                var resultados=JSON.parse(string);
                resolve(resultados)
                ;
            })
        })
    } 
    const ventas = (data)=> {   
        // console.log("numFolio:", data[0],"cantidad:",data[1],"descuento:",data[2],"descuentoAplicado:",data[3],"TotalPrecioProducto:",data[4],
        // "ProductoPrecioUnitario:",data[5],"TotalPrecioProductoIVA:",data[6],"fechaPago:",data[7],"hora:",data[8],"banco:",data[9],"referenciaPago:",data[10],"tipoPago:",data[11],"importe:",data[12],"fechaInicialPoliza:",data[13],"statusPoliza:",data[14],"fk_productoServicio:",data[15],"fk_cliente:",data[16],"fk_adminalfa",data[17],"fk_empresa:",data[18],"fk_contacto:",data[19]);   
            return new Promise( (resolve,reject)=>{  
            client.query(`insert into ventas(numFolio,cantidad,descuento,descuentoAplicado,TotalPrecioProducto,ProductoPrecioUnitario,TotalPrecioProductoIVA,fechaPago,hora,banco,referenciaPago,tipoPago,importe,fechaEmisionVenta,statusPoliza,fk_productoServicio,fk_cliente,fk_adminalfa,fk_empresa,fk_contacto)values('${data[0]}','${data[1]}','${data[2]}','${data[3]}','${data[4]}','${data[5]}','${data[6]}','${data[7]}','${data[8]}','${data[9]}','${data[10]}','${data[11]}','${data[12]}','${data[13]}','${data[14]}','${data[15]}','${data[16]}','${data[17]}','${data[18]}','${data[19]}')`);
            resolve({message:"registro exitoso"})
            ;
        })
    } 
    const insertTotalesVenta = ( data)  => {
    //    console.log("insertTotalesVenta",data)
    return new Promise((resolve,reject)=>{
        // client.query(`select MAX(id_cotizaciones) as maxid from cotizaciones`,function(err,results,fields){
        //     var string =JSON.stringify(results)
        //     var resultados = JSON.parse(string);   
        // })
        client.query(`insert into totalVenta(subTotal,IVA,total,numFolioVenta)values('${data[0]}','${data[1]}','${data[2]}','${data[3]}')`);
        })
    } 
    const RegisterPoliza = ( data)  => {
     return new Promise(async(resolve,reject)=>{
        client.query(`insert into polizas (fechaInicial,fechaFinal,statusPoliza,fk_productoServicio,fk_cliente,fk_contacto) values ('${data[0]}','${data[1]}','${data[2]}','${data[3]}','${data[4]}','${data[5]}')`,function(err,results){
            var string = JSON.stringify(results)
            var resultados =  JSON.parse(string)
            ;
            if(resultados.insertId){
                resolve({message:"registro exitoso",maxid:resultados.insertId})
            }
        })
     })
    }     
    const GetPolizas = ( data)  => {
        return new Promise((resolve,reject)=>{
            client.query(`select * from polizas inner join clientesads on polizas.fk_cliente = clientesads.id_cliente inner join productoServicio on polizas.fk_productoServicio = productoServicio.id_productoServicio where clientesads.fk_empresa = '${data[0]}'`,function(err,results,fields){
            var string = JSON.stringify(results)
            var resultados=JSON.parse(string);
            resolve(resultados)
            ;
            })
        })
    } 
    const ActivarPoliza = ( data)  => {
        return new Promise((resolve,reject)=>{
           client.query(`update polizas set fechaInicial = '${data[0]}',fechaFinal = '${data[2]}', statusPoliza = 'activa' where id_polizas = '${data[1]}'`)
           resolve({message:"Activacion exitosa"})
            ;
        })
    } 
    const EditarPoliza = ( data)  => {
        return new Promise((resolve,reject)=>{
           client.query(`update polizas set fechaInicial = '${data[0]}',fechaFinal = '${data[2]}', statusPoliza = 'activa' where id_polizas = '${data[1]}'`)
           resolve({message:"Activacion exitosa"})
            ;
        })
    } 
    const GetPoliza = ( data)  => {
        return new Promise((resolve,reject)=>{
            client.query(`select * from polizas inner join productoServicio on polizas.fk_productoServicio = productoServicio.id_productoServicio where polizas.fk_cliente = '${data[0]}'`,function(err,results,fields){
            var string = JSON.stringify(results)
            var resultados=JSON.parse(string);
            resolve(resultados)
            ;
            })
        })
    } 
    // const polizaVencida  = ( data)  => {
    //     console.log("esto es data de polizas vencidas",data)
    //     return new Promise((resolve,reject)=>{                        
    //         client.query(`update polizas set statusPoliza = "inactiva"  where id_polizas='${data[0]}'`);
    //         resolve({message:`folio ${data[0]} vencida`})
    //     })
    // }
    const GetTableInicioSesion = ( data)  => {
        return new Promise((resolve,reject)=>{

            client.query(`select * from transaccionesClientes inner join clientesads on transaccionesClientes.id_cliente = clientesads.id_cliente where transaccionesClientes.id_cliente = '${data[0]}'`,
            function(err,results,fields){
                var string = JSON.stringify(results)
                var resultados=JSON.parse(string);
                resolve(resultados)
                ;
            })
        })
    } 
    const getVentasTablaIndicadores  = ( data)  => {
        return new Promise((resolve,reject)=>{
            client.query(`select * from ventas inner join productoServicio on ventas.fk_productoServicio = productoServicio.id_productoServicio where ventas.fk_adminalfa='${data[0]}'` , function (err,results,fields ) {            
                var string = JSON.stringify(results)
                var resultados=JSON.parse(string);
                resolve(resultados)   
                ;                
            }) 
        })
    }
    const getVentasTabla  = ( data)  => {
        return new Promise((resolve,reject)=>{
            client.query(`select * from ventas where fk_adminalfa='${data[0]}'` , function (err,results,fields ) {            
                var string = JSON.stringify(results)
                var resultados=JSON.parse(string);
                resolve(resultados)           
                ;        
            }) 
        })
    }
    const getIdVenta  = ( data)  => {
        return new Promise((resolve,reject)=>{
            client.query(`select * from ventas inner join clientesads on ventas.fk_cliente=clientesads.id_cliente where fk_cliente='${data[0]}'` , function (err,results,fields ) {            
                var string = JSON.stringify(results)
                var resultados=JSON.parse(string);    
                resolve(resultados) 
                ;               
            }) 
        })
    }
    const getTotalesByFolioVenta = ( data)  => {
        return new Promise((resolve,reject)=>{
            client.query(`select * from totalventa where numFolioVenta= '${data[0]}'`,function(err,results,fields){
                var string =JSON.stringify(results)
                var resultados = JSON.parse(string);
                resolve(resultados) 
                ;
            })    
        })
    }
    const getProductoServicioByFolioVentas = ( data)  => {
        return new Promise((resolve,reject)=>{
            client.query(`select * from ventas inner join productoservicio on ventas.fk_productoservicio = productoservicio.id_productoServicio  where ventas.numFolio = '${data[0]}'`,
            function(err,results,fields){
                var string =JSON.stringify(results)
                var resultados = JSON.parse(string);
                resolve(resultados)
                ;
            })
        })
    }
    const getMaxProductoServicio = ( data)  => {
        return new Promise((resolve,reject)=>{
            client.query(`select max(id_productoServicio) as id_maximo, tipo, tipoLicenciamiento, lineaProducto, concepto, precio, consecutivo, id_actualizacion, asignacion, fechaRegistro from productoservicio where asignacion = '${data[0]}'`, function(err,results,fields){
                var string =JSON.stringify(results)
                    var resultados = JSON.parse(string);
                    resolve(resultados)          
                    ;
            })
        })
    }  
    const GetProductoServicioActualizado = ( data)  => {
       return new Promise((resolve,reject)=>{
        client.query(`select * from productoServicio where id_productoServicio = '${data[0]}'`,
        function(err,results,fields){
            var string =JSON.stringify(results)
                var resultados = JSON.parse(string);
                ;
                resolve(resultados)  
            })
        })
    }
    const updateCliente = ( data)  => {
        //   console.log("data[0]:",data[0],"data[1]:",data[1],"data[2]:",data[2],"data[3]:",data[3],"data[4]:",data[4],"data[5]:",data[5],"data[6]:",data[6],"data[7]:",data[7])
            return new Promise((resolve,reject)=>{
                client.query(`update clientesads set  rfc='${data[4]}',razonSocial='${data[3]}',tipoEmpresa='${data[6]}',tamanoEmpresa='${data[5]}',giroEmpresarial='${data[2]}',paginaWeb='${data[7]}',domicilioFiscal='${data[1]}' where id_cliente='${data[0]}'`) 
                resolve({message:"actualizacion exitosa"})
                ;
        })
     }
    const polizaVencida   = ( data)  => {
        return new Promise((resolve,reject)=>{                        
            client.query(`update polizas set StatusPoliza = "vencida"  where id_polizas='${data[0]}'`);
            resolve({message:`folio ${data[0]} vencida`})
            ;
        })
    }

    // ************************
    const RegisterCupones = ( data)  => {
        return new Promise((resolve,reject)=>{
          client.query(`select * from cupones where id_Evento = '${data[5]}' and cuponActivo="true"`,function(err,result,fields){
              var string = JSON.stringify(result)
              var resultados = JSON.parse(string)
              if(resultados[0]){
                  resolve({message:"cupon existente"})
              }else{
                client.query(`insert into cupones (codigo,descripcion,descuento,polizaActivaVencida,cuponActivo,fechaRegistro,fechaExpiracion,id_Evento,url,fk_empresa) values ('${data[8]}','${data[0]}','${data[1]}','${data[2]}','true','${data[3]}','${data[4]}','${data[5]}','${data[6]}','${data[7]}')`) 
                resolve({message:"registro exitoso"})
                ;
              }
          })
          
        })
    }
    
  const GetCupones = ( data)  => {
      return new Promise((resolve,reject)=>{
          client.query(`select * from cupones where fk_empresa = '${data[0]}'`,function(err,result,fields){
                var string = JSON.stringify(result)
                var resultados = JSON.parse(string)
                resolve(resultados)
                ;
          })
      })
  }
  const UpdateCupones = ( data)  => {
      return new Promise((resolve,reject)=>{
            client.query(`update cupones set codigo = '${data[7]}', descripcion = '${data[0]}', descuento = '${data[1]}',polizaActivaVencida = '${data[2]}',cuponActivo = 'true',fechaExpiracion= '${data[3]}',id_Evento = '${data[4]}',url = '${data[5]}' where id_cupones = '${data[6]}'`) 
            resolve({message:"actualizacion exitoso"})
            ;
      })
  }
  const DeleteCupones = ( data)  => {
      return new Promise((resolve,reject)=>{
            client.query(`update cupones set cuponActivo = 'false' where id_cupones = '${data[0]}'`) 
            resolve({message:"actualizacion exitosa"})
            ;
      })
  }
  const RegisterSolictudCotizacion = ( data)  => {
      return new Promise((resolve,reject)=>{
            client.query(`insert into solicitudCotizacion (folioSolicitud, asesorAsignado, fechaEmision, fechaValidacion, fechaExpiracion, statusSolicitud,fk_productoServicio, fk_cliente,fk_empresa) values ('${data[0]}','${data[1]}','${data[2]}','${data[3]}','${data[4]}','${data[5]}','${data[6]}','${data[7]}','${data[12]}')`)
            resolve({message:"registro exitoso"}) 
            ;
      })
  }
  const SendMailSolicitudCotizacion = ( data)  => {
      return new Promise((resolve,reject)=>{
        var transporter = nodemailer.createTransport({  
            secure: true,
            host: 'adscontigo.com',
            port: 465,
            auth: {
                    user: 'ventas@adscontigo.com',
                    pass: 'Nu07b_s38',                       
            },
            
            tls: {rejectUnauthorized: false},
            });
            const mailOptions = {
                from: 'ventas@adscontigo.com',  // sender address
              to: `${data[6]}, jesus.francisco@ads.com.mx`, // list of receivers
              // subject: 'Cotizacion de producto o servicio' + " " + fecha, // Subject line
              subject: 'Gracias por su interés en Alfa Diseño de Sistemas', // Subject line
              text: 'Solicitud de Cotización',
              html: `<p> <strong> Alfa Diseño de Sistemas, es un Distribuidor Asociado Master de CONTPAQi®
                  que ha recibido el reconocimiento como el Primer Lugar en Ventas por 17 Años consecutivos en la
                  Ciudad de México. </strong>
                  <br/>
                  <br/>
                      Solicitud de cotizacion con el folio <strong> ${data[0]} </strong> de la empresa ${data[7]}, RFC ${data[8]}, <br/><br/><br/>
                  
                  <br/>
                      El documento expira el <strong>${data[9]}</strong>. 
                  <br/>
                  <br/>
                    Consulte el módulo de solicitudes para más detalles y no olvide aplicar los cambios necesarios.
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
              resolve({message:"envio exitoso"}) 
          })
  }
  const GetSolicitudes = ( data)  => {
      return new Promise((resolve,reject)=>{
          client.query(`select * from solicitudCotizacion inner join productoServicio on solicitudCotizacion.fk_productoServicio = productoServicio.id_productoServicio where solicitudCotizacion.fk_cliente = '${data[0]}'`,function(err,result,field){
                var string = JSON.stringify(result)
                var resultados =  JSON.parse(string)
                resolve(resultados)
                ;
          }) 
      })
  }
  const CancelSolicitud = ( data)  => {
      return new Promise((resolve,reject)=>{
            client.query(`update solicitudCotizacion set statusSolicitud = 'Cancelada', fechaValidacion = '${data[1]}' where folioSolicitud = '${data[0]}'`);
            resolve({message:"solicitud cancelada"})
            ;
      })
  }
  const GetSolicitudesByFkEmpresa = ( data)  => {
      return new Promise((resolve,reject)=>{
          client.query(`select * from solicitudCotizacion inner join productoServicio on solicitudCotizacion.fk_productoServicio = productoServicio.id_productoServicio where solicitudCotizacion.fk_Empresa = '${data[0]}'`,function(err,result,field){
            var string = JSON.stringify(result)
            var resultados =  JSON.parse(string)
            resolve(resultados)
            ;
          }) 
      })
  }
  const GetSupport = ( data)  => {
    return new Promise((resolve,reject)=>{
        client.query(`select * from soporte inner join clientesads on soporte.fk_cliente = clientesads.id_cliente where soporte.fk_empresa = '${data[0]}'`,function(err,results,fields){
            var string = JSON.stringify(results);
            var resultados = JSON.parse(string); 
            resolve(resultados)
            ;
        })
    })
}
const SendSupport = ( data)  => {
    return new Promise((resolve,reject)=>{
        client.query(`update soporte set status = 'En proceso', ejecutivo = '${data[10]}' where id_soporte = '${data[4]}'`)
        var transporter = nodemailer.createTransport({  
            secure: true,
            host: 'adscontigo.com',
            port: 465, 
            auth: {
                    user: 'ventas@adscontigo.com',
                    pass: 'Nu07b_s38',                       
            },
            
            tls: {rejectUnauthorized: false},
            });
            const mailOptions = {
                from: 'ventas@adscontigo.com', // sender address
            to: `${data[11]}, jesus.francisco@ads.com.mx`, // list of receivers
            // to: `jesus.francisco@ads.com.mx`, // list of receivers

            // 
            // subject: 'Cotizacion de producto o servicio' + " " + fecha, // Subject line
            subject: 'Gracias por su interés en Alfa Diseño de Sistemas', // Subject line
            text: 'Solicitud Soporte',
            html:`<html><body><p> <strong>Alfa Diseño de Sistemas, es un Distribuidor Asociado Master de CONTPAQi®
                que ha recibido el reconocimiento como el Primer Lugar en Ventas por 17 Años consecutivos en la
                Ciudad de México.</strong>
                <br/>
                <br/>
                <br/>
                    Solicitud de soporte con el folio <strong> ${data[3]} </strong> de la empresa ${data[8]}, RFC ${data[9]}, <br/><br/><br/>
                
                <br/>
                    Fecha de solicitud  <strong>${data[2]}</strong>. 
                <br/>
                <br/>
                    Asesor asignado  <strong>${data[10]}</strong>. 
                <br/>
                <br/>
                    Asunto  <strong>${data[0]}</strong>. 
                <br/>
                <br/>
                    No. Póliza  <strong>${data[7]}</strong>. 
                <br/>
                <br/>
                    Folio  <strong>${data[3]}</strong>. 
                <br/>
                <br/>
                    Consola  <strong>${data[1]}</strong>. 
                <br/>
                <br/>
                    Teléfono de contacto  <strong>${data[12]}</strong>. 
                <br/>
                <br/>
                    Id Acceso  <strong>${data[5]}</strong>. 
                <br/>
                <br/>
                    Contraseña  <strong>${data[6]}</strong>. 
                <br/>
                <br/>
                  Consulte el módulo de solicitudes para más detalles y no olvide aplicar los cambios necesarios.
                <br/>
                <br/>
                Saludos cordiales, 
                <center><br/><br/><br/>
                El equipo de desarrollo de <br/>
                ALFA DISEÑO DE SISTEMAS, S.A. DE C.V.<br/>
                www.ads.com.mx<br/></center>
            </p></body></html>  `
            };
            // <div>Please <a href="' + req.headers.host + 'user/activate/' + req.code + '" target="__new">click here</a> to active your account.</div>'
            transporter.sendMail(mailOptions, function (err, info) {
                if(err)
                console.log(err)
                else
                console.log("esta es la info" ,  info);
        
            }); 
            ;
        resolve({message:"Asesor asignado"});
    })
}
const GetPolizasById = ( data)  => {
    return new Promise((resolve,reject)=>{
        client.query(`select * from polizas inner join productoServicio on polizas.fk_productoServicio = productoServicio.id_productoServicio where id_polizas = '${data[0]}'`,function(err,results,fields){
           var string = JSON.stringify(results);
           var resultados = JSON.parse(string); 
            ;
           resolve(resultados)
        })
    })
}
const EndSupport = ( data)  => {
    return new Promise((resolve,reject)=>{
        client.query(`update soporte set status = '${data[3]}', fechaFinalizacion = '${data[4]}' where id_soporte = '${data[0]}'`)
        client.query(`select * from contacto where id_contacto = '${data[1]}'`, function(err,results,fields){

            var string = JSON.stringify(results);
            var resultados = JSON.parse(string); 
            ;
            var transporter = nodemailer.createTransport({  
                secure: true,
                host: 'adscontigo.com',
                port: 465,
                auth: {
                        user: 'ventas@adscontigo.com',
                        pass: 'Nu07b_s38',                       
                },
                
                tls: {rejectUnauthorized: false},
                });
                const mailOptions = {
                    from: 'ventas@adscontigo.com', // sender address
                to: `${resultados[0].correo1},jesus.francisco@ads.com.mx,miriam.quiroz@ads.com.mx `,
                subject: 'Información de seguimiento de solicitudes de soporte', // Subject line
                text: 'Proceso de soporte técnico',
                html: `<p>
                        Solicitud de soporte mediante la plataforma ADS Contigo apartado Clientes con el folio <strong> ${data[5]} </strong> de la empresa ${data[9]}, RFC ${data[10]}, <br/>
                    <br/>
                        Estimado cliente, le notificamos que ha concluido de forma satisfactoria el proceso de soporte solicitado mediante los siguientes datos.
                    <br/>
                    <br/>
                        Fecha de solicitud  <strong>${data[8]}</strong>. 
                    <br/>
                    <br/>
                        Asunto  <strong>${data[6]}</strong>. 
                    <br/>
                    <br/>
                        Folio  <strong>${data[5]}</strong>. 
                    <br/>
                    <br/>
                        Consola  <strong>${data[7]}</strong>. 
                    <br/>
                    <br/>
                        Status  <strong>Soporte Finalizado</strong>. 
                    <br/>
                    <br/>
                        Fecha de Finalización <strong>${data[4]}</strong>. 
                    <br/>
                     No olvide calificar la calidad de nuestro servicio por medio de la encuesta de satisfaccion mediante el siguiente enlace 
                    <br/>
                    <br/><br/>
                    <p> https://plataforma.adscontigo.com/qualitySurvey:&${data[0]} </p><br/><br/>
                      Para cualquier duda o información no dude en comunicarse con el equipo de Alfa Diseño de sistemas para su pronta aclaración.
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
                    if(err){
                        console.log("Este es el error",err)
                        console.log("Este es el error",err.response)

                    }
                    else{
                        console.log("esta es la info" ,  info.response);
                        console.log("esta es la info" ,  info);
                    }
                }); 
            resolve({message:'soporte finalizado'})
        })
      
    })
}
const GetSupportById = ( data)  => {
    return new Promise((resolve,reject)=>{
        client.query(`select * from soporte inner join clientesads on soporte.fk_cliente = clientesads.id_cliente where soporte.id_soporte = '${data[0]}'`,function(err,results,fields){
           var string = JSON.stringify(results);
           var resultados = JSON.parse(string); 
           resolve(resultados)
            ;
        })
    })
}
const InsertSurveyQuality = ( data)  => {
    return new Promise((resolve,reject)=>{
        client.query(`insert into calidadsurvey (respuestas,folio,fk_preguntas,fk_soporte,fk_clientes,fechaEvaluacion) values ('${data[0]}','${data[7]}','${5}','${data[8]}','${data[9]}','${data[10]}')`);
        client.query(`insert into calidadsurvey (respuestas,folio,fk_preguntas,fk_soporte,fk_clientes,fechaEvaluacion) values ('${data[1]}','${data[7]}','${15}','${data[8]}','${data[9]}','${data[10]}')`)
        client.query(`insert into calidadsurvey (respuestas,folio,fk_preguntas,fk_soporte,fk_clientes,fechaEvaluacion) values ('${data[2]}','${data[7]}','${25}','${data[8]}','${data[9]}','${data[10]}')`)
        client.query(`insert into calidadsurvey (respuestas,folio,fk_preguntas,fk_soporte,fk_clientes,fechaEvaluacion) values ('${data[3]}','${data[7]}','${35}','${data[8]}','${data[9]}','${data[10]}')`)
        client.query(`insert into calidadsurvey (respuestas,folio,fk_preguntas,fk_soporte,fk_clientes,fechaEvaluacion) values ('${data[4]}','${data[7]}','${45}','${data[8]}','${data[9]}','${data[10]}')`)
        client.query(`insert into calidadsurvey (respuestas,folio,fk_preguntas,fk_soporte,fk_clientes,fechaEvaluacion) values ('${data[5]}','${data[7]}','${55}','${data[8]}','${data[9]}','${data[10]}')`)
        client.query(`insert into calidadsurvey (respuestas,folio,fk_preguntas,fk_soporte,fk_clientes,fechaEvaluacion) values ('${data[6]}','${data[7]}','${65}','${data[8]}','${data[9]}','${data[10]}')`)
        client.query(`update soporte set statusEncuesta = 'Aplicada' where id_soporte = '${data[8]}'`)
        resolve({message:"encuesta realizada"})
        ;
    })
}
const GetCalidadSurvey = ( data)  => {
    return new Promise((resolve,reject)=>{
        client.query(`select * from calidadSurvey`,function(err,results,fields){
           var string = JSON.stringify(results);
           var resultados = JSON.parse(string); 
           resolve(resultados)
            ;
        })
    })
}
const InsertUrlTemporal = ( data)  => {
    let comentarios;
    if(data[3]){
        comentarios = data[3]
    }else{
        comentarios = "sin comentarios"
    }
    return new Promise((resolve,reject)=>{
        client.query(`insert into urlFirebaseTemporal (nombreArchivo,folio,url,comentarios) values('${data[0]}','${data[1]}','${data[2]}','${comentarios}')`)
        resolve({message:"registro exitoso"})
        ;
    })
}
const GetUrlPdfFile = ( data)  => {
   
    return new Promise((resolve,reject)=>{
        client.query(`select * from urlFirebaseTemporal where folio  = '${data[0]}'`,function(err,results,fields){
            var string = JSON.stringify(results);
            var resultados = JSON.parse(string); 
            resolve(resultados)
            ;
        })

    })
}
const DeleteFileTemporal = ( data)  => {
    return new Promise((resolve,reject)=>{
        client.query(`delete from urlFirebaseTemporal where folio ='${data[7]}'`)
        resolve({message:"exitoso"})
        ;
    })
}
const GetSoporte = ( data)  => {
    return new Promise((resolve,reject)=>{
        client.query(`select * from soporte where fk_cliente = '${data[0]}'`,function(err,results,fields){
            var string = JSON.stringify(results)
            var resultados = JSON.parse(string)
            resolve(resultados)
            ;
        })
    })
}
const UpdateSoporte = ( data)  => {
    return new Promise((resolve,reject)=>{
        client.query(`update soporte set  idTeamviewer =  '${data[1]}', passTeamviewer = '${data[2]}' where id_soporte = '${data[0]}'`)
        resolve({message:"Se actualizaron los datos"})
        ;
    })
}
const inscriptionCourse = ( data)  => {
    return new Promise((resolve,reject)=>{
        var fecha = new Date();
        var options = { weekday: 'long',year: 'numeric', month: 'long', day: 'numeric' };
        fecha.toLocaleDateString("es-ES", options)
        client.query(`select * from contacto where correo1 = '${data[4]}' or correo2 = '${data[4]}'`,function(err,results,fields){
            var string = JSON.stringify(results);
            var resultados = JSON.parse(string)
            if(resultados[0]){
                client.query(`select * from register_courses where fk_courses = '${data[0]}'`,function(errores,re,fiel){
                    var strings = JSON.stringify(re)
                    var resul1 = JSON.parse(strings)
                    if(resul1[0]){
                        resolve({message:"curso ya inscrito"})
                    }else{
                        client.query(`insert into register_courses (nombre,apellidos,telefono,correo,cp,fecha_registro,fk_courses,fk_contacto,fk_clientesads) values ('${data[1]}','${data[2]}','${data[3]}','${data[4]}','${data[5]}','${data[6]}', '${data[0]}', '${resultados[0].id_contacto}','${resultados[0].fk_clientesads}')`,function(error,res){
                            console.log("error1",error)
                            console.log("res",res)
                        })
                        client.query(`update courses set  indice =  '${data[7]}' where id_courses = '${data[8]}'`,function(err,res){; 
                        })
                    }
                })
                
            }else{
                client.query(`insert into register_courses (nombre,apellidos,telefono,correo,cp,fecha_registro,fk_courses,fk_contacto,fk_clientesads) values ('${data[1]}','${data[2]}','${data[3]}','${data[4]}','${data[5]}','${data[6]}', '${data[0]}', '0','0')`,function(err,res,fields){
                    console.log("error2",err)
                    console.log("res",res)
                    console.log("fields",fields)
                })
                client.query(`update courses set  indice =  '${data[7]}' where id_courses = '${data[8]}'`)
            }
        })

        
        fecha.toLocaleDateString("es-ES", options)

        var transporter = nodemailer.createTransport({  
            secure: true,
            host: 'adscontigo.com',
            port: 465,
            auth: {
                    user: 'ventas@adscontigo.com',
                    pass: 'Nu07b_s38',                       
            },
            
            tls: {rejectUnauthorized: false},
            });

            const mailOptions = {
            from: 'ventas@adscontigo.com',  // sender address
            to: `jesus.francisco@ads.com.mx`, // list of receivers
            subject: 'Bienvenido al curso', // Subject line
            text: `Ciudad de México <br/><br/> ${fecha}`,
            html: `<p>
                <strong>
                    Le damos más cordial bienvenida a este curso ${data[9]} ${data[10]} <br/><br/> El cual espero sea para ustedes una experiencia provechosa, gratificante y altamente formativa.
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                Esperando contar con su valiosa presencia quedamos atentos.
                <br/>
                <br/>
                Saludos cordiales, 
                <center><br/><br/><br/>
            ALFA DISEÑO DE SISTEMAS, S.A. DE C.V.<br/>
            www.ads.com.mx<br/></center>
            </strong>
            </p>`,
                           
            };

            transporter.sendMail(mailOptions, function (err, info) {
                if("este es el error" , err)
                console.log(err)
                else
                console.log("esta es la info" ,  info);
        
        });
    })
}
const auth_user = ( data)  => {
    return new Promise((resolve,reject) =>{ 
        client.query(`select * from auth_admin_courses where email='${data[0]}'`,
            function(err,results,field){
                if(err){ reject(err)
                }
        var string = JSON.stringify(results)
        var resultados=JSON.parse(string);
        console.log(resultados)
        if(resultados[0]){
            bcrypt.compare(data[1],resultados[0].contraseña,function(error,result){
                if(resultados){
                ;
                    resolve({
                        id_auth:resultados[0].id_auth,
                        Nombre:resultados[0].Nombre,
                        Apellidos:resultados[0].Apellidos,                   
                        email:resultados[0].email, 
                        Puesto:resultados[0].Puesto, 
                        fk_empresa:resultados[0].fk_empresa, 
                        token_admin:jsonwebtoken(resultados[0].correo+resultados[0].contraseña), //coreo data[0]]
                        message:"usuario encontrado"
                    })
                } else{ 
                    resolve({message:"usuario y contraseña incorrecto", token:"no hay token"})
                }
            })       
        }else{
            resolve({
                message:"usuario no encontrado",             
            })
        }   
    })
})}

const register_user_course = (data) => {
    return new Promise((resolve,reject) =>{
        bcrypt.genSalt(SALT_WORK_FACTOR,function(error,salt){
            if (error){    
                reject(error,{message:'error',token:error})
            }else{
                bcrypt.hash(data[1],salt, function(error,hash){
                    if(error){
                        throw error
                    }else{
                        client.query(`insert into auth_admin_courses(Nombre,Apellidos,Puesto,email,contraseña) values ('${data[2]}','${data[3]}','${data[4]}','${data[0]}','${hash}')`);                  
                        ;
                        resolve({           
                            message:"Registro exitoso",
                        })
                    }
                })
            }

        })
        
    })   
    } 
    const get_courses_register = ( data)  => {
        return new Promise((resolve,reject)=>{
            client.query(`select * from register_courses inner join courses on register_courses.fk_courses = courses.id_courses`,function(err,results,fields){
                var string = JSON.stringify(results);
                var resultados = JSON.parse(string); 
                ;
                console.log("err",err)
                console.log("res",resultados)
               resolve(resultados)
            })
        })
    }
    const getCourses = ( data)  => {
        return new Promise((resolve,reject)=>{
            client.query(`select * from courses where curso_finalizado = 'false'`,function(err,results,fields){
            var string = JSON.stringify(results);
            var resultados = JSON.parse(string); 
                resolve(resultados)
                ;
            })
        })
    }
    const update_indice = ( data)  => {
        return new Promise((resolve,reject)=>{
            client.query(`update courses set user_min = '${data[0]}' where id_courses = '${data[1]}'`)
            ;
            resolve({message:"indice actualizado"})
        })
    }
    const update_modo = ( data)  => {
        return new Promise((resolve,reject)=>{
            client.query(`update courses set habilitar = '${data[0]}' where id_courses = '${data[1]}'`)
            ;
            resolve({message:"modo actualizado"})
        })
    }
    const activar_curso = ( data)  => {
        return new Promise((resolve,reject)=>{
            client.query(`update courses set estatus = 'activo' where id_courses = '${data[0]}'`)
            ;
            resolve({message:"curso activado"})
        })
    }
    const registrar_curso = ( concepto,descripcion,url,
        encabezado1,encabezado2,encabezado3,
        instructor,tipo,modo,
        indice,ig,fb,
        tw,li, yt,
        fecha,rs,hora1,hora2,precio)  => {
            console.log("entro")

            console.log(concepto,descripcion,url,
                encabezado1,encabezado2,encabezado3,
                instructor,tipo,modo,
                indice,ig,fb,
                tw,li, yt,
                fecha,rs,hora1,hora2,precio)

        return new Promise((resolve,reject)=>{
            client.query(`insert into courses (concepto,precio,descripcion,estatus,imagen,add1,add2,add3,instructor,tipo,indice,habilitar,user_min,insta_link,fb_link,twiter_link,linked_link,youtube_link,fecha_curso,hora_inicial,hora_final,curso_finalizado,servidor,url_video) values ('${concepto}','${precio}','${descripcion}','inactivo','${url}','${encabezado1}','${encabezado2}','${encabezado3}'
            ,'${instructor}','${tipo}','${indice}','${modo}','${indice}','${ig}','${fb}','${tw}','${li}','${yt}','${fecha}','${hora1}','${hora2}',"false","No proporcionado","No proporcionado")`,function(err,res){
                console.log("res",res)
                console.log("err",err)
               
            })
            ;
            resolve({message:"curso registrado"})
        })
    }
    const add_expositor = ( data)  => {
        return new Promise((resolve,reject)=>{
            client.query(`insert into expositores (nombre,apellidos,correo,telefono) values('${data[0]}','${data[1]}','${data[2]}','${data[3]}')`,function(err,res){
                
            })
            ;
            resolve({message:"registro exitoso"})
        })
    }
    const getExpositor = ( data)  => {
        return new Promise((resolve,reject)=>{
            client.query(`select * from expositores`,function(err,results,fields){
                ;
                var string = JSON.stringify(results);
                var resultados = JSON.parse(string); 
                resolve(resultados)
            })
        })
    }
    const editar_expositor = ( data)  => {
        return new Promise((resolve,reject)=>{
            client.query(`update courses set instructor = '${data[0]}' where id_courses = '${data[1]}'`)

            client.query(`select * from register_courses inner join courses on register_courses.fk_courses = courses.id_courses  where register_courses.fk_courses = '${data[1]}'`,function(err,results,fields){
                var string = JSON.stringify(results);
                var resultados = JSON.parse(string); 
                ;
                resolve(resultados)
             })
        })
    }
    const sendMailChangeExpositor = (data)  => {
        return new Promise((resolve,reject)=>{
            var fecha = new Date();
            var options = { weekday: 'long',year: 'numeric', month: 'long', day: 'numeric' };
           
            fecha.toLocaleDateString("es-ES", options)

            var transporter = nodemailer.createTransport({  
                secure: true,
                host: 'adscontigo.com',
                port: 465,
                auth: {
                        user: 'ventas@adscontigo.com',
                        pass: 'Nu07b_s38',                       
                },
                
                tls: {rejectUnauthorized: false},
                });

                const mailOptions = {
                from: 'ventas@adscontigo.com',  // sender address
                to: `jesus.francisco@ads.com.mx`, // list of receivers
                subject: 'Notificación de cambio de expositor', // Subject line
                text: `Ciudad de México <br/><br/> ${fecha}`,
                html: `<p>
                    <strong>
                        Estimados usuarios por medio de este breve mensaje les comunicamos que ha habido un cambio de expositor al curso ${data[1]}, de igual manera agradeciendo su total comprensión.
                    <br/>
                    <br/>
                    <br/>
                    Cualquier opinión, duda o sugerencia le agradecemos comunicarse a nuestros teléfonos 0000000000 0000000000 y expresamos nuestra alegría de tenerlo presente.
                    
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    Esperando su participación quedamos atentos.
                    <br/>
                    <br/>
                    Saludos cordiales, 
                    <center><br/><br/><br/>
                ALFA DISEÑO DE SISTEMAS, S.A. DE C.V.<br/>
                www.ads.com.mx<br/></center>
                </strong>
                </p>`,
                };
                console.log("transporter",transporter);

                transporter.sendMail(mailOptions, function (err, info) {
                    if("este es el error" , err)
                    console.log(err)
                    else
                    console.log("esta es la info" ,  info);
            
            });
            // enviar email
        })
    }
    const addVideoPromocional = ( data)  => {
        return new Promise((resolve,reject)=>{
            client.query(`select * from video_promocional where activo = "true"`,function(err,results,fields){
                let string = JSON.stringify(results);
                let resultados = JSON.parse(string);
                ;
                if(resultados[0]){
                    resolve({
                        id_video_promocional:resultados[0].id_video_promocional,
                        url:resultados[0].url,
                        descripcion:resultados[0].descripcion,
                        activo:resultados[0].activo,
                        message:"curso activo"
                    })
                }else{
                    client.query(`insert into video_promocional (url, descripcion, activo) values('${data[0]}','${data[1]}', 'true')`);
                    ;
                    resolve({message:"registro exitoso"})
                }
            })
            
        })
    }
    const desactivarVideoPromocional = ( data)  => {
        return new Promise((resolve,reject)=>{
            client.query(`update video_promocional set activo = 'false' where id_video_promocional = '${data[0]}'`);
            resolve({message:"video desactivado"})
            ;
        })
    }
    const getPromocional = ( data)  => {
        return new Promise((resolve,reject)=>{
            client.query(`select * from video_promocional where activo = "true"`,function(err,results,fields){
                var string = JSON.stringify(results);
               var resultados = JSON.parse(string); 
               resolve(resultados)
            })
        })
    }

    const register_plataform_curse = ( data)  => {
        return new Promise((resolve,reject)=>{
            bcrypt.genSalt(SALT_WORK_FACTOR,function(error,salt){
                if (error){    
                    reject(error,{message:'error',token:error})
                }else{
                    bcrypt.hash(data[1],salt, function(error,hash){
                        if(error){
                            throw error
                        }else{
                            client.query(`insert into users_plataform(nombre,apellidos,telefono,correo,contraseña,perfil_completado) values('${data[2]}', '${data[3]}', '${data[4]}', '${data[0]}', '${hash}','false')`,function(err,res){
                                console.log("error",err)
                                console.log("fields",res)
                            });       
                            ;           
                            resolve({           
                                message:"signup exitoso",
                            })
                        }
                    })
                }

        })})
    }

    const auth_user_plataform = ( data)  => {
        return new Promise((resolve,reject) =>{ 
            client.query(`select * from contacto where correo1 = '${data[0]}'`,function(error,res,fields){
            var strings = JSON.stringify(res)
            var resultado = JSON.parse(strings);
            client.query(`select * from users_plataform where correo='${data[0]}'`,
            function(err,results,field){
            if(err){ reject(err)
            }
            var string = JSON.stringify(results)
            var resultados=JSON.parse(string);
            if(resultados[0]){
                bcrypt.compare(data[1],resultados[0].contraseña,function(error,result){
                    if(resultado[0]){
                        client.query(`select * from clientesads where id_cliente = '${resultado[0].fk_clientesads}'`,function(errors,ress,fieldd){
                        ;
                            var st= JSON.stringify(ress)
                            var re = JSON.parse(st);
                            resolve({
                                id_users_plataform:resultados[0].id_users_plataform,
                                nombre:resultados[0].nombre,
                                apellidos:resultados[0].apellidos,                   
                                telefono:resultados[0].telefono, 
                                correo:resultados[0].correo, 
                                telefono_empresa:resultados[0].telefono_empresa, 
                                cp:resultados[0].cp,
                                profesion:resultados[0].profesion,
                                perfil_completado:resultados[0].perfil_completado,
                                message:"usuario encontrado",
                                id_cliente:re[0].id_cliente,
                                rfc:re[0].rfc,
                                razonSocial:re[0].razonSocial,
                                rango_edad:resultados[0].rango_edad,
                                token:jsonwebtoken(resultados[0].correo + resultados[0].contraseña), //coreo data[0]]

                            })
                        })
                    }else{
                        resolve({
                            id_users_plataform:resultados[0].id_users_plataform,
                            nombre:resultados[0].nombre,
                            apellidos:resultados[0].apellidos,                   
                            telefono:resultados[0].telefono, 
                            correo:resultados[0].correo, 
                            perfil_completado:resultados[0].perfil_completado,
                            message:"usuario encontrado",
                            id_cliente:"",
                            rfc:"",
                            razonSocial:"",
                            token:jsonwebtoken(resultados[0].correo + resultados[0].contraseña), //coreo data[0]]
                        })
                    }
                        
                })       
            }else{
                resolve({
                    message:"usuario no encontrado",             
                })
            }   
        })
            })
            
    })}
    
    const get_users_plataform = ( data)  => {
        return new Promise((resolve,reject)=>{
            client.query(`select * from users_plataform`,function(err,results,fields){
            var string = JSON.stringify(results);
            var resultados = JSON.parse(string); 
            ;
               resolve(resultados)
            })
        })
    }
    const finalizar_curso = ( data)  => {
        return new Promise((resolve,reject)=>{
            client.query(`update courses set curso_finalizado = 'true' where id_courses = '${data[0]}'`);
            resolve({message:"curso finalizado"})
            ;
        })
    }
    const cursos_Anteriores = ( data)  => {
        return new Promise((resolve,reject)=>{
            client.query(`select * from courses where curso_finalizado = 'true'`,function(err,results,fields){
                var string = JSON.stringify(results);
                var resultados = JSON.parse(string); 
                ;
                resolve(resultados)
            })
            
        })
    }
    const getAllContactos = ( data)  => {
        return new Promise((resolve,reject)=>{
            client.query(`select * from contacto`,function(err,results,fields){
                ;
                var string = JSON.stringify(results);
                var resultados = JSON.parse(string); 
                resolve(resultados)
            })
            
        })
    }
    const getRegisterCourses = ( data)  => {
        return new Promise((resolve,reject)=>{
            client.query(`select * from register_courses where correo = '${data[0]}'`,function(err,results,fields){
            ;
                var string = JSON.stringify(results);
                var resultados = JSON.parse(string); 
                resolve(resultados)
            })
            
        })
    }
    const getRegisterCoursesById = ( data)  => {
        return new Promise((resolve,reject)=>{
            client.query(`select * from courses where id_courses = '${data[0]}'`,function(err,results,fields){
            ;
                var string = JSON.stringify(results);
                var resultados = JSON.parse(string); 
                resolve(resultados)
            })
            
        })
    }
    const update_profile = ( data)  => {
        return new Promise((resolve,reject)=>{
            client.query(`select * from users_plataform where correo = '${data[3]}'`,function(err,results,fields){
                ;
                var string = JSON.stringify(results);
                var resultados = JSON.parse(string); 
                if(resultados[0]){
                    client.query(`update users_plataform set nombre = '${data[0]}', apellidos = '${data[1]}', telefono = '${data[2]}', correo = '${data[3]}', rango_edad = '${data[4]}', cp = '${data[5]}', telefono_empresa = '${data[6]}', genero = '${data[7]}', profesion = '${data[8]}', perfil_completado = 'true' where correo = '${data[3]}' `)
                    resolve({message:"perfil completado"})
                }else{
                    resolve({message:"correo no encotrado"})
                }
            })
            
        })
    }
    const solicitar_cotizacion = (data)  => {
        return new Promise((resolve,reject)=>{            
            client.query(`select * from cotizaciones_cursos where fk_curso = '${data[10]}' `,function(err,res,fields){
                let string = JSON.stringify(res);
                let resultados = JSON.parse(string); 
                if(resultados[0]){
                    resolve({message:"cotizacion encontrada"})
                }else{
                    client.query(`insert into cotizaciones_cursos (fecha_emision,fecha_expiracion,folio,piezas,precio_unitario,iva,total_global,tipo_cotizacion,estado,estatus_pago,fk_usuario_plataforma,fk_curso) values ('${data[0]}','${data[1]}','${data[2]}','${data[3]}','${data[4]}','${data[5]}','${data[6]}','${data[7]}','${data[8]}','No pagado','${data[9]}','${data[10]}')`,function(err,response){
                        resolve({message:"registro exitoso"})
                    })
                    client.query(`select * from users_plataform where id_users_plataform = '${data[9]}'`,function(err,resu,fields){
                        let str= JSON.stringify(resu);
                        let resulta = JSON.parse(str); 
                        var transporter = nodemailer.createTransport({  
                            secure: true,
                            host: 'adscontigo.com',
                            port: 465,
                            auth: {
                                    user: 'ventas@adscontigo.com',
                                    pass: 'Nu07b_s38',                       
                            },
                            
                            tls: {rejectUnauthorized: false},
                            });
                            const mailOptions = {
                            from: 'ventas@adscontigo.com',  // sender address
                            to: `jesus.francisco@ads.com.mx,${data[4]}`, // list of receivers
                            // subject: 'Cotizacion de producto o servicio' + " " + fecha, // Subject line
                            subject: 'Cotización pendiente de confirmar', // Subject line
                            text: `Estimado ${resulta[0].nombre + " " + resulta[0].apellidos}`,
                            html: `<p>
                                Basado en su solicitud de cotización, le notificamos que su peticion ya fue enviada a nuestro equipo administrativo.
                                <br/>
                                <br/>
                                <br/>
                                Solicitante: ${resulta[0].nombre + " " + resulta[0].apellidos}<br/>
                                Cotización con el Folio: ${data[2]}<br/>
                                Fecha de emisión: ${data[0]}<br/>
                                Curso: ${data[11]}
                                <br/>
                                <br/>
                                <br/><br/>
                                <strong>En cuanto la validación sea aprobada usted podrá visualizar el documento dentro de su plataforma</strong>
                                <br/>
                                <br/>
                                Cualquier duda o sugerencia no olvide comunicarse a nuestros teléfonos<br/>
                                Saludos cordiales, 
                                <center><br/><br/>${data[2]}<br/>
                            El equipo de tecnologías de Plataforma de cursos <br/>
                            Copyright © 2024 Instituto Mexicano de Auditores Internos, A.C.<br/>
                            Todos los derechos reservados.<br/>
                            Montecito No. 38 Piso 28 Oficina 22 Col. Nápoles, Del. Benito Juárez, CP. 03810 Tels: 55 5514-7908 / 55 5525-4110
                            <br/></center>
                            </p>`,
                            
                            };
            
                            transporter.sendMail(mailOptions, function (err, info) {
                                if("este es el error" , err)
                                console.log(err)
                                else
                                console.log("esta es la info" ,  info);
                        
                        });
                        console.log("resUser",resultados)
                    })
                    

                }
            })
            
            
        })
    }
    const get_cotizaciones = (data)  => {
        return new Promise((resolve,reject)=>{
            client.query(`select * from cotizaciones_cursos inner join courses inner join users_plataform on cotizaciones_cursos.fk_curso = courses.id_courses and cotizaciones_cursos.fk_usuario_plataforma = users_plataform.id_users_plataform where cotizaciones_cursos.fk_usuario_plataforma = '${data[0]}'`,function(err,result,fields){
                let string = JSON.stringify(result);
                let resultados = JSON.parse(string);
                resolve(resultados)
            })
            
        })
    }
    const get_cotizaciones_clientes = (data)  => {
        return new Promise((resolve,reject)=>{
            client.query(`select * from cotizaciones_cursos inner join courses inner join users_plataform on cotizaciones_cursos.fk_curso = courses.id_courses and cotizaciones_cursos.fk_usuario_plataforma = users_plataform.id_users_plataform  `,function(err,result,fields){
                let string = JSON.stringify(result);
                let resultados = JSON.parse(string);
                resolve(resultados)
            })
            
        })
    }
    const ok_cotizacion = ( data)  => {
        console.log("data",data)
        return new Promise((resolve,reject)=>{
            client.query(`update cotizaciones_cursos set estado = 'Aprobada' where folio = '${data[0]}'`);
            resolve({message:"cotizacion aprobada"})
            ;
        })
    }

    const registroSemblanza = ( folio,titulo,objetivo,
        perfil,temario1,temario2,
        temario3,temario4,temario5,
        temario6,id_course)  => { 
            console.log(folio,titulo,objetivo,
                perfil,temario1,temario2,
                temario3,temario4,temario5,
                temario6,id_course)

        return new Promise((resolve,reject)=>{
            client.query(`insert into semblanza (folio,titulo,objetivo,perfil,temario1,temario2,temario3,temario4,temario5,temario6,fk_courses) values ('${folio}','${titulo}','${objetivo}','${perfil}','${temario1}','${temario2}','${temario3}'
            ,'${temario4}','${temario5}','${temario6}','${id_course}')`,function(err,res){
                console.log("res",res)
                console.log("err",err)
               
            })
            ;
            resolve({message:"semblanza registrada"})
        })
    }
    const getSemblanza = (data)  => {
        return new Promise((resolve,reject)=>{
            client.query(`select * from semblanza`,function(err,result,fields){
                let string = JSON.stringify(result);
                let resultados = JSON.parse(string);
                resolve(resultados)
            })
            
        })
    }

    const cursoPagado = (data)  => {
        return new Promise((resolve,reject)=>{
            client.query(`update cotizaciones_cursos set estatus_pago = 'Pagado' where folio = '${data[0]}' `,function(err,res,fields){
                // var transporter = nodemailer.createTransport({  
                //     secure: true,
                //     host: 'adscontigo.com',
                //     port: 465,
                //     auth: {
                //             user: 'ventas@adscontigo.com',
                //             pass: 'Nu07b_s38',                       
                //     },
                    
                //     tls: {rejectUnauthorized: false},
                //     });
                //     const mailOptions = {
                //     from: 'ventas@adscontigo.com',  // sender address
                //     to: `jesus.francisco@ads.com.mx,${data[4]}`, // list of receivers
                //     // subject: 'Cotizacion de producto o servicio' + " " + fecha, // Subject line
                //     subject: 'Cotización pendiente de confirmar', // Subject line
                //     text: `Estimado ${resulta[0].nombre + " " + resulta[0].apellidos}`,
                //     html: `<p>
                //         Basado en su solicitud de cotización, le notificamos que su solicitud ya fue enviada a nuestro equipo administrativo.
                //         <br/>
                //         <br/>
                //         <br/>
                //         Solicitante: ${resulta[0].nombre + " " + resulta[0].apellidos}<br/>
                //         Cotización con el Folio: ${data[2]}<br/>
                //         Fecha de emisión: ${data[0]}<br/>
                //         Curso: ${data[11]}
                //         <br/>
                //         <br/>
                //         <br/><br/>
                //         <strong>En cuanto la validación sea aprobada usted podrá visualizar el documento dentro de su plataforma</strong>
                //         <br/>
                //         <br/>
                //         Cualquier duda o sugerencia no olvide comunicarse a nuestros teléfonos<br/>
                //         Saludos cordiales, 
                //         <center><br/><br/>${data[2]}<br/>
                //     El equipo de tecnologías de Plataforma de cursos <br/>
                //     Copyright © 2024 Instituto Mexicano de Auditores Internos, A.C.<br/>
                //     Todos los derechos reservados.<br/>
                //     Montecito No. 38 Piso 28 Oficina 22 Col. Nápoles, Del. Benito Juárez, CP. 03810 Tels: 55 5514-7908 / 55 5525-4110
                //     <br/></center>
                //     </p>`,
                    
                //     };
                //     console.log("transporter",transporter);
    
                //     transporter.sendMail(mailOptions, function (err, info) {
                //         if("este es el error" , err)
                //         console.log(err)
                //         else
                //         console.log("esta es la info" ,  info);
                
                // });
                resolve({message:"curso pagado"})
            })
            
        })
    }


    const insertUrlPdfVacant =async (filename) => {
    return new Promise((resolve,reject)=>{
    client.query(`insert into vacantes (titulo_vacante, folio, fecha_publicacion, empresa_contratacion, correo_contacto,url_pdf) values ('${filename[0]}','${filename[5]}','${filename[1]}','${filename[2]}','${filename[3]}','${filename[4]}')`,function(err,res){
        resolve({message:"registro exitoso"})
    })
    })
    };

    const get_vacantes =async () => {
    return new Promise((resolve,reject)=>{
    client.query(`select * from vacantes`,function(err,results,fields){
        var string = JSON.stringify(results)
        var resultados = JSON.parse(string)

        resolve(resultados)
    })
    })
    };
     const delete_vacante =async (insertUrlPdfVacant) => {
        return new Promise((resolve,reject)=>{
        client.query(`delete from vacantes where folio = '${data[0]}'`,function(err,res){
            resolve({message:"registro exitoso"})
        })
        })
        };
    const sendCV =async (data) => {
        return new Promise((resolve,reject)=>{
            let fecha = new Date()
            client.query(`insert into cv_users_plataform (fecha_carga,estatus_aprobacion,url_cv,fk_users_plataform) values ('${fecha}', 'Pendiente', '${data[0]}', '${data[1]}')`,function(err,res){
                resolve({message:"registro exitoso"})
            })
        })
    };
    const get_cv =async (data) => {
        return new Promise((resolve,reject)=>{
        client.query(`select * from cv_users_plataform where fk_users_plataform = '${data[0]}'`,function(err,results,fields){
            var string = JSON.stringify(results)
            var resultados = JSON.parse(string)
            resolve(resultados)
        })
        })
        };

        const solicitar_vacante =async (data) => {
            let fecha = new Date();
            return new Promise((resolve,reject)=>{
                let fecha = new Date()
                client.query(`select * from vacantes where id_vacantes = '${data[0]}'`,function(error,resultado,field){
                    var string2 = JSON.stringify(resultado)
                    var result = JSON.parse(string2)
                    client.query(`select * from solicitud_vacantes where id_solicitud_vacantes = '${data[0]}' and fk_users_plataform = '${data[1]}'`,function(err,results,fields){
                        var string = JSON.stringify(results)
                        var resultados = JSON.parse(string)
                        if(resultados[0]){
                            resolve({message:"vacante ya solicitada"})
                        }else{
                            client.query(`insert into solicitud_vacantes (fecha_solicitud, fk_vacantes, fk_users_plataform) values ('${fecha}', '${data[0]}', '${data[1]}')`,function(err,res){
                                resolve({message:"registro exitoso"})
                            })
                            var transporter = nodemailer.createTransport({  
                            secure: true,
                            host: 'adscontigo.com',
                            port: 465,
                            auth: {
                                    user: 'ventas@adscontigo.com',
                                    pass: 'Nu07b_s38',                       
                            },
                            
                            tls: {rejectUnauthorized: false},
                            });
                            const mailOptions = {
                            from: 'ventas@adscontigo.com',  // sender address
                            to: `${result[0].correo_contacto}`, // list of receivers
                            // subject: 'Cotizacion de producto o servicio' + " " + fecha, // Subject line
                            subject: 'Proceso de solicitud de vacante', // Subject line
                            text: `Solicitud`,
                            html: `<p>
                                <h2><strong>Estimado usuario ${result[0].empresa_contratacion}, le notificamos la solicitud a la oferta vacante con los siguientes datos</strong></h2>
                                <h3>Datos del aspirante</h3><br/><br/>
                                <table class="table table-small table-bordered table-striped">
                                    <tr>
                                    <td>Nombre</td>
                                    <td>${data[2]}</td>
                                    </tr>
                                    <tr>
                                    <td>Apellidos</td>
                                    <td>${data[3]}</td>
                                    </tr>
                                    <tr>
                                    <td>Correo</td>
                                    <td>${data[4]}</td>
                                    </tr>
                                    <tr>
                                    <td>Teléfono</td>
                                    <td>${data[5]}</td>
                                    </tr>
                                    <tr>
                                    <td>Curriculum</td>
                                    <td>${data[6]}</td>
                                    </tr>
                                </table>

                                <br/><br/>

                               

                                 Vacante solicitada:  ${result[0].titulo_vacante}<br/><br/>
                                 Folio:  ${result[0].folio}<br/><br/>
                                <br/>
                                El aspirante ${data[2]} ${data[3]} queda a la espera de su respuesta<br/>

                                <br/><br/>
                                <strong> En cuanto se valide la solicitud se le notificará al interesado los resultados</strong>
                                <br/>
                                <br/>
                                Cualquier duda o sugerencia no olvide comunicarse con el IMAI (Instituto Mexicano de Auditores Internos)<br/>
                                Saludos cordiales, 
                                <center><br/><br/><br/>
                            El equipo de tecnologías de Plataforma de cursos <br/>
                            Copyright © 2024 Instituto Mexicano de Auditores Internos, A.C.<br/>
                            Todos los derechos reservados.<br/>
                            Montecito No. 38 Piso 28 Oficina 22 Col. Nápoles, Del. Benito Juárez, CP. 03810 Tels: 55 5514-7908 / 55 5525-4110
                            <br/></center>
                            </p>`,
                            
                            };
                            console.log("transporter",transporter);
            
                            transporter.sendMail(mailOptions, function (err, info) {
                                if("este es el error" , err)
                                console.log(err)
                                else
                                console.log("esta es la info" ,  info);
                        
                        });



                        }
                    })
                    
                })
                
                
            })
        };
        const get_all_cv =async (data) => {
            return new Promise((resolve,reject)=>{
            client.query(`select * from cv_users_plataform`,function(err,results,fields){
                var string = JSON.stringify(results)
                var resultados = JSON.parse(string)
                resolve(resultados)
            })
            })
        };
        const aprobar_cv =async (data) => {
            return new Promise((resolve,reject)=>{
                client.query(`update cv_users_plataform set estatus_aprobacion="Aprobada" where id_cv = '${data[0]}'`,function(err,res){
                    resolve({message:"registro exitoso"})
                })
            })
        };
        const rechazar_cv =async (data) => {
            return new Promise((resolve,reject)=>{
                client.query(`update cv_users_plataform set estatus_aprobacion="Rechazada" where id_cv = '${data[0]}'`,function(err,res){
                    resolve({message:"registro exitoso"})
                })
            })
        };

        const get_solicitud_vacantes =async (data) => {
            return new Promise((resolve,reject)=>{
                console.log(`select * from solicitud vacantes inner join vacantes on solicitud_vacantes.fk_vacantes = vacantes.id_vacantes inner join users_plataform on solicitud_vacantes.fk_users_plataform = users_plataform.id_users_plataform`)
                client.query(`select * from solicitud_vacantes inner join vacantes on solicitud_vacantes.fk_vacantes = vacantes.id_vacantes inner join users_plataform on solicitud_vacantes.fk_users_plataform = users_plataform.id_users_plataform`,function(err,res,fields){
                    var string = JSON.stringify(res)
                    var resultados = JSON.parse(string)
                    resolve(resultados)
                })
            })
        };
module.exports={
    get_solicitud_vacantes,
    rechazar_cv,
    aprobar_cv,
    get_all_cv,
    solicitar_vacante,
    get_cv,
    sendCV,
    delete_vacante,
    get_vacantes,
    insertUrlPdfVacant,
    cursoPagado,
    getSemblanza,
    registroSemblanza,
    ok_cotizacion,
    get_cotizaciones_clientes,
    get_cotizaciones,
    solicitar_cotizacion,
    update_profile,
    getRegisterCoursesById,
    getRegisterCourses,
    getAllContactos,
    cursos_Anteriores,
    finalizar_curso,
    get_users_plataform,
    auth_user_plataform,
    register_plataform_curse,
    getPromocional,
    desactivarVideoPromocional,
    addVideoPromocional,
    sendMailChangeExpositor,
    editar_expositor,
    getExpositor,
    add_expositor,
    registrar_curso,
    activar_curso,
    update_modo,
    update_indice,
    getCourses,
    get_courses_register,
    register_user_course,
    auth_user,
    inscriptionCourse,
    UpdateSoporte,
    GetSoporte,
    DeleteFileTemporal,
    GetUrlPdfFile,
    InsertUrlTemporal,
    GetContactoId,
    GetCalidadSurvey,
    InsertSurveyQuality,
    GetSupportById,
    EndSupport,
    GetPolizasById,
    SendSupport,
    GetSupport,
    GetSolicitudesByFkEmpresa,
    CancelSolicitud,
    GetSolicitudes,
    SendMailSolicitudCotizacion,
    RegisterSolictudCotizacion,
    DeleteCupones,
    UpdateCupones,
    GetCupones,
    RegisterCupones,
    getAllTablaProductoServicio,
    polizaVencida,
    updateCliente,
    getCotizacionesFolio,
    GetProductoServicioActualizado,
    getMaxProductoServicio,
    updateInsertProductoServicio,
    getVentasTablaIndicadores,
    getProductoServicioByFolioVentas,
    getCotizacionesTabla,
    getTotalesByFolioVenta,
    getIdVenta,
    getVentasTabla,
    GetTableInicioSesion,
    polizaVencida,
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
    // updateCliente,
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