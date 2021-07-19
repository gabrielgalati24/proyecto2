/*
    path: api/usuarios

*/
const { Router } = require('express');
// const { validarJWT } = require('../middlewares/validar-jwt');

const { getUsuarios,createUser,getAllUsuarios } = require('../controllers/usuarios');
const {comprobarJWT,generarJWT} = require('../helpers/jwt')
const Usuario = require('../models/usuario')
const router = Router();


// router.get('/', validarJWT, getUsuarios );
router.post('/', createUser)
router.get('/all',getAllUsuarios)
router.post('/a',getAllUsuarios)
router.post('/login',async(req,res)=>{
    const { email, password } = req.body;

    try {
        
        const usuarioDB = await Usuario.findOne({ email });
        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        // Validar el password
        // const validPassword = bcrypt.compareSync( password, usuarioDB.password );
        // if ( !validPassword ) {
        //     return res.status(400).json({
        //         ok: false,
        //         msg: 'La contraseña no es valida'
        //     });
        // }


        // Generar el JWT
        const token = await generarJWT( usuarioDB.id );
        console.log("hey")
        res.json({
            id:usuarioDB.id,
            ok: true,
            usuario: usuarioDB,
            token
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
})

module.exports = router;
