'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'dcautivo';


exports.auth = function(req,res,next){
    if(!req.headers.authorization){
        return res.status(403).send({message: 'NoHeadersError'})
    }

    var token = req.headers.authorization.replace(/['"]+/g,'');

    var segmen = token.split('.');

    
    //Validar tokens
    if(segmen.length != 3) {
        return res.status(403).send({message: 'InvalidadToken'})
    }else{
        try {
            var payload = jwt.decode(token,secret);
            
            if(payload.exp <= moment().unix()) {
                return res.status(403).send({message: 'TokenExpirado'})
            }

        }catch (error) {
            return res.status(403).send({message: 'InvalidadToken'})
        }
    }

    //enviar Token Codificado
    req.user = payload;

    next();
}