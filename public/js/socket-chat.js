var socket = io();

var params = new URLSearchParams(window.location.search);
if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre y salas son necesarios')
}
let usuario = { nombre: params.get('nombre'), sala: params.get('sala') };

socket.on('connect', function() {
    console.log('Conectado al servidor');
    socket.emit('entrarChat', usuario, function(resp) {
        console.log(resp);
    })
});

socket.on('listaDePersonas', function(personas) {
    console.log(personas);
})

/*socket.on('crearMensaje', function(data) {
    console.log(data);
})*/

// escuchar
socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');

});




// Enviar información
/*socket.emit('crearMensaje', {
    usuario: 'Fernando',
    mensaje: 'Hola Mundo'
}, function(resp) {
    console.log('respuesta server: ', resp);
});*/

// Escuchar información
socket.on('crearMensaje', function(mensaje) {
    console.log('Servidor:', mensaje);

});

//Mensajes privados

socket.on('mensajePrivado', function(mensaje) {
    console.log('Mensaje privado:', mensaje);
})