const express = require('express');
const router = express.Router();
const pedidos_db = require('./pedidosSQL');

//SELECT
router.get('/data-pedidos', async (req, res, next) => {
    try {
        const data = await pedidos_db.selectData();
        res.json(data);
    } catch (error) {
        next(error);
    }
});

//INSERT
router.post('/add-pedido', async (req, res, next) => {
    try {
        const {  agendamento_pedido_id, descricao, quantidade, horario_pedido  } = req.body;
        await pedidos_db.insertData({  agendamento_pedido_id, descricao, quantidade, horario_pedido });
        res.json({ message: 'User added successfully' });
    } catch (error) {
        next(error);
    }
});

//UPDATE
router.put('/update-pedido', async (req, res, next) => {
    try {
        const { id, descricao, quantidade, horario_pedido  } = req.body;
        if (!id || !descricao || !quantidade || !horario_pedido) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        await pedidos_db.updateData( id, { descricao, quantidade, horario_pedido });
        res.json({ message: 'User updated successfully' });
    } catch (error) {
        console.error('Error:', error);
    }
});

//DELETE
router.delete('/delete-pedido/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'Field (id) is required' });
        }
        await pedidos_db.deleteData(id);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        next(error);
    }
});

module.exports = router;