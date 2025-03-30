const express = require('express');
const router = express.Router();
const cliente_db = require('./clienteSQL');

//SELECT
router.get('/data', async (req, res, next) => {
    try {
        const data = await cliente_db.selectData();
        res.json(data);
    } catch (error) {
        next(error);
    }
});


//INSERT  
router.post('/add-user', async (req, res, next) => {
    try {
        const { nome, telefone, email } = req.body;
        await cliente_db.insertData({ nome, telefone, email });
        res.json({ message: 'User added successfully' });
    } catch (error) {
        next(error);
    }
});

//UPDATE
router.put('/update-user', async (req, res, next) => {
    try {
        const { id, nome, telefone, email } = req.body;
        if (!id || !nome || !telefone || !email) {
            return res.status(400).json({ message: 'All fields (id, nome, telefone, email) are required' });
        }
        await cliente_db.updateData(id, { nome, telefone, email });
        res.json({ message: 'User updated successfully' });
    } catch (error) {
        next(error);
    }
});

//DELETE
router.delete('/delete-user/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'Field (id) is required' });
        }
        await cliente_db.deleteData(id);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        next(error);
    }
});

module.exports = router;