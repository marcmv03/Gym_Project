const mysql = require('mysql2') ;
const config = require("./config.js") ;
const { resolve } = require('path');
const { rejects } = require('assert');
const { error } = require('console');
const bycript = require('bcrypt');

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
     let passw_hashed =   await bycript.hash(passw,8);
      console.log(passw_hashed) ;
      conection.execute(`INSERT INTO Usuari(nom,Email,password) VALUES(?,?,?)`, [user, gmail, passw_hashed], (err, result) => {
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
exports.validate  =  (user,passw) => {
    //console.log(passw) ;
    return new Promise((resolve,reject) => {
        let query = 'SELECT * FROM Usuari u WHERE u.nom = ? ';
        conection.execute(query,[user], async (error, results,fields) => {
            if(error) reject(error) ;
            else {
            if(results.length != 0) {
               let  eq =  await bycript.compare(passw,results[0].password) ;
                console.log("mateixa contrasenya:",eq) ;
                console.log(results.length) ;
                console.log("consulta feta") ;
                resolve( eq ) ;
            }
            else resolve(false) ;
        }
        })
    } ) ;
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