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
    const [rows] = await conn.query('SELECT * FROM Mesas');
    return rows;
}
//lembrando que sao 3 operações de insert.
//cliente, mesa, reserva, agendamento, pedido
//5 operações de insert
async function insertData(mesas) { //3 operacoes de insert 
    const conn = await connect();
    const sql =  ('INSERT INTO Mesas(capacidade, localizacao) VALUES(?,?)')
    const values = [mesas.capacidade, mesas.localizacao]//valores que seram colocados na tabela 
    await conn.query(sql, values);
}
//tabela CLIENTES***
async function updateData(mesa_id, mesas) { //2 operacoes de update 
    const conn = await connect();
    const sql = 'UPDATE Mesas SET capacidade =?, localizacao =? WHERE mesa_id =?';
    const values = [mesas.capacidade, mesas.localizacao , mesa_id];
    await conn.query(sql,values);
} //update de alterar os pedidos, a mesa, o agendamento. 3

async function deleteData(id) { //2 operacoes de delete
    const conn = await connect();
    const sql = 'DELETE FROM Mesas WHERE mesa_id=?;';
    await conn.query(sql, [id]);
} //deletar os pedidos, agendamento, a mesa

module.exports = {selectData, insertData, updateData, deleteData}