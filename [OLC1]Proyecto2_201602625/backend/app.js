const fs = require('fs')
var parser = require('./Analizador/Gramatica');
var traductorJs = require('./Analizador/Traductor');
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
    var entrada = req.body.text;
    var resultadojs = "";
    
    try {
        resultadojs = "";
        resultadojs = parser.parse(entrada);
        traductorJs.parse(entrada);
      }
      catch(e) {
        resultadojs = "El analizador no pudo recuperarse del error. No se puede traducir.";
      }


      console.log("Entro una peticion REST");
      res.send(resultadojs);

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


//Start server
app.listen(app.get('port'),() => {
    console.log('Server on port', app.get('port'));
});


