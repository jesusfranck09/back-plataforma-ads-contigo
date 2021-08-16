const actions = require('../actions/userActions')

    const signupAlfa=(_,data) =>{
        var cadena= data.data[0]
        var variable = cadena.split(",")
    console.log("la data de signup " , variable)
    return actions.signupAlfa(variable)
        }

    const signupEmpresas=(_,data) =>{
        var cadena= data.data[0]
        var variable = cadena.split(",")    
    console.log("la data de signup " , variable)
    return actions.signupEmpresas(variable)
        }

    const insertCotizaciones = (_,data) =>{
        var cadena = data.data[0]
        var variable = cadena.split(",")
    console.log("la data de signup " , variable)
    return actions.insertCotizaciones(variable)
        }

    const insertClientes = (_,data) =>{
        var cadena= data.data[0]
        var variable = cadena.split(",")
    
        console.log("la data de insertClientes es:" , data)
    return actions.insertClientes(variable)
        }

    const deleteCliente  =  (_ , data) =>{
        var cadena= data.data[0]
        var variable = cadena.split(",")    
        console.log("esto es variable", variable)
        return actions.deleteCliente  (variable)
    
    }
    const updateCliente =  (_ , data) =>{
        var cadena= data.data[0]
        var variable = cadena.split(",")   
        console.log("esto es variable", variable)
        return actions.updateCliente  (variable)
    
    }

    const insertProductoServicio = (_,data) =>{
        var cadena= data.data[0]
        var variable = cadena.split(",")
    
        console.log("la data de insertProductoServicio es:" , data)
    return actions.insertProductoServicio(variable)
        }

        const insertContacto = (_,data) =>{
            var cadena= data.data[0]
            var variable = cadena.split(",")        
            console.log("la data de insertContacto es:" , data)
        return actions.insertContacto(variable)
            }
    
module.exports={
    insertContacto,
    insertProductoServicio,
    updateCliente,
    deleteCliente,
    signupAlfa,
    signupEmpresas,
    insertCotizaciones,
    insertClientes
}