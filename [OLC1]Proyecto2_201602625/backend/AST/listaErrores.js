var fs = require('fs');


class listaErrores{
    constructor(){
        this.errores=[];
    }

    limpiarArreglo(){
        this.errores = [];
    }

    agregarError(error){
        this.errores.push(error);
    }

    ReporteErrores(){
        var contenido = `<!DOCTYPE html>
        <html>
        <body><center>
        <h1>REPORTE DE ERRORES</h1>
        <table border=1>
        <tr>
            <th>No.</th>
            <th>Fila</th> 
            <th>Columna</th>
            <th>Tipo</th>
            <th>Descripcion</th>
        </tr>`+"\n";

        var concatena = "";

        this.errores.forEach(element => {
            concatena += `<tr>
            <th>${element.getNo()}</th>
            <th>${element.getFila()}</th> 
            <th>${element.getColumna()}</th>
            <th>${element.getTipo()}</th>
            <th>${element.getDescripcion()}</th>
            </tr>` + "\n";
        });

        contenido += concatena;

        contenido += `</table>
        </center>
        </body>
        </html>`;

        fs.writeFile('./Reportes/Errores.html', contenido, (err) => {
        if (err) throw err;
        console.log('Reporte errores generado correctamente.');
        });

    }

    getErrores(){
        var concatena = "";

            if (this.errores.length > 0) {
                this.errores.forEach(element => {
                    concatena += element.getNo() + ". " + "Fil: " + element.getFila() + " Col: " + element.getColumna() + " Tipo: " + element.getTipo() + " Desc. " + element.getDescripcion() + "\n";
                });
            } else {
                concatena = "No se encontraron errores lexicos ni sintacticos.";
            }
        this.limpiarArreglo();           
        return concatena;
    }

}


module.exports= listaErrores;