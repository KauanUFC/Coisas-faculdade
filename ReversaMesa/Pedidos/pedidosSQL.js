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
    const [rows] = await conn.query('SELECT * FROM Pedidos');
    return rows;
    //pelas operações do insert ja tem as 5 de select
}
//lembrando que sao 3 operações de insert.
//cliente, mesa, reserva, agendamento, pedido
//5 operações de insert
async function insertData(pedidos) { //3 operacoes de insert 
    const conn = await connect();
    const sql =  ('INSERT INTO Pedidos (descricao, quantidade) VALUES(?,?)')
    const values = [
         pedidos.descricao, 
         pedidos.quantidade
        ];//valores que seram colocados na tabela 
    await conn.query(sql, values);
}
//tabela CLIENTES***
async function updateData(pedido_id, pedido) { //2 operacoes de update 
    const conn = await connect();
    const sql = 'UPDATE Pedidos SET descricao = ?, quantidade = ?, horario_pedido = ? WHERE pedido_id = ?';
    const values = [
        pedido.descricao, 
        pedido.quantidade, 
        pedido.horario_pedido, 
        pedido_id
        ];
    await conn.query(sql,values);
} //tem que ver com relação a FOREIGN KEY do banco

async function deleteData(id) { //2 operacoes de delete
    const conn = await connect();
    const sql = 'DELETE FROM Pedidos WHERE pedido_id=?;';
    await conn.query(sql, [id]);
} 

module.exports = {selectData, insertData, updateData, deleteData}