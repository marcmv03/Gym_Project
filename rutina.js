"use strict" ;
import { getCookie } from "./utils_front";
let rutina = [] ;
let user = getCookie("name") ;
console.log(user) ;
let add = document.querySelector("#Afegir") ;
let save = document.querySelector("#Guardar") ;
let Pes = document.querySelector("#Pes") ;
let Card = document.querySelector("#Cardio");

/** Retorna el valor de la clau especificada de la cookie */

function crear_rutina(){
    if(rutina.length == 0) window.alert("No s'ha afegit cap exercici") ;
    else {
        let obj_rutina = {
            exercicis:rutina 
        } ;
        obj_rutina.nom = prompt("Introdueix nom") ;

        console.log(obj_rutina);
        window.alert("Rutina guardada correctament") ;
        fetch(`/user/${user}/Rutina/crear`,{
            method: "POST" ,
            body: JSON.stringify(obj_rutina),
            headers:{
                'Content-Type': 'application/json; charset=utf-8'
              }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response));
        rutina = [] ;
    }
}
function logout() {
    location.href = "/" ;
}
function inicialitzar() {
    document.querySelector("#nom_ex").value  ="" ;
    document.querySelector("#repeticions").value  = "" ;
}
function mostrar_creador() {
    document.getElementById("exercicis").style.display = "block";
    document.getElementById("AGC").style.display = "inline";
}
function afegir_exercicis() {
      let nom_ex = document.querySelector("#nom_ex").value ;
     let reps = document.querySelector("#repeticions").value ;
     if(reps <= 0) window.alert("les repeticions han de ser majors que zero") ;
    console.log() ;
    rutina.push({
        nom_ex : nom_ex ,
        reps :  reps 
    }) ;
    console.log(rutina) ;
}
function escollir_tipus() {
    console.log(Pes.checked);
    if(Pes.checked) document.getElementById("label_reps").innerHTML = "Repeticons" ;
    else if(Card.checked) document.getElementById("label_reps").innerHTML = "Temps" ;
}
 async function getRutines() {
    let rutinesServer ; 
     rutinesServer = await fetch(`/user/${user}/Rutina/show`,{method: 'GET'}) ;
    let rutinesServerJSON = await rutinesServer.json() ;
    console.log(rutinesServerJSON) ;
    rutinesServer = JSON.parse(rutinesServerJSON) ;
    document.getElementById("crearRutina").innerHTML = `${rutinesServer.nom}`;
 }
    
        
inicialitzar() ;
let creator = document.getElementById("crearRutina") ;
let logout_button = document.getElementById("logout-button");
let mostrar_rutines = document.getElementById("veure_rutina") ;
console.log(mostrar_rutines);
creator.addEventListener("click",mostrar_creador) ;
add.addEventListener("click",afegir_exercicis) ;
save.addEventListener("click",crear_rutina) ;
Pes.addEventListener("click",escollir_tipus);
Card.addEventListener("click",escollir_tipus);
logout_button.addEventListener("click",logout) ;
mostrar_rutines.addEventListener("click",getRutines);
