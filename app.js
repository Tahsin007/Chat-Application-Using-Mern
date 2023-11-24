const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const moment = require('moment');
const cors = require('cors');

//import inside file
const {notFoundHandler,defaultErrorHandler} = require('./middlewares/common/errorHandler');
const loginRouter = require('./router/loginRouter');
const userRouter = require('./router/userRouter');
const inboxRouter = require('./router/inboxRouter');
const { Http2ServerRequest } = require('http2');

var http = require('http'); 

const app = express();
// const server = http.createServer(app);
var server = require('http').createServer(app); 
dotenv.config();
app.use(cors());

const io = require('socket.io')(server);
global.io =io;

app.locals.moment = moment;

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/chat_application', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Check MongoDB connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


//Request parser
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//static folder. From this folder user directly can access the file
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine','ejs');
// app.set('views', path.join(__dirname, 'views'));
app.use(cookieParser(process.env.SECRET_COOKIE));

//router setup
app.use(loginRouter);
app.use(userRouter);
app.use(inboxRouter);


//error handling
// app.use(notFoundHandler);   //404 not found handler
// app.use(defaultErrorHandler)  //common error handler

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Something went wrong!');
// });
// io.on('connection', (socket) => {
//   console.log('A user connected');
//   // Your Socket.IO event handlers go here
// });

app.listen(process.env.PORT,()=>{
    console.log(`Listening to the ${process.env.PORT} port`);
})
