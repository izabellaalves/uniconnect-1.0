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
const cookieParser = require('cookie-parser');
const sessions = require('express-session');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const Sequelize = require("sequelize");
const Usuarios = require("./models/Usuarios");

const PORT = process.env.PORT || 8081;

app.engine('.hbs', handlebars.engine({ defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');
const hbs = handlebars.create({});
hbs.handlebars.registerHelper('if_eq', function(a, b, opts) {
    if (a == b) {   
        return opts.fn(this);   
    } else {
        return opts.inverse(this);
    }
});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));

var session;

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
    
    app.post('/add-usuarios', async (req, res)=>{
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
        res.status(201).json(create_user);
    });
        

//Esqueci minha senha
    app.get("/recuperar_senha", function(req,res){
        res.sendFile(__dirname + "/recuperar_senha.html");
    });




//EDITAR PERFIL

    app.get("/perfil/edit", (req,res) =>{
        session=req.session;
        if(session.userid){
            Usuarios.findByPk(session.userid).then(function(info){
                res.render("edit",{
                    title: "Editar perfil",
                    style: "cadastro.css",
                    nome: info.nome,
                    email: info.email,
                    curso: info.curso,
                    whatsapp: info.whatsapp,
                    discord: info.discord,
                    instagram: info.instagram,
                    twitter: info.twitter,
                    musicas: info.musicas,
                    jogos: info.jogos,
                    filmes: info.filmes,
                    livros: info.livros,
                    esportes: info.esportes,
                    educacao: info.educação
                });
            });
        }else
            res.send('erro');
        });

    app.post("/perfil/subm-edit", async (req, res) => {
        session=req.session;
        if(session.userid){
            var users = {
                nome: req.body.nome,
                email: req.body.email,
                curso: req.body.curso,
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
            await Usuarios.update(users, {
                where: {matricula : session.userid}
            });
            res.status(200).redirect("/perfil");
        }else
            res.send('erro');
    });

    app.get("/perfil/trocarsenha", function(req,res){

        res.sendFile(__dirname + "/perfil/eu.html");

    });

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
        session=req.session;
        session.userid=req.body.matricula;
        console.log(req.session)
        res.redirect('/perfil')
    }
    else{
        res.send('Invalid username or password');
    }
}})

app.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/login');
});

//PERFIL
app.get('/perfil', function(req,res){
    session=req.session;
    if(session.userid){
        Usuarios.findByPk(session.userid).then(function(info){
            res.render('perfil',{
                style : "styles.css",
                title : "Perfil",
                nome : info.nome,
                curso : info.curso
            })
        });
    }else
        res.send('erro')
});

//TELA INICIAL
app.get("/", function(req,res){
    res.render("index", {
        title:"Uniconnect",
        style:"styles.css"
    });
});

//feed
app.get('/feed', function(req, res){
    res.render('feed', {
        style: "feed.css",
        //style: "swiper-blunde.min.css"
    })
})


// server 

app.listen(PORT, function(){
    console.log("Servidor rodando na porta " + PORT);
});
