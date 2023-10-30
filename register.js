import { getCookie } from "./utils_front"; ;
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
    for(let input in input_reg) input_reg[input].value = "" ;
}

 async function resposta_register() {
    let errorMsg,errorMsgJson ; 
    let result ;
    console.log("hola") ;
    let  res =  await fetch(`/register`,{
        method: "POST" ,
        body: JSON.stringify({
            nom : input_reg.nom.value ,
            email : input_reg.email.value,
            passw : input_reg.passw.value }) 
        ,
        headers:{
            'Content-Type': 'application/json; charset=utf-8'
          }
    }) ; 
    if(res.status  == 403) {
    errorMsgJson = await res.json() ;
    console.log(errorMsgJson);
    if(errorMsgJson) {
    alert(errorMsgJson) ;
    }
    else if(res.status == 302) {
        const user = getCookie("name") ;
        location.href = `/user/${user}/Rutina;`
    }
 }
}
console.log(input_reg);
window.onload = inicialitzar();
let register = document.querySelector("#button_reg") ;
register.addEventListener("click",resposta_register) ;