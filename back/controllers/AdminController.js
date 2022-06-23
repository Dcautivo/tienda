'use strict'

var Admin = require('../models/admin');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../helpers/jwt');

const registro_admin = async function (req,res) {
    //
    var data = req.body;
    var admin_arr = [];
    //Buscar Registro existente con email
    admin_arr = await Admin.find({email:data.email});
    
    if(admin_arr.length == 0){
    //Registro
    if(data.password){
        bcrypt.hash(data.password,null,null, async function(err,hash){
            if(hash){
                data.password = hash;
                var reg = await Admin.create(data);
                res.status(200).send({data:reg});
            }else{
                res.status(200).send({message: 'ErrorServer', data:undefined});
            }
        })
    }else{
        res.status(200).send({message: 'No hay una contraseña', data:undefined});
    }

    }else{
        res.status(200).send({message: 'El correo ya existe en la base de datos', data:undefined});
    }
    
}

const login_admin = async function(req,res){
    var data = req.body;
    var admin_arr = [];  //Verificar si existe el correo en la base de datos

    admin_arr = await Admin.find({email:data.email}); //buscar en la coleccion del admin por correo

    if(admin_arr.length == 0){
        res.status(200).send({message: 'No se encontro el correo', data: undefined});
    }else {
        //Login
        let user = admin_arr[0];
        //Comparar las contraseñas
        bcrypt.compare(data.password, user.password, async function(error, check){
            if(check){
                //Verificar si la contraseña si concide con BBDD
                res.status(200).send({
                    data:user,
                    token: jwt.createToken(user) //Viene de helpers - jwt
                });
            }else{
                res.status(200).send({message: 'La contraseña no coincide', data: undefined});
            }
        });

    }  
}

module.exports = {
    registro_admin,
    login_admin
} 