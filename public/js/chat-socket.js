let socket = io();
let params = new URLSearchParams(window.location.search);   // 258. creamos instancia para poder obtener los datos de quien abre una nueva sesion

if(!params.has('nombre') || !params.has('nombre')){  // 258. se realiza una validacion para que se ingrese el nombre del usuario, esto debe ser si o si
    window.location = 'index.html';
    throw new Error('El nombre y la sala son necesarios');
}

let usuario = { // 258. se toma el valor del usuario agregado en la url //actualizado en 262.
    nombre: params.get('nombre'),
    sala: params.get('sala')
};



socket.on('connect', function() {       // 258. emitir evento cuando se conecta el nuevo usuario
    console.log('Conectado al servidor');
    socket.emit('entrarChat',usuario,function(resp){
        console.log('Usuarios conectados ',resp);
    });
});

// escuchar si el socket del frontend se desconecta del servidor
socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});


// 260. Enviar información
//enviar mensajes desde el front, este es un ejemplo de como se hacer, se comenta para que no se ejecute automaticamente
// socket.emit('crearMensaje', {
//     usuario: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// 260. Escuchar información, esta al pendiente del evento crearMensaje que recibe del server.js
socket.on('crearMensaje', function(mensaje) {

    console.log('Servidor:', mensaje);

});

// EScuchar cambios de usuarios
// 259 cuando usuario entra o sale del chat
socket.on('listaPersona',function(personas){
    console.log(personas);
});

//  Mensajes privados
socket.on('mensajePrivado',function(mensaje){   // 261. Evento que escucha cuando el servidor le emita un mensaje privado que algun usuario escribio
    console.log(' Mensaje privado',mensaje);

});
