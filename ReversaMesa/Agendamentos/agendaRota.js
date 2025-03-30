const express = require('express');
const router = express.Router();
const agenda_db = require('./agendaSQL');

//SELECT
router.get('/data-agenda', async (req, res, next) => {
    try {
        const data = await agenda_db.selectData();
        res.json(data);
    } catch (error) {
        next(error);
    }
});

//INSERT
router.post('/add-agenda', async (req, res, next) => {
    try {
        const { reserva_id, status, observacoes } = req.body;
        await agenda_db.insertData({ reserva_id, status, observacoes });
        res.json({ message: 'User added successfully' });
    } catch (error) {
        next(error);
    }
});

//UPDATE
router.put('/update-agenda', async (req, res, next) => {
    try {
        
        const { id, status, observacoes  } = req.body;

        if (!id || !status || !observacoes) {
        return res.status(400).json(
        { message: 'All fields  are required' });}

        await agenda_db.updateData(id, { status, observacoes });
        res.json({ message: 'User updated successfully' });
    
    }catch(error){
        console.error('Error updating data:', error);
        res.status(500).send('Error updating data');
    }
});

//DELETE
router.delete('/delete-agenda/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'Field (id) is required' });
        }
        await agenda_db.deleteData(id);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        next(error);
    }
});

module.exports = router;