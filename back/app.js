'use strict'

var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var port = process.env.PORT || 4201;

//Obtiene la ruta del cliente
var cliente_route = require('./routers/cliente');
//Obtiene la ruta del admin
var admin_route = require('./routers/admin');



mongoose.connect('mongodb://127.0.0.1:27017/tienda',(err, res)=>{
    if(err){
        console.log(err);
    }else{
        app.listen(port,function () {
            console.log('Servidor corriendo en el puerto' + port);
        })
    }
})
//Para enviar peticiones Json
app.use(bodyparser.urlencoded({extends:true}));
app.use(bodyparser.json({limit: '50mb',  extends: true}));
//Para enviar datos y permisos
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*'); 
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow','GET, PUT, POST, DELETE, OPTIONS');
    next();
});
//Define el api
app.use('/api', cliente_route);
app.use('/api', admin_route);

module.exports = app;