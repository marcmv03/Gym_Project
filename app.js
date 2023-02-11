 const  express =require('express') ;
 let app = express() ;
 app.use(express.urlencoded({extended:false}));
 app.use(express.static('.'));
 let consultes = require('./consultes');
 const path = require('path');
 consultes.conect;
 const bycript = require('bcrypt');

app.get('/',function(req,answer){
  answer.sendFile(path.join(__dirname+'/index.html')) ;
});
app.get('/register',(req,res)=>{
  res.sendFile(path.join(__dirname+'/register.html')) ;
});

app.post('/register', async (req,res)=>{
  const user = req.body.nom ;
  const email = req.body.email;
  const passw =  await bycript.hash(req.body.passw,8);
  consultes.alta(user,email,passw) ;
  consultes.usuaris;
}
);

//consultes.augmentar_reps('Marc','press_banca',3);
//consultes.exercicis() ;
consultes.tancar;

app.listen(3000,(req,answer)=>{
  console.log("connected") ;
});

//consultes base de dades