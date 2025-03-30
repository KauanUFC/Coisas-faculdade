//manipulacao do banco de dados;
const express = require('express');
//const mysql = require('mysql2/promise');
//const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

(async()=>{ 
    
    const db = require("./clienteSQL")
    //console.log("connection started");
//SELECT...
    //console.log("SELECT * FROM Clientes");
    //const userSelect = await db.selectData();
    //console.log(userSelect);

//${inputData} ${inputNome} ${inputTelefone} ${inputEmail}
//UPDATE... 
    //console.log("UPDATE * FROM Clientes");
    //const userUpdate = await db.updateData(
     //26,{nome: "Gabriela", 
     //telefone:"31233234", 
     //email:"sdiasdigmail.comm"});
    //console.log(userUpdate);
//insert

    //console.log("insert * FROM MySQL")
    //const userInsert = await db.insertData({
    //nome:"Lazaro",telefone: "13123123",email: "daisodmail.commmm"});
    //console.log(userInsert);

//delete

    //console.log("delete");
    const userDelete = await db.deleteData(2);
    console.log(userDelete);

   
})()

app.listen(PORT,()=>{
    console.log("running");
});