const express = require('express');
const router = express.Router();
const mesas_db = require('./mesasSQL');

//SELECT
router.get('/data-table', async (req, res, next) => {
    try {
        const data = await mesas_db.selectData();
        res.json(data);
    } catch (error) {
        next(error);
    }
});

//INSERT
router.post('/add-table', async (req, res, next) => {
    try {
        const { capacidade, localizacao } = req.body;
        await mesas_db.insertData({ capacidade, localizacao });
        res.json({ message: 'User added successfully' });
    } catch (error) {
        next(error);
    }
});

//UPDATE
router.put('/update-table', async (req, res, next) => {
    try {
        const { id, capacidade, localizacao } = req.body;
        if (!id || !capacidade || !localizacao) {
            return res.status(400).json({ message: 'All fields (id, capacidade, localizacao) are required' });
        }
        await mesas_db.updateData(id, { capacidade, localizacao });
        res.json({ message: 'User updated successfully' });
    } catch (error) {
        next(error);
    }
});

//DELETE
router.delete('/delete-table/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'Field (id) is required' });
        }
        await mesas_db.deleteData(id);
        res.json({ message: 'Table deleted successfully' });
    } catch (error) {
        next(error);
    }
});

module.exports = router;