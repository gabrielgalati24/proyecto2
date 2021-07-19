
const Mensaje = require('../models/mensaje');

const obtenerChat = async(req, res) => {
    const miId = req.uid;
    const mensajesDe = req.body.id;

    const last30 = await Mensaje.find({
        $or: [{ para: mensajesDe }]
    })
    .sort({ createdAt: 'desc' })
    // .limit(30);
    const reversed = last30.reverse()
    res.json({
    
        mensajes: reversed
    })

}


const grabarMensaje = async( data ) => {
    console.log("hiii")

    
        // payload: {
        //     de: req.body.de,
        //     para: req.body.para,
        //     texto: ''
        // }
        // data.de='60c2beb0890b623fe8e7fdc8'

    

    try {
        const mensaje = new Mensaje( data );
        await mensaje.save();
console.log("guarado")
        return true;
    } catch (error) {
        console.log(error)
        return false;
    }

}



module.exports = {
    obtenerChat,
    grabarMensaje
}