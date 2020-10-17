var fs = require('fs');


class listaTokens{
    constructor(){
        this.tokens=[];
    }

    agregarToken(token){
        this.tokens.push(token);
    }

    ReporteTokens(){
        var contenido = `<!DOCTYPE html>
        <html>
        <body><center>
        <h1>REPORTE DE TOKENS</h1>
        <table border=1>
        <tr>
            <th>No.</th>
            <th>Fila</th> 
            <th>Columna</th>
            <th>Tipo</th>
            <th>Lexema</th>
        </tr>`+"\n";

        var concatena = "";

        this.tokens.forEach(element => {
            concatena += `<tr>
            <th>${element.getNo()}</th>
            <th>${element.getFila()}</th> 
            <th>${element.getColumna()}</th>
            <th>${element.getTipo()}</th>
            <th>${element.getLexema()}</th>
            </tr>` + "\n";
        });

        contenido += concatena;

        contenido += `</table>
        </center>
        </body>
        </html>`;

        fs.writeFile('./Reportes/Tokens.html', contenido, (err) => {
        if (err) throw err;
        console.log('Reporte tokens generado correctamente.');
        });

    }

    getTokens(){
        var concatena = "";
            this.tokens.forEach(element => {
                concatena += element.getLexema() + "\n";
            });
        return concatena;
    }

}


module.exports= listaTokens;