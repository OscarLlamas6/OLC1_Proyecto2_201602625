var fs = require('fs');

class archivoJS{
    constructor(){
    }
    
    crearArchivo(contenido){
        fs.writeFile('./Salida/SalidaJS.js', contenido, (err) => {
        if (err) throw err;
        console.log('Traduccion a Js exitosa.');
        });
    }

}


module.exports= archivoJS;