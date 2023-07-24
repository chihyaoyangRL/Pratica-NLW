//Configuração do Server
//importando plugin
const express = require('express');
const nunjucks = require('nunjucks');
const server = express();
const { pageLanding, pageStudy, pageGiveClasses, saveClasses, redirect_after, pageSucess } = require('./page')

//Configurar nunjucks
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})

//Configurar arquivos estáticos (css,scripts, imagens)
server
    .use(express.urlencoded({ extended: true }))
    //receber os dados do req.body
    .use(express.static("assets"))
    //rotas da aplicação
    .get("/", pageLanding)
    .get("/study", pageStudy)
    .get("/give-classes", pageGiveClasses)
    .post("/saveClasses", saveClasses)
    .post("/study", redirect_after)
    .get("/sucess", pageSucess)
    .listen(5500)