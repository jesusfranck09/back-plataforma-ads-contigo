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
        console.log("esto es variable",variable)
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
    const updateCliente =  (_ , data) =>{
        var cadena= data.data[0]
        var variable = cadena.split(",")
        return actions.updateCliente  (variable)    
    }
 
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
    const insertVenta  =  (_ , data) =>{
        var cadena= data.data[0]
        var variable = cadena.split(",")
        console.log("estos es variable", variable)
        return actions.insertVenta(variable)    
    }


module.exports={
    insertVenta,
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
    updateCliente,
    deleteCliente,
    signupAlfa,
    signupEmpresas,
    insertCotizaciones,
    insertClientes
}