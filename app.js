 const  express =require('express') ;
 const bodyParser = require('body-parser');
 const path = require('path');
 const bycript = require('bcrypt');
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

 let user = "aaa" ;
 let session ;

 const missatges = {
  default_register: {
    estat: false,
    msg : "usuari o correu ja registrats ,tornant a pag principal"
  },
  default_login : {
    estat: false ,
    msg:"usuari o contrasenya incorrecta"
  }
 };

 function escapar_input(input) {
  result = {} ;
  for(let s in input ) {
   result[s] = encodeURIComponent(input[s]) ;
  }
    return result  ;
    }

app.get('/',function(req,answer){
  answer.sendFile(path.join(__dirname+'/index.html')) ;
  });
app.get('/register',(req,res)=>{
  res.sendFile(path.join(__dirname+'/register.html')) ;
});
app.get(`/user/${user}/Rutina`,(req,res)=>{
  res.sendFile(path.join(__dirname+'/rutina.html')) ;
})
app.post('/register', async (req,res)=>{
  const form = escapar_input(req.body) ;
  const passw =  await bycript.hash(form.passw,8);
  console.log(form) ;
  let reg = consultes.alta(form.nom,form.email,passw) ;
  reg.then((result) =>{
    if(result) {
      missatges.default_login.estat = true ;
    res.redirect(`/user/${user}/Rutina`);
    consultes.usuaris;
    session = req.session;
    session.nom_user = form.nom ;
    console.log(session);
    }
    else res.redirect("/") ;
  })
  }
);

app.post('/login', async (req,res) =>{
  console.log(req.body);
  const form = escapar_input(req.body) ;
  console.log(form) ;
  const passw =  await bycript.hash(form.passw,8);
  let val =  consultes.validate(form.nom,passw);
  val.then((result) => {
    if(result) {
      res.redirect(`/user/${user}/Rutina`) ;
      session = req.session;
      session.nom_user = form.nom ;
      console.log(session);
    }
    else  res.redirect("/") ;
  } ) ;
});

app.post(`/user/${user}/Rutina/crear`,(req,res) => {
  const rutina = {
    nom : req.body.nom ,
    nom_user : session.nom_user ,
    exercicis : req.body.exercicis,
    duracio : 50 

  };
  consultes.crear_rutina(rutina) ;
}) ;

//consultes.augmentar_reps('Marc','press_banca',3);
//consultes.exercicis() ;
consultes.tancar;

app.listen(config.PORT,(req,answer)=>{
  console.log("connected") ;
});

//consultes base de dades