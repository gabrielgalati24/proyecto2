/*
    path: api/usuarios

*/
const { Router } = require('express');
// const { validarJWT } = require('../middlewares/validar-jwt');

let multer = require('multer');
const Producto = require('../models/producto');
var cloudinary = require('cloudinary').v2;
var path = require('path');
var fs = require('fs');
const {comprobarJWT} = require('../helpers/jwt')
cloudinary.config({ 
    cloud_name: 'dsvkna2xa', 
    api_key: "645674333348721", 
    api_secret: 'iA30CTrEl5WzrfBEnyH5G0BAF_A' 
  });

var imagename = ''
const { uuid } = require('uuidv4');
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => { // setting destination of uploading files        
      if (file.fieldname === "resume") { // if uploading resume
        cb(null, 'resumes');
      } else { // else uploading image
        cb(null, 'images');
      }
    },
    filename: (req, file, cb) => { // naming file
      cb(null, imagename= file.fieldname+"-"+uuid()+path.extname(file.originalname));
    }
  });
  
  const fileFilter = (req, file, cb) => {
    if (file.fieldname === "resume") { // if uploading resume
      if (
        file.mimetype === 'application/pdf' ||
        file.mimetype === 'application/msword' ||
        file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ) { // check file type to be pdf, doc, or docx
        cb(null, true);
      } else {
        cb(null, false); // else fails
      }
    } else { // else uploading image
      if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
      ) { // check file type to be png, jpeg, or jpg
        cb(null, true);
      } else {
        cb(null, false); // else fails
      }
    }
  };

let upload = multer();
const { ProductoImagen,crearProductos } = require('../controllers/productos');
var bodyParser = require('body-parser')
const router = Router();
js = bodyParser.json()

router.post('/',  ProductoImagen );
router.post('/crear', async(req,res)=>{
const {token} =req.body
const [seguir,id] = comprobarJWT(token)
console.log(seguir,"------",id)
if(!seguir){
  res.json({
    ok: false

})
}

  const producto  = new Producto(req.body)

    async function subirImage(x){
        let url = await cloudinary.uploader.upload(x, (error, result) => {
          

          
          return result;
          });
      
          return url
        }




  if(req.file !== undefined  ){

 const ruta = path.join(__dirname, `../public/img/uploads/${req.file.filename}`)

  subirImage(ruta).then((x)=>{

producto.imagen = x.secure_url
producto.save()
fs.unlinkSync(ruta)
res.json({
         ok: true,
       producto,
       id:producto._id

     })
  })


  }else{
    producto.imagen = ''
    producto.save()
    res.json({
      ok: true,
      producto,
      id:producto._id

  })
  }

})





router.put('', async(req,res)=>{
  console.log("update")
const { nombre} = req.body
  const producto  = await Producto.findById(req.body.id)
producto.nombre = nombre
    async function subirImage(x){
        let url = await cloudinary.uploader.upload(x, (error, result) => {
          

          
          return result;
          });
      
          return url
        }




  if(req.file !== undefined  ){

 const ruta = path.join(__dirname, `../public/img/uploads/${req.file.filename}`)

  subirImage(ruta).then((x)=>{

producto.imagen = x.secure_url
producto.save()
fs.unlinkSync(ruta)
res.json({
         ok: true,
       producto,
       id:producto._id

     })
  })


  }else{

    producto.save()
    res.json({
      ok: true,
      producto,
      id:producto._id

  })
  }

})


router.post('/pedir', async(req,res)=>{

const  {id} = req.body

const producto = await Producto.findById(id)

if(producto !== null){
  res.json(producto)
}else{
  res.json({
    ok:false
  })
}
})

router.get('/all', async(req,res)=>{
  

  const producto = await Producto.find();
console.log(producto)
  res.status(200).json(producto)
  })



  router.delete('/borrar', async(req,res)=>{

const {id} = req.body
console.log("/*/**//*/**",id)
try {
 const pp = await Producto.findByIdAndDelete(id)
 console.log(pp)
 res.json({
  ok:true
})
} catch (error) {
  console.log(error)
  res.json({
    ok:true
  })
}

    res.status(200).json({
      ok:true
    })
    })




// router.post('/crear',   multer(
//     { 
//       storage: fileStorage, 
//       limits:
//         { 
//           fileSize:'2mb' 
//         }, 
//       fileFilter: fileFilter 
//     }
//   ).fields(
//     [
//       { 
//         name: 'resume', 
//         maxCount: 1 
//       }, 
//       { 
//         name: 'image', 
//         maxCount: 1 
//       }
//     ]
//   ), (req,res)=>{
// console.log(req.body)

//     async function subirImage(x){
//         let url = await cloudinary.uploader.upload(x, (error, result) => {
          
//             console.log('subiendoo')
          
//           return result.secure_url;
//           });
      
//           return url.secure_url
//         }

//         const producto  = new Producto(req.body)


// if(imagename == ''){
//     imagename = ""
//     res.json({
//         ok: true,
//         producto,
//     })
// }else{
//     producto.imagen = imagename
//     imagename = ""
//     res.json({
//         ok: true,
//         producto,
//     })
// }


// imagename = ""
//   });
module.exports = router;
