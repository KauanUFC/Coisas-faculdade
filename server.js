const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

//aqui vc chama o arquivo que contem as rotas
const clientesRoutes = require('./ReversaMesa/Cliente/clienteRota');
const mesasRoutes = require('./ReversaMesa/Mesas/mesaRota');
const pedidosRoutes = require('./ReversaMesa/Pedidos/pedidosRota');
const reservaRoutes = require('./ReversaMesa/Reservas/reservasRota');
const agendaRotas = require('./ReversaMesa/Agendamentos/agendaRota');
//reversa funciona

// Use the routes
app.use('/clienteRota', clientesRoutes);
app.use('/mesaRota', mesasRoutes);
app.use('/pedidosRota', pedidosRoutes);
app.use('/reservasRota', reservaRoutes);
app.use('/agendaRota', agendaRotas);



// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});