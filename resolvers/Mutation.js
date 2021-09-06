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
        console.log("variable",variable)
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
        console.log("la data de insertProductoServicio es:",data)
        return actions.insertProductoServicio(variable)
        }

    const insertClientesAlfa = (_,data) =>{
        var cadena= data.data[0]
        var variable = cadena.split(",")        
        console.log("la data de insertClientesAlfa es:" , data)
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
        console.log("data a insertar",variable)
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

module.exports={
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