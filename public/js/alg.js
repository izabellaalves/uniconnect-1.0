const interesses = [
[
    //0 Musicas
    [0,2,3,2,1,4,5,1,4,4],  //0 Pop
    [ ,0,1,3,1,5,4,2,1,4],  //1 Rock
    [ , ,0,2,2,4,5,2,2,3],  //2 Rap
    [ , , ,0,3,2,3,2,4,2],  //3 Funk
    [ , , , ,0,4,4,1,2,3],  //4 Indie
    [ , , , , ,0,1,3,5,1],  //5 Axé
    [ , , , , , ,0,3,5,1],  //6 Pagode
    [ , , , , , , ,0,3,4],  //7 R&B
    [ , , , , , , , ,0,5],  //8 Metal
    [ , , , , , , , , ,0]   //9 Sertanejo
    
], [
    //1 Jogos
    [0,4,3,2,3,1,1,5,4,3],  //0 League of Legends
    [ ,0,3,4,1,5,4,3,2,2],  //1 Fall Guys
    [ , ,0,1,2,3,2,5,4,3],  //2 GTA
    [ , , ,0,1,3,1,5,4,3],  //3 Call of Duty
    [ , , , ,0,4,3,3,2,2],  //4 Fortnite
    [ , , , , ,0,2,4,4,4],  //5 DOTA
    [ , , , , , ,0,4,4,3],  //6 Valorant
    [ , , , , , , ,0,1,3],  //7 Undertale
    [ , , , , , , , ,0,3],  //8 Minecraft
    [ , , , , , , , , ,0]   //9 Rocket League
], [
    //2 Filmes
    [0,2,4,1,3,1,4,3,1,5],  //0 Ação e Aventura
    [ ,0,2,3,4,3,1,2,4,4],  //1 Drama
    [ , ,0,5,5,1,1,3,3,5],  //2 Comédia Romantica
    [ , , ,0,2,3,3,2,2,2],  //3 Ficção Cientifica
    [ , , , ,0,5,5,1,3,2],  //4 Terror
    [ , , , , ,0,2,3,1,3],  //5 Comedia
    [ , , , , , ,0,3,3,4],  //6 Romance
    [ , , , , , , ,0,3,3],  //7 Suspense
    [ , , , , , , , ,0,3],  //8 Animação
    [ , , , , , , , , ,0]   //9 Documentário
], [
    //3 Livros
    [0,4,5,2,5,1,3,2,3,4],  //0 Não Ficção
    [ ,0,3,1,3,3,1,1,1,2],  //1 Ficção Literária
    [ , ,0,3,2,5,4,3,1,2],  //2 Fantasia
    [ , , ,0,1,4,1,3,3,2],  //3 Suspense
    [ , , , ,0,4,2,3,1,1],  //4 Ficção Cientifica
    [ , , , , ,0,5,1,3,4],  //5 Poesia
    [ , , , , , ,0,5,3,2],  //6 Horror
    [ , , , , , , ,0,3,4],  //7 Romance
    [ , , , , , , , ,0,2],  //8 Ação e Aventura
    [ , , , , , , , , ,0]   //9 Distopia
], [
    //4 Esportes
    [0,1,1,4,4,3,2,2,5,4],  //0 Futebol
    [ ,0,1,4,4,2,3,3,3,3],  //1 Voleibol
    [ , ,0,3,2,3,2,2,3,4],  //2 Basquete
    [ , , ,0,2,5,2,2,5,2],  //3 Esportes Automobilisticos
    [ , , , ,0,5,1,1,3,4],  //4 MMA
    [ , , , , ,0,4,4,1,2],  //5 Tênis
    [ , , , , , ,0,0,5,5],  //6 Futebol Americano
    [ , , , , , , ,0,4,4],  //7 Rugby
    [ , , , , , , , ,0,1],  //8 Ginástica
    [ , , , , , , , , ,0]   //9 Atletismo
], [
    //5 Educação
    [0,2,1,1,2,4,3,3,4,4],  //0 Matemática
    [ ,0,1,4,3,3,2,1,4,1],  //1 Química
    [ , ,0,3,2,5,1,1,3,3],  //2 Física
    [ , , ,0,1,5,4,3,4,4],  //3 Programação
    [ , , , ,0,5,4,2,5,4],  //4 Eletrônica
    [ , , , , ,0,3,5,3,3],  //5 Filosofia
    [ , , , , , ,0,4,4,2],  //6 Astronomia
    [ , , , , , , ,0,4,5],  //7 Automotiva
    [ , , , , , , , ,0,4],  //8 Geografia
    [ , , , , , , , , ,0]   //9 Biologia
]
]

function indexilize(inter){
    var i = -1;
    switch(inter){
        case "Pop":
        case "League of Legends":
        case "Ação e Aventura":
        case "Não Ficção":
        case "Futebol":
        case "Matemática":
            i = 0;
            break;

        case "Rock":
        case "Fall Guys":
        case "Drama":
        case "Ficção Literária":
        case "Voleibol":
        case "Química":
            i = 1;
            break;

        case "Rap":
        case "GTA":
        case "Comédia Romantica":
        case "Fantasia":
        case "Basquete":
        case "Física":
            i = 2;
            break;

        case "Funk":
        case "Call of Duty":
        case "Ficção Cientifica":
        case "Suspense":
        case "Esportes Automobilisticos":
        case "Programação":
            i = 3;
            break;

        case "Indie":
        case "Fortnite":
        case "Terror":
        case "Ficção Cientifica":
        case "MMA":
        case "Eletrônica":
            i = 4;
            break;

        case "Axé":
        case "DOTA":
        case "Comedia":
        case "Poesia":
        case "Tênis":
        case "Filosofia":
            i = 5;
            break;

        case "Pagode":
        case "Valorant":
        case "Romance":
        case "Horror":
        case "Futebol Americano":
        case "Astronomia":
            i = 6;
            break;

        case "R&B":
        case "Undertale":
        case "Suspense":
        case "Romance":
        case "Rugby":
        case "Automotiva":
            i = 7;
            break;

        case "Metal":
        case "Minecraft":
        case "Animação":
        case "Ação e Aventura":
        case "Ginástica":
        case "Geografia":
            i = 8;
            break;

        case "Sertanejo":
        case "Rocket League":
        case "Documentário":
        case "Distopia":
        case "Atletismo":
        case "Biologia":
            i = 9;
            break;
    }

    return i;
}

function match(usuario, banco){
    var userInterests = [
        indexilize(usuario.musicas),
        indexilize(usuario.jogos), 
        indexilize(usuario.filmes),
        indexilize(usuario.livros),
        indexilize(usuario.esportes),
        indexilize(usuario.educacao)
    ];
    
    var bancoInterests = [
        indexilize(banco.musicas),
        indexilize(banco.jogos), 
        indexilize(banco.filmes),
        indexilize(banco.livros),
        indexilize(banco.esportes),
        indexilize(banco.educacao)
    ];

    var mtc = 0;
    for(var i = 0; i < 6; i++){
        if((userInterests[i] == -1) || (bancoInterests[i] == -1)){mtc += 3; continue;}
        mtc += (userInterests[i] <= bancoInterests[i])? interesses[i][userInterests[i]][bancoInterests[i]] : interesses[i][bancoInterests[i]][userInterests[i]];
    }

    return mtc;
}

module.exports = {
    match : match
}