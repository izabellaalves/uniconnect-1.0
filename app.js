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

app.post("/validar-login", async(req, res) =>{
    const user= await Usuarios.findOne({where: {matricula: req.body.matricula}});
    if (user){
        const password_valid = await bcrypt.compare(req.body.senha, user.senha);
    if(password_valid){
        const token = jwt.sign({matricula: user.matricula}, process.env.JWT_KEY, {expiresIn: 5000});
        return res.status(200).send({
            message: 'Autenticado com sucesso',
            token: token 
        })
  }else{
    res.status(401).end();
  }}
  })

  function verifyJWT(req, res, next){
    console.log(req.headers)
    var token = req.body.token || req.query.token || req.headers[' x-access-token'];
    console.log('1')
    if (token) {
        console.log('2')
      jwt.verify(token, process.env.JWT_KEY, function(err, decoded) {      
        if (err) { 
          return res.json({ success: false, message: 'Failed to authenticate token.' });    
        } else {
          req.decoded = decoded;    
          next();
        }
      });
  
    } else {
      return res.status(403).send({ 
          success: false, 
          message: 'No token provided.' 
      });
    }}  

//PERFIL
app.get("/perfil" , verifyJWT, (req,res)=>{
    console.log(req.Usuariosmatricula + 'fez essa chamada');
    res.render('perfil')
})

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
