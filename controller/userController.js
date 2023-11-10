function getUsers(req,res,next){
    res.render("users",{
        tittle:"Users - Chat Application"
    })
}

module.exports ={
    getUsers,
};