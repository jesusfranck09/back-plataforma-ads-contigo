const actions = require('../actions/userActions')

    const signupAlfa=(_,data) =>{
        var cadena= data.data[0]
        var variable = cadena.split(",")
    return actions.signupAlfa(variable)
        }

    const signupEmpresas=(_,data) =>{
        var cadena= data.data[0]
        var variable = cadena.split(",")
    return actions.signupEmpresas(variable)
        }

    const insertCotizaciones = (_,data) =>{
        var cadena = data.data[0]
        var variable = cadena.split(",")
    return actions.insertCotizaciones(variable)
        }
  

    const insertClientes = (_,data) =>{
        var cadena= data.data[0]
        var variable = cadena.split(",")
    return actions.insertClientes(variable)
        }

    const deleteCliente  =  (_ , data) =>{
        var cadena= data.data[0]
        var variable = cadena.split(",")
        return actions.deleteCliente(variable)
    
    }
    // const updateCliente =  (_ , data) =>{
    //     var cadena= data.data[0]
    //     var variable = cadena.split(",")
    //     return actions.updateCliente  (variable)    
    // }
 
    const insertContacto = (_,data) =>{
        var cadena= data.data[0]
        var variable = cadena.split(",")      
    return actions.insertContacto(variable)
        }

    const insertProductoServicio = (_,data) =>{
        var cadena= data.data[0]
        var variable = cadena.split(",") 
        return actions.insertProductoServicio(variable)
        }

    const insertClientesAlfa = (_,data) =>{
        var cadena= data.data[0]
        var variable = cadena.split(",")
    return actions.insertClientesAlfa(variable)
        }

    const sendEmailCotizacion =  (_ ,data) =>{
        var cadena= data.data[0]
        var variable = cadena.split(",")   
        return actions.SendEmailCotizacion(variable)
    }

    const insertTotales =  (_ ,data) =>{
        var cadena= data.data[0]
        var variable = cadena.split(",")   
        return actions.insertTotales(variable)
    }

    const updateStatusCotizacion =  (_ ,data) =>{
        var cadena= data.data[0]
        var variable = cadena.split(",")   
        return actions.UpdateStatusCotizacion(variable)
    }

    const updateContacto =  (_ ,data) =>{
        var cadena= data.data[0]
        var variable = cadena.split(",")
        return actions.updateContacto(variable)
    }

    const deliteContacto  =  (_ , data) =>{
        var cadena= data.data[0]
        var variable = cadena.split(",")       
        return actions.deliteContacto(variable)    
    }

    const cotizacionVencida  =  (_ , data) =>{
        var cadena= data.data[0]
        var variable = cadena.split(",")
        return actions.CotizacionVencida(variable)    
    }
    const accesoSistema  =  (_ , data) =>{
        var cadena= data.data[0]
        var variable = cadena.split(",")
        return actions.AccesoSistema(variable)    
    }
    const transactionClientes  =  (_ , data) =>{
        var cadena= data.data[0]
        var variable = cadena.split(",")
        return actions.TransactionClientes(variable)    
    }
    const updatePasswordCliente  =  (_ , data) =>{
        var cadena= data.data[0]
        var variable = cadena.split(",")
        return actions.UpdatePasswordCliente(variable)    
    }
    const quitarAccesoSistema  =  (_ , data) =>{
        var cadena= data.data[0]
        var variable = cadena.split(",")
        return actions.QuitarAccesoSistema(variable)    
    }
    const registerSupport  =  (_ , data) =>{
        var cadena= data.data[0]
        var variable = cadena.split(",")
        return actions.RegisterSupport(variable)    
    }
    const insertURLVideos  =  (_ , data) =>{
        var cadena= data.data[0]
        var variable = cadena.split(",")      
        return actions.insertURLVideos(variable)    
    }
    // const insertVenta  =  (_ , data) =>{
    //     var cadena= data.data[0]
    //     var variable = cadena.split(",")
    //     // console.log("estos es variable", variable)
    //     return actions.insertVenta(variable)    
    // }

    const ventas  =  (_ , data) =>{
        var cadena= data.data[0]
        var variable = cadena.split(",")
        // console.log("estos es variable", variable)
        return actions.ventas(variable)    
    }

    const insertTotalesVenta =(_ , data)=>{
        var cadena= data.data[0]
        var variable = cadena.split(",")
        // console.log("esto es variable",variable)
        return actions.insertTotalesVenta(variable)
    }
    const registerPoliza =(_ , data)=>{
        var cadena= data.data[0]
        var variable = cadena.split(",")
        // console.log("esto es variable",variable)
        return actions.RegisterPoliza(variable)
    }
    const activarPoliza =(_ , data)=>{
        var cadena= data.data[0]
        var variable = cadena.split(",")
        // console.log("esto es variable",variable)
        return actions.ActivarPoliza(variable)
    }
    const editarPoliza =(_ , data)=>{
        var cadena= data.data[0]
        var variable = cadena.split(",")
        // console.log("esto es variable",variable)
        return actions.EditarPoliza(variable)
    }   
    const updateInsertProductoServicio  =  (_ , data) =>{
        var cadena= data.data[0]
        var variable = cadena.split(",")
        return actions.updateInsertProductoServicio(variable)    
    }
    const updateCliente =  (_ ,data) =>{
        var cadena= data.data[0]
        var variable = cadena.split(",")
        return actions.updateCliente(variable)
    }
    const polizaVencida  = (_,data) =>{
        var cadena = data.data[0]
        var variable = cadena.split(",")
        return actions.polizaVencida(variable)
    }
    const registerCupones =  (_ ,data) =>{
        var cadena= data.data[0]
        var variable = cadena.split(",")
        return actions.RegisterCupones(variable)
    }
    const updateCupones =  (_ ,data) =>{
        var cadena= data.data[0]
        var variable = cadena.split(",")
        return actions.UpdateCupones(variable)
    }
    const deleteCupones =  (_ ,data) =>{
        var cadena= data.data[0]
        var variable = cadena.split(",")
        return actions.DeleteCupones(variable)
    }
    const registerSolictudCotizacion =  (_ ,data) =>{
        var cadena= data.data[0]
        var variable = cadena.split(",")
        return actions.RegisterSolictudCotizacion(variable)
    }
    const sendMailSolicitudCotizacion =  (_ ,data) =>{
        var cadena= data.data[0]
        var variable = cadena.split(",")
        return actions.SendMailSolicitudCotizacion(variable)
    }
    const cancelSolicitud =  (_ ,data) =>{
        var cadena= data.data[0]
        var variable = cadena.split(",")
        return actions.CancelSolicitud(variable)
    }
    const sendSupport =  (_ ,data) =>{
        var cadena= data.data[0]
        var variable = cadena.split(",")
        return actions.SendSupport(variable)
    }
    const endSupport =  (_ ,data) =>{
        var cadena= data.data[0]
        var variable = cadena.split(",")
        return actions.EndSupport(variable)
    }
    const insertSurveyQuality =  (_ ,data) =>{
        var cadena= data.data[0]
        var variable = cadena.split(",")
        return actions.InsertSurveyQuality(variable)
    }
    const insertUrlTemporal =  (_ ,data) =>{
        var cadena= data.data[0]
        var variable = cadena.split(",")
        return actions.InsertUrlTemporal(variable)
    }
    const deleteFileTemporal =  (_ ,data) =>{
        var cadena= data.data[0]
        var variable = cadena.split(",")
        return actions.DeleteFileTemporal(variable)
    }
    const updateSoporte =  (_ ,data) =>{
        var cadena= data.data[0]
        var variable = cadena.split(",")
        return actions.UpdateSoporte(variable)
    }
    const inscriptionCourse =  (_ ,data) =>{
        var cadena= data.data[0]
        var variable = cadena.split(",")
        return actions.inscriptionCourse(variable)
    }
    const auth_user =  (_ ,data) =>{
        var cadena= data.data[0]
        var variable = cadena.split(",")
        return actions.auth_user(variable)
    }
    const register_user_course =  (_ ,data) =>{
        var cadena= data.data[0]
        var variable = cadena.split(",")
        return actions.register_user_course(variable)
    }
    const update_indice =  (_ ,data) =>{
        var cadena= data.data[0]
        var variable = cadena.split(",")
        return actions.update_indice(variable)
    }
    const update_modo =  (_ ,data) =>{
        var cadena= data.data[0]
        var variable = cadena.split(",")
        return actions.update_modo(variable)
    }
    const activar_curso =  (_ ,data) =>{
        var cadena= data.data[0]
        var variable = cadena.split(",")
        return actions.activar_curso(variable)
    }
    const registrar_curso = async (_ , {concepto,descripcion,url,
        encabezado1,encabezado2,encabezado3,
        instructor,tipo,modo,
        indice,ig,fb,
        tw,li, yt,
        fecha,rs,hora1,hora2,precio}) =>{
            console.log("entro")

        return actions.registrar_curso(concepto,descripcion,url,
            encabezado1,encabezado2,encabezado3,
            instructor,tipo,modo,
            indice,ig,fb,
            tw,li, yt,
            fecha,rs,hora1,hora2,precio)
    }
    const add_expositor =  (_ ,data) =>{
        var cadena= data.data[0]
        var variable = cadena.split(",")
        return actions.add_expositor(variable)
    }
    const editar_expositor =  (_ ,data) =>{
        var cadena= data.data[0]
        var variable = cadena.split(",")
        return actions.editar_expositor(variable)
    }
    const sendMailChangeExpositor =  (_ ,data) =>{
        var cadena= data.data[0]
        var variable = cadena.split(",")
        return actions.sendMailChangeExpositor(variable)
    }
    const addVideoPromocional =  (_ ,data) =>{
        var cadena= data.data[0]
        var variable = cadena.split(",")
        return actions.addVideoPromocional(variable)
    }
    const desactivarVideoPromocional =  (_ ,data) =>{
        var cadena= data.data[0]
        var variable = cadena.split(",")
        return actions.desactivarVideoPromocional(variable)
    }
    const register_plataform_curse =  (_ ,data) =>{
        var cadena= data.data[0]
        var variable = cadena.split(",")
        return actions.register_plataform_curse(variable)
    }

    const auth_user_plataform =  (_ ,data) =>{
        var cadena= data.data[0]
        var variable = cadena.split(",")
        return actions.auth_user_plataform(variable)
    }
    const finalizar_curso =  (_ ,data) =>{
        var cadena= data.data[0]
        var variable = cadena.split(",")
        return actions.finalizar_curso(variable)
    }
    const update_profile =  (_ ,data) =>{
        var cadena= data.data[0]
        var variable = cadena.split(",")
        return actions.update_profile(variable)
    }
    const solicitar_cotizacion =  (_ ,data) =>{
        var cadena= data.data[0]
        var variable = cadena.split(",")
        return actions.solicitar_cotizacion(variable)
    }
    const ok_cotizacion =  (_ ,data) =>{
        var cadena= data.data[0]
        var variable = cadena.split(",")
        return actions.ok_cotizacion(variable)
    }

    const registroSemblanza = async (_ , {folio,titulo,objetivo,
        perfil,temario1,temario2,
        temario3,temario4,temario5,
        temario6,id_course}) =>{
            console.log("entro")

        return actions.registroSemblanza(folio,titulo,objetivo,
            perfil,temario1,temario2,
            temario3,temario4,temario5,
            temario6,id_course)
    }
    const cursoPagado =  (_ ,data) =>{
        var cadena= data.data[0]
        var variable = cadena.split(",")
        return actions.cursoPagado(variable)
    }

      const insertUrlPdfVacant =  (_ ,data) =>{
        var cadena= data.data[0]
        var variable = cadena.split(",")
        return actions.insertUrlPdfVacant(variable)
    }
    const delete_vacante =  (_ ,data) =>{
        var cadena= data.data[0]
        var variable = cadena.split(",")
        return actions.delete_vacante(variable)
    }
    
    const sendCV =  (_ ,data) =>{
        var cadena= data.data[0]
        var variable = cadena.split(",")
        return actions.sendCV(variable)
    }
    const solicitar_vacante =  (_ ,data) =>{
        var cadena= data.data[0]
        var variable = cadena.split(",")
        return actions.solicitar_vacante(variable)
    }
    const aprobar_cv =  (_ ,data) =>{
        var cadena= data.data[0]
        var variable = cadena.split(",")
        return actions.aprobar_cv(variable)
    }
    const rechazar_cv =  (_ ,data) =>{
        var cadena= data.data[0]
        var variable = cadena.split(",")
        return actions.rechazar_cv(variable)
    }
    const saveURLPDF =  (_ ,data) =>{
        var cadena= data.data[0]
        var variable = cadena.split(",")
        return actions.saveURLPDF(variable)
    }
    const uploadxls =  (_ ,data) =>{
        var cadena= data.data[0]
        var variable = cadena.split(",")
        return actions.uploadxls(variable)
    }
