const mysql = require('mysql2') ;
const config = require("./config.js") ;

let user = 'pepito';
let state = false  ;
let conection = mysql.createConnection({
    host: config.HOST,
    database: config.DATABASE,
    user: config.USER_DB,
    password: config.PASSW_DB
}) ;

exports.conect = conection.connect((err)=>{
    if(err) console.log(err.message)
    else console.log("conexio exitosa");
});
 
  
    exports.usuaris =conection.query("SELECT * FROM Usuari",function(err,result){
    for(let i= 0 ; i < result.length;++i) console.log(result[i].nom) ;
}
);
exports.exercicis = () =>{
     conection.query("SELECT * FROM exercicis",function(err,result){
    console.log(result) ;
  }
  )};
let b = false;
exports.alta= async  (user,gmail,passw)=>{
      conection.execute(`INSERT INTO Usuari(nom,Email,password) VALUES(?,?,?)`, [user, gmail, passw], (err, result) => {
        if (err) {
            console.log(err.message);
            b = false;
        }
        else {
            console.log("alta exitosa");
            b = true;
        }
    }) ;
    return b ;
};
let valid = false ;
exports.validate =   async (user,passw) => {
    let acabat = false ;
    let query = 'SELECT * FROM Usuari u WHERE u.nom = ? AND u.password = ? '
     valid = (user != undefined && passw != undefined) ;
       conection.execute(query,[user,passw], (err, results,fields) => {
               if (results.length == 0) valid = false;
               console.log(results);
               console.log(valid);

           });
     console.log(valid) ;
     return valid ;
} ;

function guardar_exercici(exercicis,nom_rutina,nom_user) {
    let query_exs = "insert into Exercici values(?,?,?)" ;
    for(let exs of exercicis) {
        conection.execute(query_exs,[exs.nom_ex,nom_rutina,nom_user],(err,res) => {
            if(err) console.log(`error exercici ${exs.nom_ex}`) ;
            else console.log("exercicis guardats correctament")
        })
    }
}

 exports.crear_rutina = function(rutina) {
    let query_rutina = "insert into Rutina(nom,nom_user,duracio) values(?,?,?)"
    conection.query(query_rutina,[rutina.nom,rutina.nom_user,rutina.duracio],(err,res) => {
        if(err) console.log(err) ;
        else {
            console.log(rutina) ;
            console.log("rutina guardada") ;
            nom_rutina = rutina.nom ;
            nom_user = rutina.nom_user ;
            console.log(rutina.exercicis) ;
            guardar_exercici(rutina.exercicis,nom_rutina,nom_user) ;
            } 
        }
    )
 } ;


exports.tancar = () =>{conection.end()} ;