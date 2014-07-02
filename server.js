var express    = require('express'),
    app        = express(),
    bodyParser = require('body-parser'),
    mongoose   = require('mongoose'),
    Contato    = require('./models/contatos');

//Conexao com o mongodb
mongoose.connect('mongodb://localhost/waibapi', function(err){
  if(err){
    console.log('Erro ao conectar no mongodb: '+err);
  }
});

app.use(bodyParser());

var port = process.env.PORT || 8080;

// rotas da API
var router = express.Router();

router.get('/', function(req, res) {
	res.json({ message: 'Waib Tecnologias - API' });
});

router.route('/contatos')
  .get(function(req,res){
    Contato.find(function(err,rows){
      if(err){
        res.send(err);
      }
      res.json(rows);
    });
  })
  .post(function(req,res){
    var model  = new Contato();
    model.nome = req.body.nome;

    model.save(function(err){
      if(err){
        res.send(err);
      }
      res.json({message: 'Contato cadastrado com sucesso!'});
    })
  })

// registrando as rotas
app.use('/api', router);

// iniciando servidor
// =============================================================================
app.listen(port, function(){
  console.log('Servidor rodando na porta: ' + port);
});
