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
    const [rows] = await conn.query('SELECT * FROM Agendamentos');
    return rows;
    //pelas operações do insert ja tem as 5 de select
}
//lembrando que sao 3 operações de insert.
//cliente, mesa, reserva, agendamento, pedido
//5 operações de insert
async function insertData(agendamento) { //3 operacoes de insert 
    const conn = await connect();
    const sql =  ('INSERT INTO Agendamentos(status, observacoes) VALUES(?,?)')
    const values = [
        agendamento.status, 
        agendamento.observacoes
        ];
    await conn.query(sql, values);
}
//tabela CLIENTES***
async function updateData(agendamento_id, agendamentos) { //2 operacoes de update 
    const conn = await connect();
    const sql = 'UPDATE agendamentos SET status =?, observacoes =? WHERE agendamento_id =?';
    const values = [agendamentos.observacoes, agendamentos.status , agendamento_id];
    await conn.query(sql,values);
} //update de alterar os pedidos, a mesa, o agendamento. 3

async function deleteData(id) { //2 operacoes de delete
    const conn = await connect();
    const sql = 'DELETE FROM Agendamentos WHERE agendamento_id=?;';
    await conn.query(sql, [id]);
} //deletar os pedidos, agendamento, a mesa

module.exports = {selectData, insertData, updateData, deleteData}