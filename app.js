const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');

//import inside file
const {notFoundHandler,defaultErrorHandler} = require('./middlewares/common/errorHandler');
const loginRouter = require('./router/loginRouter');
const userRouter = require('./router/userRouter');
const inboxRouter = require('./router/inboxRouter');



const app = express();
dotenv.config();
// process.end.APP_CHAT;

// mongoose.
//     connect(process.env.CONN_STRING,{
//         useNewUrlParser:true,
//         useUnifiedTopology:true
//     })
//     .then(()=>{console.log("Database Connection is successfull")})
//     .catch((err)=>{console.log(err)});

//Request parser
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//static folder. From this folder user directly can access the file
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine','ejs');
app.use(cookieParser(process.env.SECRET_COOKIE));

//router setup
app.use(loginRouter);
app.use(userRouter);
app.use(inboxRouter);


//error handling
app.use(notFoundHandler);   //404 not found handler
app.use(defaultErrorHandler)  //common error handler


app.listen(process.env.PORT,()=>{
    console.log(`Listening to the ${process.env.PORT} port`);
})