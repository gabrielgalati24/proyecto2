const express = require('express');

const path = require('path');
var bodyParser  = require('body-parser');
// require('dotenv').config();
var fileupload = require("express-fileupload");
const multer = require('multer');
var busboy = require('connect-busboy');
const cors = require('cors');
var morgan = require('morgan')
const uuid = require('uuid');
var socket = require('socket.io')
const {grabarMensaje,obtenerChat} = require('./controllers/mensajes')
// const server = require('http').createServer()
// const io = require('socket.io')(app)


// // DB Config
// require('./database/config').dbConnection();
// var admin = require("firebase-admin");
// const {Storage} = require('@google-cloud/storage');
// const storage = new Storage();

const PORT =process.env.PORT || 4001;
// App de Express
const app = express();
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
// app.use(cors());
// app.use(bodyParser.urlencoded({limit: '5000mb', extended: true, parameterLimit: 100000000000}));



// Lectura y parseo del Body
// app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/img/uploads'),
    filename: (req, file, cb, filename) => {
        console.log(req.file, req.body)
        cb(null, uuid.v4() + path.extname(file.originalname));
    }
})
app.use(multer({ storage }).single('image'));
// app.use((req, res, next) => {
//     app.locals.format = format;
//     next();
// });
require('./database').dbConnection();
app.use("/uploads/users", express.static("public/img/uploads/furry.jpg"));
// Node Server
// const server = require('http').createServer(app);
// module.exports.io = require('socket.io')(server);
// require('./sockets/socket');
// admin.initializeApp({
//     credential: admin.credential.cert('./cre.json'),
//     databaseURL: "https://gabrielgalati-870f9.firebaseio.com"
//   });

//   async function createBucket() {
//     // Creates the new bucket
//     await storage.createBucket(' sdsd');
//     console.log(`Bucket ${bucketName} created.`);
//   }
  
//   createBucket().catch(console.error);
app.use(cors());
app.use(busboy());
// ...

// Path público
// const publicPath = path.resolve( __dirname, 'public' );
// app.use( express.static( publicPath ) );



// Mis Rutas
app.use( '/api/pruebas', require('./routes/pruebas') );
app.use( '/api/usuarios', require('./routes/usuarios') );
app.use( '/api/login', require('./routes/auth') );
app.use( '/api/producto', require('./routes/productos') );
app.use( '/api/mensajes', require('./routes/mensajes') );


// const server = require('http').createServer(app);
// io = require('socket.io')(server);
// io.on('connection', function (client) {

//     console.log('client connect...', client.id);})

// io.on('connection', (socket) => {
//     console.log('a user connected');
//   });
// server.listen( 4000, ( err ) => {

//     if ( err ) throw new Error(err);

//     console.log('Servidor corriendo en puerto', 4000 );

// });
// const storage = multer.diskStorage({
//     destination: path.join(__dirname, 'public/img/uploads'),
//     filename: (req, file, cb, filename) => {
//         console.log(req.file, req.body)
//         cb(null, uuid.v4() + path.extname(file.originalname));
//     }
// })
// app.use(multer({ storage }).single('image'));
// app.use(fileupload());


var server =app.listen( PORT, ( err) => {

    if ( err ) throw new Error(err);

    console.log('Servidor corriendo en puerto', PORT );

});

let io = socket(server)
io.on('connection', function(socket){
  console.log(`${socket.id} is connected`);


  socket.on('woler1', async function name(data) {
    console.log(data);
  await grabarMensaje(data)
    io.emit(data.para, data)
  })
});

// io.on('connection', function (client) {

//   console.log('client connect...', client.id);

//   client.on('typing', function name(data) {
//     console.log(data);
//     io.emit('typing', data)
//   })

//   client.on('message', function name(data) {
//     console.log(data);
//     io.emit('message', data)
//   })

//   client.on('location', function name(data) {
//     console.log(data);
//     io.emit('location', data);
//   })

//   client.on('connect', function () {
//   })

//   client.on('disconnect', function () {
//     console.log('client disconnect...', client.id)
//     // handleDisconnect()
//   })

//   client.on('error', function (err) {
//     console.log('received error from client:', client.id)
//     console.log(err)
//   })
// })

// var server_port = process.env.PORT || 3000;
// server.listen(server_port, function (err) {
//   if (err) throw err
//   console.log('Listening on port %d', server_port);
// });