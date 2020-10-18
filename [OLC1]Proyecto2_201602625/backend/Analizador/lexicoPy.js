const Token = require('../AST/token');
const Error = require('../AST/error');
const Lista = require('../AST/listaTokens');
const ListaE = require('../AST/listaErrores');


class Lexico{
    constructor(entrada){
        this.entrada = entrada;
        this.tokens = [];
        this.errores = [];
        this.estado = 0;
        this.errorLex = false;
        this.repetir = false;
        this.anular = false;
        this.fila = 0;
        this.columna = 0;
        this.cTokens = 0;
        this.cErrores = 0;
        this.lexemaact = "";     
    }

    Iniciar(){
        this.tokens = [];
        this.errores = [];
        this.errorLex = false;
        this.entrada += " \n";
        for (var i = 0, c=''; c = this.entrada.charAt(i); i++) { 
            console.log(c); 
        }

    }

}

module.exports= Lexico;