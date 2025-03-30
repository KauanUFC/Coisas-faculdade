//manipulacao do banco de dados;

(async()=>{ const db = require("./reservaSQL")
    console.log("connection started");

//precisa definir melhor o banco de dados
//select
//nao é funcao mas variaveis que recebem funcoes;

//SELECT...
    //console.log("SELECT * FROM Mesas");
    const reservaSelect = await db.selectData();
    console.log(reservaSelect);
///////FAZER PARA A PARADA AQUI:::
//UPDATE... 
    //console.log("UPDATE * FROM Mesas");
    //const userUpdate = await db.updateData(
    // 1,{nome: "Pedro", 
    // telefone:"31233234", 
    // email:"sdiasdigmail.comm"});
    //console.log(userUpdate);
//insert

    //console.log("insert * FROM MySQL")
    //const userInsert = await db.insertData({
      //  nome:"Lazaro", 
        //telefone: "13123123",
        //email: "daisodmail.commmm"
    //});
    //console.log(userInsert);

//delete

    //console.log("delete");
    //const userDelete = await db.deleteData(2);
    //console.log(userDelete);

})();