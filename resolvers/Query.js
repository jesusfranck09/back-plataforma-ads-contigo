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
//  console.log("esto es variable", variable)
 return actions.getProductoServicio(variable)
}
const getTablaClientesAlfa   =  (_ , data) =>{
    var cadena= data.data[0]
    var variable = cadena.split(",")
//  console.log("esto es variable", variable)
 return actions.getTablaClientesAlfa(variable)
}

const getIdClientesAlfa   =  (_ , data) =>{
    var cadena= data.data[0]
    var variable = cadena.split(",")
 console.log("esto es variable", variable)
 return actions.getIdClientesAlfa(variable)
}

const getTablaContactos  =  (_ , data) =>{
    var cadena= data.data[0]
    var variable = cadena.split(",")
 console.log("esto es variable", variable)
 return actions.getTablaContactos(variable)
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

const getClienteId   =  (_ , data) =>{
    var cadena= data.data[0]
    var variable = cadena.split(",")
return actions.GetClienteId(variable)
}

const getContactosId   =  (_ , data) =>{
    var cadena= data.data[0]
    var variable = cadena.split(",")
return actions.getContactosId(variable)
}

module.exports={ 
    getContactosId,
    getClienteId,
    getTotalesByFolio,
    getProductoServicioByFolio,
    getTablaContactos,
    getIdClientesAlfa,
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