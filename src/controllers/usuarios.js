const { response } = require('express');
const Usuario = require('../models/usuario');
const {generarJWT,comprobarJWT} = require('../helpers/jwt')
const getUsuarios = async ( req, res = response ) => {

    const desde = Number( req.query.desde ) || 0;

    const usuarios = await Usuario
        .find({ _id: { $ne: req.uid } })
        .sort('-online')
        .skip(desde)
        .limit(20)

    
    res.json({
        ok: true,
        usuarios,
    })
}

const createUser = async(req,res)=>{

try{

const{email} = req.body
    const existeEmail = await Usuario.findOne({ email });
    if( existeEmail ) {
        return res.status(400).json({
            ok: false,
            msg: 'El correo ya está registrado'
        });
    }
    const usuario  = new Usuario(req.body)
    console.log(' asdasd---------' );
    const token = await generarJWT( usuario.id );
    console.log(token)
    const {nombre} = usuario
await usuario.save()
res.json({
    nombre,token
})

}catch (e){
    console.log(e)
res.json({
    "ok":false
})
}
}


const getAllUsuarios = async(req,res)=>{
    const {token} = req.body
    var pp = comprobarJWT(token)
    console.log(pp)
    try{
        const usuario  = await Usuario.find()

        res.json(usuario)
    
    }catch{
        res.json({
            ok:false
        })
    }
    }
module.exports = {
    getUsuarios,
    createUser,
    getAllUsuarios
}