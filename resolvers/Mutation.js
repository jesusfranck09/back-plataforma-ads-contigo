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
        console.log("variable insertada",variable)
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
        return actions.deleteCliente  (variable)    
    }
    const updateCliente =  (_ , data) =>{
        var cadena= data.data[0]
        var variable = cadena.split(",")   
        return actions.updateCliente  (variable)    
    }

    const insertProductoServicio = (_,data) =>{
        var cadena= data.data[0]
        var variable = cadena.split(",")    
    return actions.insertProductoServicio(variable)
        }

        const insertContacto = (_,data) =>{
            var cadena= data.data[0]
            var variable = cadena.split(",")        
        return actions.insertContacto(variable)
            }

    const sendEmailCotizacion =  (_ ,data) =>{
        var cadena= data.data[0]
        var variable = cadena.split(",")   
        return actions.SendEmailCotizacion(variable)
    }
    const insertTotales =  (_ ,data) =>{
        var cadena= data.data[0]
        var variable = cadena.split(",")   
        return actions.InsertTotales(variable)
    }
    const updateStatusCotizacion =  (_ ,data) =>{
        var cadena= data.data[0]
        var variable = cadena.split(",")   
        return actions.UpdateStatusCotizacion(variable)
    }
module.exports={
    updateStatusCotizacion,
    insertTotales,
    sendEmailCotizacion,
    insertContacto,
    insertProductoServicio,
    updateCliente,
    deleteCliente,
    signupAlfa,
    signupEmpresas,
    insertCotizaciones,
    insertClientes
}