'use strict'

var jwt = require('jwt-simple');//Decodificar token
var moment = require('moment');
var secret = 'dcautivo';//contraseña

exports.createToken = function(user){//Funcion
    var payload = {
        sub: user._id,
        nombres: user.nombres,
        apellidos: user.apellidos,
        email: user.email,
        role: user.rol,
        iat: moment().unix(),
        exp: moment().add(7, 'days').unix() 
    }

    return jwt.encode(payload,secret);
}