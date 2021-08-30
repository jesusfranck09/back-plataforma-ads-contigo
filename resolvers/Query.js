const actions = require('../actions/userActions')


const loginAdminAlfa  =  (_ , data) =>{
    var cadena= data.data[0]
    var variable = cadena.split(",")
return actions.loginAdminAlfa(variable)
}

const loginEmpresas  =  (_ , data) =>{
    var cadena= data.data[0]
    var variable = cadena.split(",")
return actions.loginEmpresas(variable)
}

const getTablaClientes =  (_ , data) =>{    
    var cadena= data.data[0]
    var variable = cadena.split(",")
return actions.getTablaClientes(variable)
}

const getEmpresas =  (_ , data) =>{    
    var cadena= data.data[0]
    var variable = cadena.split(",")
return actions.getEmpresas(variable)
}

const getCotizacionesTabla  =  (_ , data) =>{
    var cadena= data.data[0]
    var variable = cadena.split(",")
return actions.getCotizacionesTabla  (variable)

}

const getIdCotizacion  =  (_ , data) =>{
    var cadena= data.data[0]
    var variable = cadena.split(",")
return actions.getIdCotizacion  (variable)
}

const getClienteRFC   =  (_ , data) =>{
    var cadena= data.data[0]
    var variable = cadena.split(",")
return actions.getClienteRFC   (variable)
}

const getTablaProductoServicio   =  (_ , data) =>{
    var cadena= data.data[0]
    var variable = cadena.split(",")
return actions.getTablaProductoServicio(variable)
}

const getProductoServicio   =  (_ , data) =>{
    var cadena= data.data[0]
    var variable = cadena.split(",")
return actions.getProductoServicio(variable)
}

const getTablaClientesAlfa   =  (_ , data) =>{
    var cadena= data.data[0]
    var variable = cadena.split(",")
return actions.getTablaClientesAlfa(variable)
}
const getClienteId   =  (_ , data) =>{
    var cadena= data.data[0]
    var variable = cadena.split(",")
return actions.GetClienteId(variable)
}

const getProductoServicioByFolio   =  (_ , data) =>{
    var cadena= data.data[0]
    var variable = cadena.split(",")
return actions.GetProductoServicioByFolio(variable)
}
const getTotalesByFolio   =  (_ , data) =>{
    var cadena= data.data[0]
    var variable = cadena.split(",")
return actions.GetTotalesByFolio(variable)
}
module.exports={
    getTotalesByFolio,
    getProductoServicioByFolio,
    getClienteId,
    getTablaClientesAlfa, 
    getProductoServicio, 
    getTablaProductoServicio,   
    loginAdminAlfa,
    loginEmpresas,
    getTablaClientes,
    // getEmpresa,
    getEmpresas,
    getCotizacionesTabla,
    getIdCotizacion,
    getClienteRFC 
}