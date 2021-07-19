// const { response } = require('express');
const Producto = require('../models/producto');
var cloudinary = require('cloudinary').v2;
var path = require('path');
var fs = require('fs');

cloudinary.config({ 
    cloud_name: 'dsvkna2xa', 
    api_key: "645674333348721", 
    api_secret: 'iA30CTrEl5WzrfBEnyH5G0BAF_A' 
  });

const ProductoImagen = async ( req, res = response ) => {
    console.log(req.body)
    var xxxxx 
    // const producto = new Producto( req.body );
    var prueba =await Producto.findById(req.body.id).exec();
    console.log(prueba)
if(prueba !== null){
    async function subirImage(x){
        let url = await cloudinary.uploader.upload(x, (error, result) => {
          
            console.log('subiendoo')
          
          return result.secure_url;
          });
      
          return url.secure_url
        }

        
    if (req.busboy) {
        req.busboy.on('file', async function(fieldname, file, filename, encoding, mimetype)  {
          // ...
            console.log('guarnado')
          var saveTo = path.join('.', filename);
  
          file.pipe(fs.createWriteStream(saveTo));
     xxxxx = await  subirImage(filename)

        fs.unlinkSync(filename)
        });
        req.busboy.on('field', function(key, value, keyTruncated, valueTruncated) {
          // ...
        });
        req.pipe(req.busboy);
      }




    

 
    console.log(producto)
    producto.imagen = xxxxx 
      producto.save()
      console.log(producto)
    
    res.json({
        ok: true,
        producto,
    })
}

}



const crearProductos = async ( req, res ) => {
    console.log(req.body);

    if (req.busboy) {
      req.busboy.on('file', async function(fieldname, file, filename, encoding, mimetype)  {
        // ...
          console.log('guarnado')
        var saveTo = path.join('.', filename);

        file.pipe(fs.createWriteStream(saveTo));
  //  xxxxx = await  subirImage(filename)

      fs.unlinkSync(filename)
      });
      req.busboy.on('field', function(key, value, keyTruncated, valueTruncated) {
        // ...
      });
      req.pipe(req.busboy);
    }


   




    

    // const producto = new Producto( req.body );


    //   producto.save()

    
    res.json({
        ok: true
    })
}


module.exports = {
 ProductoImagen,
    crearProductos
}