module.exports={
    uploadxls,
    saveURLPDF,
    rechazar_cv,
    aprobar_cv,
    solicitar_vacante,
    sendCV,
    delete_vacante,
    insertUrlPdfVacant,
    cursoPagado,
    registroSemblanza,
    ok_cotizacion,
    solicitar_cotizacion,
    update_profile,
    finalizar_curso,
    auth_user_plataform,
    register_plataform_curse,
    desactivarVideoPromocional,
    addVideoPromocional,
    sendMailChangeExpositor,
    editar_expositor,
    add_expositor,
    registrar_curso,
    activar_curso,
    update_modo,
    update_indice,
    register_user_course,
    auth_user,
    inscriptionCourse,
    updateSoporte,
    deleteFileTemporal,
    insertUrlTemporal,
    insertSurveyQuality,
    endSupport,
    sendSupport,
    cancelSolicitud,
    sendMailSolicitudCotizacion,
    registerSolictudCotizacion,
    deleteCupones,
    updateCupones,
    registerCupones,
    polizaVencida,
    updateCliente,
    updateInsertProductoServicio,
    // polizaVencida,
    editarPoliza,
    activarPoliza,
    registerPoliza,
    insertTotalesVenta,
    ventas,
    // insertVenta,
    registerSupport,
    insertURLVideos,
    quitarAccesoSistema,
    updatePasswordCliente,
    transactionClientes,
    accesoSistema,
    cotizacionVencida,
    deliteContacto,
    updateContacto,
    updateStatusCotizacion,
    insertTotales,
    sendEmailCotizacion,
    insertClientesAlfa,
    insertProductoServicio,
    insertContacto,
    // updateCliente,
    deleteCliente,
    signupAlfa,
    signupEmpresas,
    insertCotizaciones,
    insertClientes
}