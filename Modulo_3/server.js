const express = require('express');
const nunjucks = require('nunjucks');

const server = express();

const cards = require("./data");

server.set("view engine", "njk")

server.use(express.static('public'))

nunjucks.configure("views", {
  express:server,
  autoescape: false
})

server.get("/", function(req, res) {
  const about = {
    avatar_url: "https://avatars0.githubusercontent.com/u/28929274?s=200&v=4",
    name: "RocketSeat",
    descricao: "Uma empresa de tecnologia que trabalha para levar conhecimentos sobre desenvolvimento web para desenvolvedores de todos os níveis",
    links: [
      { name: "Github", url: "https://github.com/Rocketseat"},
      { name: "Instagram", url: "https://www.instagram.com/rocketseat_oficial/?hl=pt-br"},
      { name: "Facebook", url: "https://www.facebook.com/rocketseat"}
    ]
  }
  return res.render('sobre', { about })
})

server.get("/sobre", function(req, res) {
  return res.render('sobre')
})

server.get("/conteudos", function(req, res) {
  return res.render('conteudos', { items: cards })
})

server.listen(5000, function() {
  console.log('server is runnig')
})
