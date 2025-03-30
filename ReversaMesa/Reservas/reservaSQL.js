//const { connect } = require("mongoose");

async function connect() {
    if(global.connection && global.connection!=='disconnected'){
return global.connection;
    }
    const mysql = require('mysql2/promise');
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password:'',
        database:'reservamesa'
    });  
    //console.log("conectou ao MySQL");
    global.connection = connection;
    return connection;
}

async function selectData() { //5 operacoes de select
    const conn = await connect();
    const [rows] = await conn.query(`
        SELECT * FROM Reservas;
    `);
    return rows;
    //pelas operações do insert ja tem as 5 de select
}
//lembrando que sao 3 operações de insert.
//cliente, mesa, reserva, agendamento, pedido
//5 operações de insert
async function insertData(reservas) { //3 operacoes de insert 
    const conn = await connect();
    const sql =  ('INSERT INTO Reservas(data_hora, numero_pessoas, cliente_id, mesa_id) VALUES(?,?,?,?)');
    const values = [
        reservas.data_hora, 
        reservas.numero_pessoas,
        reservas.cliente_id,
        reservas.mesa_id
        ];//valores que seram colocados na tabela 
    await conn.query(sql, values);
}
//tabela CLIENTES***
async function updateData(reserva_id, reservas) {
    const conn = await connect();
    const sql = 'UPDATE Reservas SET data_hora = ?, numero_pessoas = ? WHERE reserva_id = ?';
    const values = [
        reservas.data_hora,
        reservas.numero_pessoas,
        reserva_id
    ];
    await conn.query(sql, values);
}

async function deleteData(id) { //2 operacoes de delete
    const conn = await connect();
    const sql = 'DELETE FROM Reservas WHERE reserva_id=?;';
    await conn.query(sql, [id]);
} //deletar os pedidos, agendamento, a mesa

module.exports = {selectData, insertData, updateData, deleteData}