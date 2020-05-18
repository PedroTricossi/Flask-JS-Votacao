document.addEventListener('DOMContentLoaded', () => {

    // Conexão com websocket
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

    // Configuração dos botões
    socket.on('connect', () => {

        document.querySelectorAll('button').forEach(button => {
            button.onclick = () => {
                const selection = button.dataset.vote;
                socket.emit('submit vote', {'selection': selection});
            };
        });
    });

    // Contagem dos votos
    socket.on('vote totals', data => {
        document.querySelector('#yes').innerHTML = data.yes;
        document.querySelector('#no').innerHTML = data.no;
        document.querySelector('#maybe').innerHTML = data.maybe;
    });
});
