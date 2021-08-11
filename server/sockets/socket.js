const { io } = require('../server');
const {Usuarios} = require('../classes/usuarios.class');
const {crearMensaje} = require('../utils/utilidades');  //260.

const usuarios = new Usuarios();
io.on('connection', (client) => { // se toma el evento del frontend chat-socket y emite una funcion donde se imprime el nombre del usuario

    client.on('entrarChat',(data, callback) => { //258
        if( !data.nombre || !data.sala){    // 262.
            return callback({
                error: true,
                mensaje: 'El nombre|sala es necesario'
            });
        }
        // 262. unir a una sala
        client.join(data.sala);

        usuarios.agregarPersona(client.id, data.nombre, data.sala);  // 262.    // 263.
        client.broadcast.to(data.sala).emit('listaPersona',usuarios.getPersonasPorSala(data.sala));   //259.  //263.
        callback(usuarios.getPersonasPorSala(data.sala));   // 263.
    });

    client.on('crearMensaje',(data) => {    // 260.
        let persona = usuarios.getPersona(client.id);
        let mensaje = crearMensaje(persona.nombre,data.mensaje);
        client.broadcast.to(persona.sala).emit('crearMensaje',mensaje); // 263.
    });

    client.on('disconnect',() => {
        let personaBorrada = usuarios.borrarPersona(client.id); // 259.
        client.broadcast.to(personaBorrada.sala).emit('crearMensaje',crearMensaje('Administrador ', `${personaBorrada.nombre} salió`)); // 260. //263.
        client.broadcast.to(personaBorrada.sala).emit('listaPersona',usuarios.getPersonasPorSala(personaBorrada.sala));   //259. //263.
    });

    //  Mensajes privados
    client.on('mensajePrivado', data => {   // 261.

        let persona = usuarios.getPersona(client.id);
        client.broadcast.to(data.para).emit('mensajePrivado',crearMensaje(persona.nombre, data.mensaje)); // 260.
    });
});



