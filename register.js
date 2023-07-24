//aqui es captaran les respostes i es processaran

let input_reg = {
    nom : document.querySelector("#nom"),
    email : document.querySelector("#nom"),
    passw :document.querySelector("#passw") 
} ;

function resposta_register() {
    fetch(`/register`,{
        method: "POST" ,
        body: JSON.stringify(input_reg),
        headers:{
            'Content-Type': 'application/json; charset=utf-8'
          }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
    rutina = [] ;
}

let register = document.querySelector("#button_reg") ;
register.addEventListener("click",resposta_register()) ;