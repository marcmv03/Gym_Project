const mysql = require('mysql2') ;
let user = 'pepito';
let conection = mysql.createConnection({
    host:'localhost',
    database:'db_users',
    user:'marc',
    password:''
}) ;
exports.conect = conection.connect((err)=>{
    if(err) console.log(err.message)
    else console.log("conexio exitosa");
});
 exports.augmentar_reps =(user,nom_ex,num_reps)=>{
     conection.query(`UPDATE exercicis e SET e.repeticions = e.repeticions +? WHERE 
     e.nom_ex = ? AND EXISTS( SELECT * FROM users u WHERE u.id = e.id_us AND u.name = ?)`,[num_reps,nom_ex,user],(err,result)=>{
    if(err) console.log(err.message) ;
    else if(result.affectedRows== 0) console.log(`l' usuari ${user} no te exercicis o no existeix`) ;
    else console.log("modifiacio exitosa") ;
})};
  exports.usuaris =conection.query("SELECT * FROM users",function(err,result){
    for(let i= 0 ; i < result.length;++i) console.log(result[i].name) ;
}
);
exports.exercicis = () =>{
     conection.query("SELECT * FROM exercicis",function(err,result){
    console.log(result) ;
  }
  )};

exports.alta=(user,gmail,passw)=>{
    conection.query(`INSERT INTO users(name,Email,password) VALUES(?,?,?)`,[user,gmail,passw],(err,result)=>{
        if(err) console.log(err.message);
        else console.log("alta exitosa");
    });
}

exports.tancar = () =>{conection.end()} ;