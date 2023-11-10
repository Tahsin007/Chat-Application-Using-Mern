function getInbox(req,res,next){
    res.render("inbox",{
        tittle:"Inbox - Chat Application"
    })
}

module.exports ={
    getInbox,
};