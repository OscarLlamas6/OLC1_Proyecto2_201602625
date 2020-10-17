var fs = require('fs'); 
var parser = require('./Gramatica');
var traductorJs = require('./Traductor');


fs.readFile('./entrada.txt', (err, data) => {
    if (err) throw err;  

    if( Analizador(data.toString())) {
      traductorJs.parse(data.toString());
    } else {
        console.log("El analizador no pudo recuperarse del error. No se puede traducir.");
      }
    
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