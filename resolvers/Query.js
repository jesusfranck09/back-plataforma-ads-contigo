const actions = require('../actions/userActions')


const loginAdminAlfa  =  (_ , data) =>{
    var cadena= data.data[0]
    var variable = cadena.split(",")
 console.log("esto es variable", variable)
 return actions.loginAdminAlfa(variable)
}

const loginEmpresas  =  (_ , data) =>{
    var cadena= data.data[0]
    var variable = cadena.split(",")
 console.log("esto es variable", variable)
 return actions.loginEmpresas(variable)
}

const getTablaClientes =  (_ , data) =>{    
    var cadena= data.data[0]
    var variable = cadena.split(",")
 console.log("la data en query es " , variable)
 return actions.getTablaClientes(variable)
}

// const getEmpresa =  (_ , data) =>{    
//     var cadena= data.data[0]
//     var variable = cadena.split(",")
//  console.log("la data en query es " , variable)
//  return actions.getEmpresa(variable)
// }
const getEmpresas =  (_ , data) =>{    
    var cadena= data.data[0]
    var variable = cadena.split(",")
 console.log("la data en query es " , variable)
 return actions.getEmpresas(variable)
}

const getCotizacionesTabla  =  (_ , data) =>{
    var cadena= data.data[0]
    var variable = cadena.split(",")
 console.log("esto es variable", variable)
 return actions.getCotizacionesTabla  (variable)

}

const getIdCotizacion  =  (_ , data) =>{
    var cadena= data.data[0]
    var variable = cadena.split(",")
 console.log("esto es variable", variable)
 return actions.getIdCotizacion  (variable)

}
const getClienteRFC   =  (_ , data) =>{
    var cadena= data.data[0]
    var variable = cadena.split(",")
 console.log("esto es variable", variable)
 return actions.getClienteRFC   (variable)
}

const getTablaProductoServicio   =  (_ , data) =>{
    var cadena= data.data[0]
    var variable = cadena.split(",")
 console.log("esto es variable getTablaProductoServicio", variable)
 return actions.getTablaProductoServicio(variable)
}

const getProductoServicio   =  (_ , data) =>{
    var cadena= data.data[0]
    var variable = cadena.split(",")
 console.log("esto es variable", variable)
 return actions.getProductoServicio(variable)
}
const getTablaClientesAlfa   =  (_ , data) =>{
    var cadena= data.data[0]
    var variable = cadena.split(",")
 console.log("esto es variable", variable)
 return actions.getTablaClientesAlfa(variable)
}



module.exports={ 
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