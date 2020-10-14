var fs = require('fs'); 
var parser = require('./Gramatica');
var arbol = require('../AST/recorridoArbol');


fs.readFile('./entrada.txt', (err, data) => {
    if (err) throw err;  
    var raiz = new arbol();
    parser.parse(data.toString());
    //console.log(raiz.recorrerDOT(parser.parse(data.toString())));
});