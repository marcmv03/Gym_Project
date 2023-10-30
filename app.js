 const  express =require('express') ;
 const bodyParser = require('body-parser');
 const path = require('path');
 const cors = require('cors');
 const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const config = require("./config.js") ;
 const oneDay = 1000 * 60 * 60 * 24;
 let app = express() ;
 app.use(express.urlencoded({extended:false}));
 app.use(express.static('.'));
 app.use(express.json());
 app.use(bodyParser.urlencoded({extended:true}));

 app.use(sessions({
  secret: config.SECRET_KEY,
  saveUninitialized:true ,
  cookie: { maxAge: oneDay },
  resave: false 
}));
app.use(cookieParser());


// Activamos CORS
app.use(cors());
 const consultes = require("./consultes.js")
 consultes.conect;

 let user = "";

 /**missatges a enviar pels difernets tipus d' error */
 const missatges_error = { 
  error_login : "usuari o contrasenya incorrecta",
  error_register:"usuari ja registrat",
  error_rutina:"ja hi ha una rutina amb el mateix nom"
 };

 function escapar_input(input) {
  result = {} ;
  for(let s in input ) {
   result[s] = encodeURIComponent(input[s]) ;
  }
    return result  ;
    }

app.get('/',function(req,res){
  req.session.destroy() ;
  res.sendFile(path.join(__dirname+'/index.html')) ;
  });
app.get('/register',(req,res)=>{
  req.session.destroy() ;
  res.sendFile(path.join(__dirname+'/register.html')) ;
});
app.get(`/user/:user/Rutina`,(req,res)=>{
  console.log(req.session);
  if(req.session.user)
    res.sendFile(path.join(__dirname+'/rutina.html')) ;
  else res.sendStatus(404) ;
})
app.post('/register', async (req,res)=>{
  const form = escapar_input(req.body) ;
  console.log(form) ;
  let reg = consultes.alta(form.nom,form.email,form.passw) ;
  reg.then((result) =>{
    if(result) {
    //consultes.usuaris;
    req.session.user = form.nom;
    console.log(req.session);
    user = form.nom ;
    res.status(302);
    }
    else {
      res.status(403).json(`info : ${missatges_error.error_register}`) ;
  }
})
reg.catch(() =>res.status(403).json(`info : ${missatges_error.error_register}`)) 
});

app.post('/login', async (req,res) =>{
  console.log(req.body);
  const form = escapar_input(req.body) ;
  console.log(form) ;
  let val =  consultes.validate(form.nom,form.passw)
    .then((result) => {
      if(result)  {
      console.log(result) ;
      req.session.user = form.nom;
      res.cookie(`name`,`${form.nom}`),{
        maxAge: 5000,
        // expires works the same as the maxAge
        expires: new Date('01 12 2021'),
        secure: true,
        httpOnly: true,
        sameSite: 'lax'
      } ;
      console.log(req.session);
      user = form.nom ;
      res.redirect(`/user/${user}/Rutina`) ;
    }
    else  {
        res.status(403).json(` info: ${missatges_error.error_login}`) ;
    }
    console.log(result) ;
  } ) 
  .catch((err) =>console.log(err)) ;
}
) ;

app.post(`/user/:user/Rutina/crear`,(req,res) => {
if(req.session.user) {
  const rutina = {
    nom : req.body.nom ,
    nom_user : req.session.user ,
    exercicis : req.body.exercicis,
    duracio : 50 

  };
  consultes.crear_rutina(rutina) ;
}
else res.sendStatus(404) ;
}) ;

app.get(`/user/:user/Rutina/show/:nom`,((req,res) => {
  const nom_rutina = req.params.nom ;
  const nom_user = req.params.user ;
  consultes.mostrar_rutina(nom_rutina,nom_user)
  .then((result) => res.json(result)) 
  .catch(() => res.sendStatus(403)) ;

}));  

app.get('/user/:user/Rutina/show',(req,res) => {
  const nom_user = req.params.user ;
  consultes.mostrar_rutina(nom_user)
  .then((result) =>{
    res.json(result) ;
  }) 
  .catch((err) => console.log(err)) ;
}) ;

app.delete(`/user/:user/Rutina/:nom`,((req,res) => {
  const nom_rutina = req.params.nom ;
  const nom_user = req.params.user ;
  consultes.eliminar_rutina(nom_rutina,nom_user) 
  .then((msg) => {
    res.sendStatus(200); console.log(msg)})
  .catch((msg)=> { res.sendStatus(404);console.log(msg)} )
})) ;

app.put('/user/:user/Rutina/',(req,res) => {}) ;

//consultes.augmentar_reps('Marc','press_banca',3);
//consultes.exercicis() ;
consultes.tancar;

app.listen(config.PORT,(req,answer)=>{
  console.log("connected") ;
});

//consultes base de dades