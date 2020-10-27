const fs = require('fs')
var parser = require('./Analizador/Gramatica');
var traductorJs = require('./Analizador/Traductor');
var Lexico = require('./Analizador/lexicoPy');
var Sintactico = require('./Analizador/sintacticoPy');
var Py = require('./AST/archivoPy');
const express = require('express');
const router = express.Router();
const cors = require('cors');
const pathJS = './Salida/SalidaJS.js';
const app = express();
app.use(cors());


//Settings
app.set('port', process.env.PORT || 3000);

//Middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


app.post('/Traducir/', function (req, res) {

    var entrada = req.body.texto;
    var resultadojs = "";
    var resultadopy = "";
  
    try {
      resultadojs = "";
      resultadojs = parser.parse(entrada);
      resultadojs += "\n\n";
      resultadojs += traductorJs.parse(entrada);
      }
      catch(e) {
        resultadojs = "El analizador no pudo recuperarse del error. No se puede traducir.";
      }

      try {
        var lexer = new Lexico(entrada);
        lexer.Iniciar();
        var syntax = new Sintactico(lexer.tokens,lexer.errores,lexer.cErrores);
        syntax.Start();
        var Salida = new Py();
        Salida.crearArchivo(syntax.traduccion);
        resultadopy = "";
        resultadopy = syntax.getErrores();
        resultadopy += "\n\n";
        resultadopy += syntax.traduccion;
      }
      catch(e) {
        resultadopy = "El analizador no pudo recuperarse del error. No se puede traducir.";
      }

      console.log("Entro una peticion REST desde fetch");
      res.send(JSON.stringify({ "jsconsole": resultadojs, "pyconsole" : resultadopy }));

});

app.get('/descargarJS/', function(req, res) { 
  var existe = false;

      try {
        if(fs.existsSync(pathJS)) {
            console.log("El archivo SalidaJS.js si existe");
            existe = true;
        } else {
            console.log('El archivo SalidaJS.js no existe');
            existe = false;
        }
    } catch (err) {
        console.error(err);
    }

  if (existe){
    existe = false;
    console.log("Si se ha generado ningun archivo JS.");
    res.download(__dirname + '/Salida/SalidaJS.js','Salida.js')
  } else {
    console.log("No se ha generado ningun archivo JS.");
    res.send("");
  }

});

app.get('/descargarPy/', function(req, res) { 
  var existe = false;

      try {
        if(fs.existsSync(pathJS)) {
            console.log("El archivo SalidaPy.py si existe");
            existe = true;
        } else {
            console.log('El archivo SalidaPy.py no existe');
            existe = false;
        }
    } catch (err) {
        console.error(err);
    }

  if (existe){
    existe = false;
    console.log("Si se ha generado ningun archivo Py.");
    res.download(__dirname + '/Salida/SalidaPy.py','Salida.Py')
  } else {
    console.log("No se ha generado ningun archivo Py.");
    res.send("");
  }

});


//Start server
app.listen(app.get('port'),() => {
    console.log('Server on port', app.get('port'));
});


