const mysql = require('mysql2') ;
let user = 'pepito';
const conection = mysql.createConnection({
    host:'localhost',
    database:'db_users',
    user:'marc',
    password:''
}) ;
conection.connect((err)=>{
    if(err) console.log(err.message)
    else console.log("conexio exitosa");
});
conection.query(`UPDATE exercicis e SET e.repeticions = e.repeticions +1 WHERE 
    EXISTS( SELECT * FROM users u WHERE u.id = e.id_us AND u.name = ?)`,[user],(err,result)=>{
    if(err) console.log(err.message) ;
    else if(result.affectedRows== 0) console.log(`l' usuari ${user} no te exercicis o no existeix`) ;
    else console.log("modifiacio exitosa") ;
});
conection.query("SELECT * FROM users",function(err,result){
    for(let i= 0 ; i < result.length;++i) console.log(result[i].name) ;
}
);

conection.end() ;