var fs = require('fs'); 
var parser = require('./Gramatica');
var traductorJs = require('./Traductor');
var Lexico = require('./lexicoPy');
var Sintactico = require('./sintacticoPy');
var Py = require('../AST/archivoPy');


fs.readFile('./entrada.txt', (err, data) => {
    if (err) throw err;  

    var lexer = new Lexico(data.toString());
    lexer.Iniciar();
    console.log(lexer.errorLex);
    console.log(lexer.tokens.length);
    console.log(lexer.errores.length);
    var syntax = new Sintactico(lexer.tokens,lexer.errores,lexer.cErrores);
    syntax.Start();
    console.log(syntax.errorSyntax);
    console.log(syntax.tokens.length);
    console.log(syntax.errores.length);
    var Salida = new Py();
    Salida.crearArchivo(syntax.traduccion);
    
});

function Analizador(data){

  try {
    console.log(parser.parse(data));
    return true;
  }
  catch(e) {
    return false;
  }
}