const createErros = require('http-errors');

//404 not found handler
function notFoundHandler(req,res,next){
    next(createErros(404, "Your requested content was not found"));
}

function defaultErrorHandler(err,req,res,next){
    res.locals.error = err;

    res.status(err.status || 500);
    if(res.locals.html){
        res.render("error",{
        tittle:"Error Page"
        });
    }else{
        res.json(res.locals.error);
    }
    
}

module.exports={
    notFoundHandler,
    defaultErrorHandler
}