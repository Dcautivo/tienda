'use strict'

var Cliente = require('../models/cliente');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../helpers/jwt');

const registro_cliente = async function (req,res) {
    //
    var data = req.body;
    var clientes_arr = [];
    //Buscar Registro existente con email
    clientes_arr = await Cliente.find({email:data.email});
    if(clientes_arr.length == 0){
    //Registro
    if(data.password){
        bcrypt.hash(data.password,null,null, async function(err,hash){
            if(hash){
                data.password = hash;
                var reg = await Cliente.create(data);
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

const login_cliente = async function(req,res){
    var data = req.body;
    var cliente_arr = [];  //Verificar si existe el correo en la base de datos

    cliente_arr = await Cliente.find({email:data.email}); //buscar en la coleccion del cliente por correo

    if(cliente_arr.length == 0){
        res.status(200).send({message: 'No se encontro el correo', data: undefined});
    }else {
        //Login
        let user = cliente_arr[0];
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

const listar_clientes_filtro_admin = async function(req,res){
    console.log(req.user);
    if(req.user) {
        if(req.user.role == 'admin') {
            //Filtro par abuscar
        let tipo = req.params['tipo'];
        let filtro = req.params['filtro'];

        console.log(tipo);

            if(tipo == null || tipo == 'null') {
                let reg = await Cliente.find();
            res.status(200).send({data:reg});
            }else{
                if(tipo == 'apellidos'){
                    let reg = await Cliente.find({apellidos:new RegExp(filtro, 'i')});
                    res.status(200).send({data:reg});
                }else if(tipo == 'correo'){
                    let reg = await Cliente.find({email:new RegExp(filtro, 'i')});
                    res.status(200).send({data:reg});
                }
            }
        }else{
            res.status(500).send({message: 'No Acccess'});
        }
    }else {
        res.status(500).send({message: 'No Access'});
    }

    
}

const registro_cliente_admin = async function(req,res) {
    if(req.user) {
        if(req.user.role =='admin'){
            var data = req.body;

            bcrypt.hash('1234556789',null,null, async function(err,hash){
                if(hash){
                    data.password = hash;
                    let reg = await Cliente.create(data);
                    res.status(200).send({data:reg});
                }else{
                    res.status(200).send({message: 'Hubo error en el servidor', data:undefined});
                }
            })
        }else{
            res.status(500).send({message: 'No Acccess'});
        }
    }else{
        res.status(500).send({message: 'No Access'});
    }
}

const obtener_cliente_admin = async function(req,res) {
    if(req.user) {
        if(req.user.role =='admin'){
           
            var id = req.params['id'];

            try {
                var reg = await Cliente.findById({_id:id});
            
                res.status(200).send({data:reg})
            } catch (error) {
                res.status(200).send({data:undefined})
            }
            
        }else{
            res.status(500).send({message: 'No Access'});
        }
    }else{
        res.status(500).send({message: 'No Access'});
    }
}

const actualizar_cliente_admin = async function(req,res){
    if(req.user) {
        if(req.user.role =='admin'){
           
            var id = req.params['id'];
            var data = req.body;

            var reg = await Cliente.findByIdAndUpdate({_id:id},{
                nombres: data.nombres,
                apellidos: data.apellidos,
                email: data.email,
                telefono: data.telefono,
                f_nacimiento: data.f_nacimiento,
                dni: data.dni,
                genero : data.genero
            })
            res.status(200).send({data:reg});
            
        }else{
            res.status(500).send({message: 'No Access'});
        }
    }else{
        res.status(500).send({message: 'No Access'});
    }
}

const eliminar_cliente_admin = async function(req,res){
    if(req.user) {
        if(req.user.role =='admin'){
           
           var id = req.params['id'] ;

           let reg = await Cliente.findByIdAndRemove({_id:id});
           res.status(200).send({data:reg});
            
        }else{
            res.status(500).send({message: 'No Access'});
        }
    }else{
        res.status(500).send({message: 'No Access'});
    }
}

module.exports = {
    registro_cliente,
    login_cliente,
    listar_clientes_filtro_admin,
    registro_cliente_admin,
    obtener_cliente_admin,
    actualizar_cliente_admin,
    eliminar_cliente_admin
}