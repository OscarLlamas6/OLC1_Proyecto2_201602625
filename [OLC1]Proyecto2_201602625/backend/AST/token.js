class token{
    constructor(No, Fila, Columna, Tipo, Lexema){
        this.No = No;
        this.Fila = Fila;
        this.Columna = Columna;
        this.Tipo = Tipo;
        this.Lexema = Lexema;
    }
    getNo(){
       return this.No;
    }

    getFila(){
        return this.Fila;
     }

     getColumna(){
        return this.Columna;
     }

     getTipo(){
        return this.Tipo;
     }

     getLexema(){
        return this.Lexema;
     }

}


module.exports= token;