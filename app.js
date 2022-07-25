//configurações
const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const Redessociais = require("./models/Usuarios");
const Sequelize = require("sequelize");
const Interesses = require("./models/Usuarios");
const Usuarios = require("./models/Usuarios");

app.engine('handlebars', handlebars.engine({defaultLayout: ''}))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//rotas
 //Teste de template
 app.get("/template", function(req,res){
        
    res.render("layouts/main");

});

app.get("/form", function(req,res){
    
    res.render("formulario")

});

//REDIRECT DA TELA INICIAL

    //Cadastro de informações básicas
    app.get('/cadastrodeusuarios', function(req, res){
        res.render('cadastrodeusuarios');
    });
    
    app.post('/add-usuarios', function(req, res){
       Usuarios.create({
            id: req.body.id,
            nome:req.body.nome,
            email: req.body.email,
            matricula: req.body.matricula,
            curso: req.body.curso,
            senha: req.body.senha})
        Redessociais.create({
            whatsapp:req.body.whatsapp,
            discord: req.body.discord,
            instagram: req.body.instagram,
            twitter: req.body.twitter})
        Interesses.create({
            musicas:req.body.musicas,
            jogos: req.body.jogos,
            filmes: req.body.filmes,
            livros: req.body.livros,
            esportes: req.body.esportes,
            educação: req.body.educação
        }).then(function(){
            res.send("Cadastro realizado com sucesso.")
        }).catch(function(erro){
            res.send('Erro' + erro)
        }) 
    })

    //Esqueci minha senha
    app.get("/recuperar_senha", function(req,res){
        res.sendFile(__dirname + "/recuperar_senha.html")
    });

//Perfil próprio
app.get("/perfil", function(req,res){
    res.render("perfil")

});

//EDITAR PERFIL

    //Informações básicas
    app.get("/perfil/edit/i", function(req,res){

        res.sendFile(__dirname + "/perfil/info.html")

    });

    //Interesses
    app.get("/perfil/edit/s", function(req,res){

        res.sendFile(__dirname + "/perfil/socials.html")

    });

    //Troca senha
    app.get("/perfil/edit/p", function(req,res){
        res.sendFile(__dirname + "/perfil/senha.html")
    })

//FAZER
//PERFIL GLOBAL

//


app.get("/", function(req,res){
    res.render('index')
});

// server 

app.listen(8081);
