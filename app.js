//configurações

/*if(process.env.NODE_ENV !== "production"){
//    require("dotenv").config();
}*/

require("dotenv").config();

const path = require("path");
const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const Sequelize = require("sequelize");
const Usuarios = require("./models/Usuarios");



const PORT = process.env.PORT || 8081;

app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//ROTAS

    //Páginas estáticas e dir public
    app.use(express.static(path.join(__dirname, "public")));

    //Teste de template
    app.get("/template", function(req,res){
        
        res.render("layouts/main", {
            title: "Template",
            style: "styles.css"
        });

    });

    app.get("/form", function(req,res){
    
        res.render("formulario");

    });

    //REDIRECT DA TELA INICIAL

//Cadastro de informações básicas
    app.get('/cadastrodeusuarios', function(req, res){
        res.render('cadastrodeusuarios', {
            title: "Cadastrar usuário",
            style: "cadastro.css"
        });
    });
    
    app.post('/add-usuarios', async (req, res, next)=>{
        const hashSenha = await bcrypt.genSalt(10);
        var users = {
            nome: req.body.nome,
            email: req.body.email,
            matricula: req.body.matricula,
            curso: req.body.curso,
            senha: await bcrypt.hash(req.body.senha, hashSenha),
            whatsapp: req.body.whatsapp,
            discord: req.body.discord,
            instagram: req.body.instagram,
            twitter: req.body.twitter,
            musicas:req.body.musicas,
            jogos: req.body.jogos,
            filmes: req.body.filmes,
            livros: req.body.livros,
            esportes: req.body.esportes,
            educação: req.body.educação
            };
            create_user = await Usuarios.create(users);
            res.status(201).json(create_user)
            });
        

//Esqueci minha senha
    app.get("/recuperar_senha", function(req,res){
        res.sendFile(__dirname + "/recuperar_senha.html")
    });




//EDITAR PERFIL

    //Informações básicas
    app.get("/perfil/edit/e", function(req,res){

        res.sendFile(__dirname + "/perfil/eu.html");

    });

    //Redes Sociais
    app.get("/perfil/edit/s", function(req,res){

        res.sendFile(__dirname + "/perfil/sociais.html");

    });

    //Interesses
    app.get("/perfil/edit/i", function(req,res){

        res.sendFile(__dirname + "/perfil/interesses.html");

    });

    //Troca senha
    app.get("/perfil/edit/p", function(req,res){
        res.sendFile(__dirname + "/perfil/senha.html");
    })


//LOGIN
app.get("/login", function(req, res){
    res.render("login", {
        title: "Efetuar login",
        style: "login.css"
    });
});

app.post("/validar-login", async(req, res, next) =>{
    const user= await Usuarios.findOne({where: {matricula: req.body.matricula}});
    if (user){
        const password_valid = await bcrypt.compare(req.body.senha, user.senha);
    if(password_valid){
        const token = jwt.sign({ 
            "matricula" : user.matricula,
            "email" : user.email,
            "nome":user.nome },process.env.JWT_KEY);
        res.redirect('/perfil')
    } else {
      res.status(400).json({ error : "Password Incorrect" });
    }
  }else{
    res.status(404).json({ error : "User does not exist" });
  }
  })

//PERFIL
  app.get("/perfil" , async(req,res,next)=>{
    try {
      let token = req.headers['authorization'].split(" ")[1];
      let decoded = jwt.verify(token,process.env.JWT_KEY);
      req.user = decoded;
      next();
    } catch(err){
      res.render('perfil');
    }
    },
    async(req,res,next)=>{
      let user = await Usuarios.findOne({where:{id : req.user.id},attributes:{exclude:["password"]}});
      if(user === null){
        res.status(404).json({'msg':"User not found"});
      }
      res.status(200).json(user);
   }); 

//TELA INICIAL
app.get("/", function(req,res){
    res.render("index", {
        title:"Uniconnect",
        style:"styles.css"
    });
});

// server 

app.listen(PORT, function(){
    console.log("Servidor rodando na porta " + PORT);
});
