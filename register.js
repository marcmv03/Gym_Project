"use strict" ;
/**form's inputs values in a object; */
let input_reg = {
    nom : document.querySelector("#nom") ,
    email : document.querySelector("#email"),
    passw :document.querySelector("#passw") 
} ;
/** Clean all the inputs 
 * 
*/
function inicialitzar() { 
    for(input in input_reg) input.value = "" ;
}

function resposta_register() {
    console.log("hola") ;
    let  res = fetch(`/register`,{
        method: "POST" ,
        body: JSON.stringify(input_reg),
        headers:{
            'Content-Type': 'application/json; charset=utf-8'
          }
    }) ;
    res.then((response) => console.log(response)) ;
    res.catch(error => console.error('Error:', error)) ;
    console.log(res) ;
}
window.onload = inicialitzar();
let register = document.querySelector("#button_reg") ;
register.addEventListener("click",resposta_register()) ;