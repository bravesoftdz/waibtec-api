var mongoose   = require('mongoose'),
    Schema     = mongoose.Schema;

//Criando o Model
var ContatoSchema = new Schema({
  nome: { type: String, required: true, trim: true }
});

module.exports = mongoose.model('Contato', ContatoSchema);