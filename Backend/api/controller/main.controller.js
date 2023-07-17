var Provider = require('../db/db');
const { ObjectId } = require('mongodb');

function isEmptyList(obj){
    return(!obj || obj.length == 0 || Object.keys(obj).length == 0);
}

function handleError(res,error){
    res.status(200);
    res.send('Something went wrong. \n'+error);
}

//CRUD

//uri1: /api/providers
//uri2: /api/providers/id

module.exports.create = function(req,res){
    
    try{
        var provider = req.body;

        Provider.create(provider)
            .then( result => {
                res.status(201);
                res.send('Added '+result);
            })
            .catch(error => handleError(res,error))
    }
    catch(e){
        handleError(res,e)
    }
}

module.exports.readAll = function(req,res){

    try{
        Provider.find()
            .then( result => {
                if(isEmptyList(result)){
                    res.status(400);
                    res.send("List is Empty.");
                }
                res.status(200);
                res.send(result);
            })
            .catch(error => handleError(res,error));
    }
    catch(e){
        handleError(res,e)
    }
}

module.exports.readOne = function(req,res){
    
    try{

        Provider.find({'_id':new ObjectId(req.params.id)})
            .then( result => {
                if(isEmptyList(result)){
                    res.status(400);
                    res.send("List is Empty.");
                }
                res.status(200);
                res.send(result);
            })
            .catch(error => handleError(res,error))
    }
    catch(e){
        handleError(res,e)
    }
}

module.exports.update = function(req,res){

    try{
        let provider = req.body;

        Provider.findOneAndUpdate({'_id':(req.params.id)}, provider, {new:true})
            .then( result => {
                if(isEmptyList(result)){
                    res.status(400);
                    res.send("List is Empty.");
                }
        
                res.status(200);
                res.send("Updated Result "+result);
            })
            .catch(error => handleError(res,error))
    }
    catch(e){
        handleError(res,e)
    }
}

module.exports.deleteAll = function(req,res){

    try{

        Provider.deleteMany({})
            .then( result => {
                if(result.deletedCount === 0){
                    res.status(400);
                    res.send("List is Empty.");
                }
        
                res.status(200);
                res.send("List Deleted \n"+result);
            })
            .catch(error => handleError(res,error))

    }
    catch(e){
        handleError(res,e)
    }
}

module.exports.deleteOne = function(req,res){
    
    try{

        Provider.findOneAndDelete( {'_id':(req.params.id)})
            .then( result => {
                if(isEmptyList(result)){
                    res.status(400);
                    res.send("List is Empty.");
                }

                res.status(200);
                res.send("Deleted Provider "+result);
            })
            .catch(error => handleError(res,error))

    }
    catch(e){
        handleError(res,e)
    }
}