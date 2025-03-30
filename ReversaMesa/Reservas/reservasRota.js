const express = require('express');
const router = express.Router();
const reserva_db = require('./reservaSQL');

//SELECT
router.get('/data-reserva', async (req, res, next) => {
    try {
        const data = await reserva_db.selectData();
        res.json(data);
    } catch (error) {
        next(error);
    }
});

//INSERT
router.post('/add-reserva', async (req, res, next) => {
    try {
        const { data_hora, numero_pessoas, cliente_id, mesa_id } = req.body;
        await reserva_db.insertData({ 
            data_hora, 
            numero_pessoas, 
            cliente_id,
            mesa_id
        });
        res.json({ message: 'User added successfully' });
    } catch (error) {
        next(error);
    }
});

//UPDATE
router.put('/update-reserva', async (req, res) => {
    try {
        
        const {  id_reserva, data_hora, numero_pessoas  } = req.body;

        await reserva_db.updateData(id_reserva, { data_hora, numero_pessoas });
        res.json({ message: 'User updated successfully' });
    
    }catch(error){
        console.error('Error updating data:', error);
        res.status(500).send('Error updating data');
    }
});

//DELETE
router.delete('/delete-reserva/:id', async (req, res, next) => {
    try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ message: 'Field (id) is required' });
            }
            await reserva_db.deleteData(id);
            res.json({ message: 'User deleted successfully' });
        } catch (error) {
            next(error);
        }
});

module.exports = router;