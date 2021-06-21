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


  
    
module.exports={
    signupAlfa,
    signupEmpresas,
    insertCotizaciones
}