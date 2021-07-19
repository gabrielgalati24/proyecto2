const { io } = require('../index');


// Mensajes de Sockets
io.on('connection', function (client) {

    console.log('client connect...', client.id);
  
    client.on('typing', function name(data) {
      console.log(data);
      io.emit('typing', data)
    })
  
    client.on('message', function name(data) {
      console.log(data);
      io.emit('message', data)
    })
  
    client.on('location', function name(data) {
      console.log(data);
      io.emit('location', data);
    })
  
    client.on('connect', function () {
    })
  
    client.on('disconnect', function () {
      console.log('client disconnect...', client.id)
      // handleDisconnect()
    })
  
    client.on('error', function (err) {
      console.log('received error from client:', client.id)
      console.log(err)
    })

  
//     const [ valido, uid ] = comprobarJWT( client.handshake.headers['x-token'] )
// console.log("conectado nuevo")
//     // Verificar autenticación
//     if ( !valido ) { return client.disconnect(); }
    
//     // Cliente autenticado
//     usuarioConectado( uid );

//     // Ingresar al usuario a una sala en particular
//     // sala global, client.id, 5f298534ad4169714548b785
//     client.join( uid );

    // Escuchar del cliente el mensaje-personal
    // client.on('mensaje-personal', async( payload ) => {
    //     console.log("entrandoa  la nueva sala")
    //     // TODO: Grabar mensaje
    //     await grabarMensaje( payload );
    //     io.to( payload.para ).emit('mensaje-personal', payload );
    // })


    // client.on('disconnect', () => {
    //     usuarioDesconectado(uid);
    // });

    

    
    // client.on('mensaje', ( payload ) => {
    //     console.log('Mensaje', payload);
    //     io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );
    // });


});
