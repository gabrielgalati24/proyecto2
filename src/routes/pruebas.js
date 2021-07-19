/*
    path: api/login

*/
/*
    path: api/login

*/
const Usuario = require('../models/usuario');
const Producto= require('../models/producto');
var admin = require("firebase-admin");
const { Router } = require('express');
const { check } = require('express-validator');
var cloudinary = require('cloudinary').v2;
const { generarJWT } = require('../helpers/jwt');
var path = require('path');
var fs = require('fs');
var os = require('os');
cloudinary.config({ 
    cloud_name: 'dsvkna2xa', 
    api_key: "645674333348721", 
    api_secret: 'iA30CTrEl5WzrfBEnyH5G0BAF_A' 
  });
const router = Router();
router.post('/', async (req,res)=>{

    async function subirImage(x){
        let url = await cloudinary.uploader.upload(x, (error, result) => {
          
 
          
          return result.secure_url;
          });
      
          return url.secure_url
        }

    if (req.busboy) {
        req.busboy.on('file', async function(fieldname, file, filename, encoding, mimetype)  {
          // ...
   
          var saveTo = path.join('.', filename);
  
          file.pipe(fs.createWriteStream(saveTo));
        var xxxxx = await  subirImage(filename)

        fs.unlinkSync(filename)
        });
        req.busboy.on('field', function(key, value, keyTruncated, valueTruncated) {
          // ...
        });
        req.pipe(req.busboy);
      }
      // 
      res.send("hola")
});
router.get('/', (req,res)=>{
    console.log(req.files.image); // the uploaded file object
    res.send('hola')
});
router.delete('/', (req,res)=>{
    const {id}  = req.body
    Product.findByIdAndDelete(id);// the uploaded file object
    res.json({
        ok:true
    })
});

router.post('/qr', (req,res)=>{
    console.log(req.body);
     // the uploaded file object
     const {qrCode} = req.body
     res.send({
        ok: true,
        msg: 'Hable con el administrador'
    });
});

router.get('/qr', (req,res)=>{
    console.log("hola")
    res.send({
        ok: false,
        msg: 'Hable con el administrador'
    });
});

router.post('/register', async (req,res)=> {
    const { email } = req.body;

    try {

        const existeEmail = await Usuario.findOne({ email });
        if( existeEmail ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }

        const usuario = new Usuario( req.body );

        // Encriptar contraseña
        // const salt = bcrypt.genSaltSync();
        // usuario.password = bcrypt.hashSync( password, salt );

        await usuario.save();
console.log(usuario)
        // Generar mi JWT
        const token = await generarJWT( usuario.id );

        res.json({
            ok: true,
            usuario,
            token
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
});


router.post('/producto', async (req,res)=> {
    const { email, password } = req.body;

    try {

        const existeEmail = await Usuario.findOne({ email });
        if( existeEmail ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }

        const usuario = new Usuario( req.body );

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        await usuario.save();
console.log(usuario)
        // Generar mi JWT
        const token = await generarJWT( usuario.id );

        res.json({
            ok: true,
            usuario,
            token
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
});
// const crearUsuario = async (req, res = response ) => {

//     const { email, password } = req.body;

//     try {

//         const existeEmail = await Usuario.findOne({ email });
//         if( existeEmail ) {
//             return res.status(400).json({
//                 ok: false,
//                 msg: 'El correo ya está registrado'
//             });
//         }

//         const usuario = new Usuario( req.body );

//         // Encriptar contraseña
//         const salt = bcrypt.genSaltSync();
//         usuario.password = bcrypt.hashSync( password, salt );

//         await usuario.save();
// console.log(usuario)
//         // Generar mi JWT
//         const token = await generarJWT( usuario.id );

//         res.json({
//             ok: true,
//             usuario,
//             token
//         });


//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             ok: false,
//             msg: 'Hable con el administrador'
//         });
//     }
// }


// const login = async ( req, res = response ) => {

//     const { email, password } = req.body;

//     try {
        
//         const usuarioDB = await Usuario.findOne({ email });
//         if ( !usuarioDB ) {
//             return res.status(404).json({
//                 ok: false,
//                 msg: 'Email no encontrado'
//             });
//         }

//         // Validar el password
//         const validPassword = bcrypt.compareSync( password, usuarioDB.password );
//         if ( !validPassword ) {
//             return res.status(400).json({
//                 ok: false,
//                 msg: 'La contraseña no es valida'
//             });
//         }


//         // Generar el JWT
//         const token = await generarJWT( usuarioDB.id );
//         console.log("hey")
//         res.json({
//             ok: true,
//             usuario: usuarioDB,
//             token
//         });


//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             ok: false,
//             msg: 'Hable con el administrador'
//         })
//     }

// }



// const renewToken = async( req, res = response) => {

//     const uid = req.uid;

//     // generar un nuevo JWT, generarJWT... uid...
//     const token = await generarJWT( uid );

//     // Obtener el usuario por el UID, Usuario.findById... 
//     const usuario = await Usuario.findById( uid );

//     res.json({
//         ok: true,
//         usuario,
//         token
//     });

// }

module.exports = router;




// module.exports = {
//     crearUsuario,
//     login,
//     renewToken
// }


