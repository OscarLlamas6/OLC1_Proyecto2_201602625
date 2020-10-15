class error{
    constructor(No, Fila, Columna, Tipo, Descripcion){
        this.No = No;
        this.Fila = Fila;
        this.Columna = Columna;
        this.Tipo = Tipo;
        this.Descripcion= Descripcion;
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

     getDescripcion(){
        return this.Descripcion;
     }

}


module.exports= error;