var fs = require('fs');

class archivoPy{
    constructor(){
    }
    
    crearArchivo(contenido){
        fs.writeFile('./Salida/SalidaPy.py', contenido, (err) => {
        if (err) throw err;
        console.log('Traduccion a Python exitosa.');
        });
    }

}


module.exports= archivoPy;