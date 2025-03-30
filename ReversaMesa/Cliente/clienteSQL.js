//const { connect } = require("mongoose");
//Connectar ao MySQL
async function connect(){
    if(global.connection && global.connection!=='disconnected'){
return global.connection;
    }
    const mysql = require('mysql2/promise');
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password:'',
        database:'reservamesa'
       /*
        port: 3306,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        debug: false,
        multipleStatements: true,
        dateStrings: true,
        timezone: 'Z',
        ssl: false,
        supportBigNumbers: true,
        bigNumberStrings: true,
        charset: 'utf8mb4',
        flags: 'ALL',
        typeCast: function (field, next) {
            if (field.type === 'BIT' && field.length === 1) {
                return (field.string() === '1'); // retorna true ou false
            }
            return next();  
        },
        //pool: true, // se for usar pool de conexao, descomentar esta linha
        */
        //outros parametros de configuracao
    });  
    //console.log("conectou ao MySQL");
    global.connection = connection;
    return connection;
}
//comandos 
async function selectData() { //5 operacoes de select
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM Clientes');
    return rows;
    //pelas operações do insert ja tem as 5 de select
}
//lembrando que sao 3 operações de insert.
//cliente, mesa, reserva, agendamento, pedido
//5 operações de insert
async function insertData(clientes) { //3 operacoes de insert 
    const conn = await connect();
    const sql =  ('INSERT INTO Clientes(nome, telefone, email) VALUES(?,?,?)')
    const values = [
        clientes.nome, 
        clientes.telefone, 
        clientes.email];
    await conn.query(sql, values);
}
//tabela CLIENTES***
async function updateData(id, clientes) { //2 operacoes de update 
    const conn = await connect();
    const sql = 'UPDATE Clientes SET nome =?, telefone =?, email =? WHERE cliente_id =?';
    const values = [
        clientes.nome, 
        clientes.telefone, 
        clientes.email, id];
    await conn.query(sql,values);
} //update de alterar os pedidos, a mesa, o agendamento. 3

async function deleteData(id) { //2 operacoes de delete
    const conn = await connect();
    const sql = 'DELETE FROM Clientes WHERE cliente_id=?;';
    await conn.query(sql, [id]);
} //deletar os pedidos, agendamento, a mesa

module.exports = {selectData, insertData, updateData, deleteData}