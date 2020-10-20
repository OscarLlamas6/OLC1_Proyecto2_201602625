class tokenPy{
    constructor(No, Fila, Columna, Tipo, Lexema, Token){
        this.No = No;
        this.Fila = Fila;
        this.Columna = Columna;
        this.Tipo = Tipo;
        this.Lexema = Lexema;
        this.Token = Token;
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

     getToken(){
        return this.Token;
     }

}


module.exports= tokenPy;