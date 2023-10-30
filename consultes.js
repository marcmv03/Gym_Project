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
exports.alta= async  (user,gmail,passw)=>{
     let passw_hashed =   await bycript.hash(passw,8);
      console.log(passw_hashed) ;
        return new Promise((resolve,reject) => {
        conection.execute(`INSERT INTO Usuari(nom,Email,password) VALUES(?,?,?)`, [user, gmail, passw_hashed], (err, result) => {
            if(err){
            console.log(err);
            if (err.sqlState == '23000') {
                resolve(false) ;
            }
            else  reject() ;
            }
            else {
                console.log("alta exitosa");
                resolve(true) ;
            }
    }) ;
});
}
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
//CRUD Rutina
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
exports.mostrar_rutina = async (nom,nom_user)  => {
    return new Promise((resolve,reject) =>{
        let query_rutina = "select * from  Rutina r  where r.nom = ? and r.nom_user = ?" ;
        conection.query(query_rutina,[nom,nom_user],(err,res) => {
            if(res.length != 0) resolve(JSON.stringify(res)) ;
            else reject() ;
        })  ;

    })
}
exports.mostrar_rutina = async(nom_user)  => {
    return new Promise((resolve,reject) =>{
        let query_rutina = `select r.nom,r.duracio ,count(e.nom_ex) as num_exs from Rutina r  left outer join Exercici e 
                            on e.nom_rutina  = r.nom  where r.nom_user  = ? 
                             group by r.nom
                            order by r.nom `;
       conection.query(query_rutina,[nom_user],(err,res) => {
                                if(!err) resolve(JSON.stringify(res)) ;
                                else reject(err) ;
                            })  ;
    })

};
exports.eliminar_rutina = async(nom,nom_user) => {
    return new Promise((resolve,reject) =>{
        let query_rutina = "delete  from  Rutina r  where r.nom = ? and r.nom_user = ?" ;
        conection.query(query_rutina,[nom,nom_user],(err,res) => {
            if(err) reject(err) ;
            else {
                console.log(res);
                if(res.affectedRows == 0)reject(`no existeix la rutina de nom ${nom} de l'usuari ${nom_user}`) ;
                else resolve(`rutina de nom ${nom} i d'usuari ${nom_user} eliminada correctament  `);
            }

        })  ;

    })
} ;


exports.tancar = () =>{conection.end()} ;