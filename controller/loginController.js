function getLogin(req,res,next){
    res.render("index",{
        tittle:"Login - Chat Application"
    })
}

module.exports ={
    getLogin,
};