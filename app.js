//configurações
require("dotenv").config();

const path = require("path");
const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
//const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const sessions = require('express-session');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const Sequelize = require("sequelize");
const Usuarios = require("./models/Usuarios");
const alg = require("./public/js/alg.js");
const multer = require('multer');

const upload = multer({dest:'./src/temp'});
const fs = require("fs");

var http = require('http').Server(app);
// passa o http-server par ao socketio
var io = require('socket.io')(http);

app.engine('.hbs', handlebars.engine({ defaultLayout: 'main', extname: '.hbs', runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
}}));
app.set('view engine', '.hbs');
const hbs = handlebars.create({});
hbs.handlebars.registerHelper('if_eq', function(a, b, opts) {
    if (a == b) {   
        console.log("'" + a + "'\n'" + b + "'");
        return opts.fn(this);   
    } else {
        console.log("'" + a + "'\n'" + b + "'");
        return opts.inverse(this);
    }
});

//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());
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

    //REDIRECT DA TELA INICIAL

//Cadastro de informações básicas
    app.get('/cadastrodeusuarios', function(req, res){
        res.render('cadastrodeusuarios', {
            title: "Cadastrar usuário",
            style: "cadastro.css"
        });
    });
    
    app.post('/add-usuarios', upload.single('foto'), async (req, res)=>{
        if(req.file){
            var extension;
            switch(req.file.mimetype){
                case "image/png":
                    extension = ".png";
                    break;
                case "image/jpg":
                    extension = ".jpg";
                    break;
                case "image/jpeg":
                    extension = ".jpeg";
                    break;
            }

            await fs.promises.rename((path.join(__dirname,"src","temp", req.file.filename)), (path.join(__dirname,"public","imagens","uploaded", (req.body.matricula + extension))), (err) => {
                if(err) throw err;
            })

            fs.unlink(path.join("src", "temp", req.file.filename), (err) => {});
        }
        console.log(req.body);
        const hashSenha = await bcrypt.genSalt(10);
        var users = {
            nome: req.body.nome,
            email: req.body.email,
            matricula: req.body.matricula,
            curso: req.body.curso,
            foto: extension,
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
        res.status(201).redirect("login");//.json(create_user);
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

    app.post("/perfil/subm-edit", upload.single("foto"), async (req, res) => {
        session=req.session;
        if(session.userid){
            if(req.file){
                var extension;
                switch(req.file.mimetype){
                    case "image/png":
                        extension = ".png";
                        break;
                    case "image/jpg":
                        extension = ".jpg";
                        break;
                    case "image/jpeg":
                        extension = ".jpeg";
                        break;    
                }
                fs.unlink((path.join(__dirname, "public","imagens","uploaded", (session.userid + ".png"))), (err) => {});
                fs.unlink((path.join(__dirname, "public","imagens","uploaded", (session.userid + ".jpeg"))), (err) => {});
                fs.unlink((path.join(__dirname, "public","imagens","uploaded", (session.userid + ".jpg"))), (err) => {});
                
                await fs.promises.rename((path.join(__dirname,"src","temp", req.file.filename)), (path.join(__dirname,"public","imagens","uploaded", (session.userid + extension))), (err) => {
                    if(err) throw err;
                })

                fs.unlink(path.join("src", "temp", req.file.filename), (err) => {});
            }
            var users = {
                nome: req.body.nome,
                email: req.body.email,
                curso: req.body.curso,
                whatsapp: req.body.whatsapp,
                discord: req.body.discord,
                instagram: req.body.instagram,
                twitter: req.body.twitter,
                musicas: req.body.musicas,
                jogos: req.body.jogos,
                filmes: req.body.filmes,
                livros: req.body.livros,
                esportes: req.body.esportes,
                educação: req.body.educação
            };
            if(extension){
                users.foto = extension;
            }
            await Usuarios.update(users, {
                where: {matricula : session.userid}
            });
            res.status(200).redirect("/perfil");
        }else
            res.send('erro');
    });

    /*app.get("/perfil/trocarsenha", function(req,res){

        res.sendFile(__dirname + "/perfil/eu.html");

    });*/



//LOGIN
app.get("/login", function(req, res){
    res.render("login", {
        title: "Efetuar login",
        style: "login.css"
    });
});

app.post("/validar-login", multer().none(), async(req, res) =>{
    const user = await Usuarios.findOne({where: {matricula: req.body.matricula}});
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
                style : "perfil.css",
                title : "Perfil",
                nome : info.nome,
                curso : info.curso,
                foto : info.foto,
                matricula : info.matricula
            })
        });
    }else
        res.send('erro')
});

const upload = multer ({ dest: './uploads'});

//upload de fotos
app.post('/uploads', upload.single('foto'), (req, res) => {
    return res.send('ok')
})

