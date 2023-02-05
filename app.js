require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');

const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/post');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const commentRoutes = require('./routes/commentRoute');

const passport = require('passport');
const localStrategy = require('passport-local');
const User = require('./models/user');
const flash = require('connect-flash');
const app = express();


//chatting app
const http = require('http');
const server = http.createServer(app);
const socketio = require("socket.io");
const io = socketio(server);
const Chat = require('./models/chat')
const { accessSync } = require("fs");



// mongoose.connect(process.env.DATABASE)
// .then(()=>{
//     console.log("DB connected");
// })
// .catch((err)=>{
//     console.log(err);
// })

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database is connected");
  })
  .catch((err) => {
    console.log("Data Base Error...");
    console.log(err);
  });

app.set('view engine','ejs');
app.set('views' ,path.join(__dirname,'/views'));
app.use(express.static(path.join(__dirname,'/public')));
app.use(express.urlencoded({extended:true}));
app.use(flash());

app.get('/',(req,res)=>{
    res.render('login');
});

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
  }));

app.use(express.json()); 
app.use(passport.session()); // make use of session login/logout)
app.use(passport.initialize()); // initialsie pass
// authenticatin the user
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(authRoutes);
app.use(postRoutes);
app.use(userRoutes);
app.use(chatRoutes);
app.use(commentRoutes);


//connnection
io.on("connection",(socket)=>{
    console.log("connection established")
  
    socket.on("send-msg" , async(data)=>{
      io.emit("recived-msg",{
        msg:data.msg,
        user:data.user,
        createdAt: new Date(),
      });
      await Chat.create({content:data.msg , user: data.user})
    })
  })


const PORT = process.env.PORT || 3000;
  

server.listen(PORT,()=>{
    console.log(`Server connected to ${PORT}`);
});