//FEED
app.get("/feed", (req, res) =>{
    var orderedFeed = [];
    var tempFeed = {};
    var feed = {};
    session = req.session;
    if(session.userid){
        Usuarios.count().then((count) => {
            Usuarios.findByPk(session.userid).then((info) =>{
                Usuarios.findAll({
                    where: {matricula : { [Sequelize.Op.not] : session.userid}}
                }).then(async (conexao) =>{
                    let matzero = false;
                    for(var i = 0; i < count-1; i++){
                        if(conexao[i].matricula == 0){matzero = true; continue;}
                        let comp = alg.match(info, conexao[i]);
                        tempFeed[conexao[i].matricula] = comp;
                    }


                    var items = Object.keys(tempFeed).map(
                        (key) => { return [key, tempFeed[key]] });
                      
                    items.sort(
                        (first, second) => { return first[1] - second[1] }
                    );
                    
                    orderedFeed = items.map(
                        (e) => { return e[0] }
                    );
                    
                    for(var i = 0; i < count-1-matzero; i++){
                        feed[i] = await Usuarios.findByPk(orderedFeed[i]);
                        console.log("compatibilidade - " + tempFeed[orderedFeed[i]]);
                    }
                    
                    res.render("feed", {
                        feed : feed,
                        title:"Uniconnect",
                        style:"swiper-bundle.min.css", 
                        style2:"feed.css"
                    }); 
                })
            })
        })
        
    }else
        res.send("erro")

});

app.get("/usuario/:matricula", function(req, res){
    var matriculausuarioatual = req.params.matricula;
    //matriculausuarioatual = matriculausuarioatual.substring(1);
    Usuarios.findByPk(matriculausuarioatual).then(function(interesses){
        res.render('perfiloutros', {
            style: "perfiloutros.css",
            nome: interesses.nome,
            matricula : interesses.matricula,
            curso: interesses.curso,
            foto : interesses.foto,
            musicas : interesses.musicas,
            filmes : interesses.filmes,
            esportes : interesses.esportes,
            educação : interesses.educacao,
            jogos : interesses.jogos,
            livros: interesses.livros,
            whatsapp: interesses.whatsapp,
            discord: interesses.discord, 
            twitter: interesses.twitter,
            instagram: interesses.instagram

        })
        })
    })


// CHAT
app.get('/prechat', function(req, res){
    res.render('prechat', {
        style: "prechat.css"
    });
  });

  //CHAT LIVROS
app.get('/chatlivros', function(req, res){
    session=req.session
    if(session.userid){
    Usuarios.findByPk(session.userid).then(function(chat){
        res.render('chatlivros', {
            nome: chat.nome
        })
    })
}else
    res.send('erro')
});
  // sempre que o socketio receber uma conexão vai devoltar realizar o broadcast dela
  io.on('connection', function(socket){
    socket.on('chat livros', function(msg){
      io.emit('chat livros', msg);
  })
});

 //CHAT JOGOS
app.get('/chatjogos', function(req, res){
    session=req.session
    if(session.userid){
    Usuarios.findByPk(session.userid).then(function(chat){
        res.render('chatjogos', {
            nome: chat.nome
        })
    })
}else
    res.send('erro')
});
  // sempre que o socketio receber uma conexão vai devoltar realizar o broadcast dela
  io.on('connection', function(socket){
    socket.on('chat jogos', function(msg){
      io.emit('chat jogos', msg);
  })
});

 //CHAT ESPORTES
 app.get('/chatesportes', function(req, res){
    session=req.session
    if(session.userid){
    Usuarios.findByPk(session.userid).then(function(chat){
        res.render('chatesportes', {
            nome: chat.nome
        })
    })
}else
    res.send('erro')
});
  // sempre que o socketio receber uma conexão vai devoltar realizar o broadcast dela
  io.on('connection', function(socket){
    socket.on('chat esportes', function(msg){
      io.emit('chat esportes', msg);
  })
});

 //CHAT FILMES
 app.get('/chatfilmes', function(req, res){
    session=req.session
    if(session.userid){
    Usuarios.findByPk(session.userid).then(function(chat){
        res.render('chatfilmes', {
            nome: chat.nome
        })
    })
}else
    res.send('erro')
});
  // sempre que o socketio receber uma conexão vai devoltar realizar o broadcast dela
  io.on('connection', function(socket){
    socket.on('chat filmes', function(msg){
      io.emit('chat filmes', msg);
  })
});

 //CHAT MUSICAS
 app.get('/chatmusicas', function(req, res){
    session=req.session
    if(session.userid){
    Usuarios.findByPk(session.userid).then(function(chat){
        res.render('chatmusicas', {
            nome: chat.nome
        })
    })
}else
    res.send('erro')
});
  // sempre que o socketio receber uma conexão vai devoltar realizar o broadcast dela
  io.on('connection', function(socket){
    socket.on('chat musicas', function(msg){
      io.emit('chat musicas', msg);
  })
});

 // CHAT EDUCACAO
 app.get('/chateducacao', function(req, res){
    session=req.session
    if(session.userid){
    Usuarios.findByPk(session.userid).then(function(chat){
        res.render('chateducacao', {
            nome: chat.nome
        })
    })
}else
    res.send('erro')
});
  // sempre que o socketio receber uma conexão vai devoltar realizar o broadcast dela
  io.on('connection', function(socket){
    socket.on('chat educacao', function(msg){
      io.emit('chat educacao', msg);
  })
});



//TELA INICIAL
app.get("/", function(req,res){
    res.render("index", {
      title:"Uniconnect",
       style:"styles.css"
    });
});


// server 

http.listen(8081, function(){
    console.log('Servidor rodando em: http://localhost:8081');
  });