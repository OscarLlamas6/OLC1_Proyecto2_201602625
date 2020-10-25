const Token = require('../AST/tokenPy');
const Error = require('../AST/error');



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
            this.columna++;
            this.anular = false;
            this.repetir = true;
            while (this.repetir){
               //console.log("Estado "+this.estado+" -> " +c);
                this.repetir = false;
                switch (this.estado){
                    case 0: 
                        if (this.isWhiteSpace(c)){
                            if (c=="\n"){
                                this.columna = 0;
                                this.fila++;
                            }
                        } else if (c == "{"){
                            this.lexemaact = c;
                            this.cTokens++;
                            this.tokens.push(new Token(this.cTokens, this.fila, this.columna, "Simbolo", this.lexemaact, "tk_la"));
                            this.lexemaact = "";
                        } else if (c == "}"){
                            this.lexemaact = c;
                            this.cTokens++;
                            this.tokens.push(new Token(this.cTokens, this.fila, this.columna, "Simbolo", this.lexemaact, "tk_lc"));
                            this.lexemaact = "";
                        } else if (c == "("){
                            this.lexemaact = c;
                            this.cTokens++;
                            this.tokens.push(new Token(this.cTokens, this.fila, this.columna, "Simbolo", this.lexemaact, "tk_pa"));
                            this.lexemaact = "";
                        } else if (c == ")"){
                            this.lexemaact = c;
                            this.cTokens++;
                            this.tokens.push(new Token(this.cTokens, this.fila, this.columna, "Simbolo", this.lexemaact, "tk_pc"));
                            this.lexemaact = "";
                        } else if (c == "["){
                            this.lexemaact = c;
                            this.cTokens++;
                            this.tokens.push(new Token(this.cTokens, this.fila, this.columna, "Simbolo", this.lexemaact, "tk_ca"));
                            this.lexemaact = "";
                        } else if (c == "]"){
                            this.lexemaact = c;
                            this.cTokens++;
                            this.tokens.push(new Token(this.cTokens, this.fila, this.columna, "Simbolo", this.lexemaact, "tk_cc"));
                            this.lexemaact = "";
                        } else if (c == ";"){
                            this.lexemaact = c;
                            this.cTokens++;
                            this.tokens.push(new Token(this.cTokens, this.fila, this.columna, "Simbolo", this.lexemaact, "tk_pyc"));
                            this.lexemaact = "";
                        } else if (c == ","){
                            this.lexemaact = c;
                            this.cTokens++;
                            this.tokens.push(new Token(this.cTokens, this.fila, this.columna, "Simbolo", this.lexemaact, "tk_coma"));
                            this.lexemaact = "";
                        } else if (c == "*"){
                            this.lexemaact = c;
                            this.cTokens++;
                            this.tokens.push(new Token(this.cTokens, this.fila, this.columna, "Operador aritmetico", this.lexemaact, "tk_mul"));
                            this.lexemaact = "";
                        } else if (c == "."){
                            this.lexemaact = c;
                            this.cTokens++;
                            this.tokens.push(new Token(this.cTokens, this.fila, this.columna, "Simbolo", this.lexemaact, "tk_punto"));
                            this.lexemaact = "";
                        } else if (c == "^"){
                            this.lexemaact = c;
                            this.cTokens++;
                            this.tokens.push(new Token(this.cTokens, this.fila, this.columna, "Operador logico", this.lexemaact, "tk_xor"));
                            this.lexemaact = "";
                        } else if (c == "\""){
                            this.lexemaact = c;
                            this.estado = 1; //cadenas
                        } else if (this.isDigit(c)){
                            this.lexemaact = c;
                            this.estado = 2; //numeros
                        } else if (this.isLetter(c)){
                            this.lexemaact = c;
                            this.estado = 3; //letras
                        } else if (c == "<"){
                            this.lexemaact = c;
                            this.estado = 4; //signo menor que
                        } else if (c == ">"){
                            this.lexemaact = c;
                            this.estado = 5; //signo mayor que
                        } else if (c == "+"){
                            this.lexemaact = c;
                            this.estado = 6; //signo mas
                        } else if (c == "-"){
                            this.lexemaact = c;
                            this.estado = 7; //signo menos
                        } else if (c == "/"){
                            this.lexemaact = c;
                            this.estado = 8; //signo div
                        } else if (c == "="){
                            this.lexemaact = c;
                            this.estado = 9; //signo igual
                        } else if (c == "!"){
                            this.lexemaact = c;
                            this.estado = 10; //signo not
                        } else if (c == "&"){
                            this.lexemaact = c;
                            this.estado = 11; //signo &
                        } else if (c == "|"){
                            this.lexemaact = c;
                            this.estado = 12; //signo |
                        } else {
                            this.lexemaact = c;
                            this.cErrores++;
                            this.errores.push(new Error(this.cErrores,this.fila,this.columna,"Lexico","Elemento lexico "+this.lexemaact+" no pertenece al lenguaje"));
                            this.lexemaact = "";
                            this.errorLex = true;
                        }
                        break;
                    case 1: //cadenas
                        if (c != "\""){
                            this.lexemaact+=c;
                            this.estado = 1;
                        } else {
                            this.lexemaact += c;
                            this.cTokens++;
                            this.tokens.push(new Token(this.cTokens, this.fila, this.columna, "Cadena", this.lexemaact, "tk_cadena"));
                            this.lexemaact = "";
                            this.estado = 0;
                        }
                        break;
                    case 2: //numeros
                        if (this.isDigit(c)){
                            this.lexemaact += c;
                            this.estado = 2;
                        } else if (c == "."){
                            this.lexemaact += c
                            this.estado = 13;
                        } else {
                            this.cTokens++;
                            this.tokens.push(new Token(this.cTokens, this.fila, this.columna, "Numerico", this.lexemaact, "tk_entero"));
                            this.lexemaact = "";
                            this.estado = 0;
                            this.repetir = true;
                        }
                        break;
                    case 3: // ids y palabras reservadas
                        if(this.isLetter(c) || this.isDigit(c) || c == "_"){
                            this.lexemaact += c;
                            this.estado = 3;
                        } else {
                            switch(this.lexemaact){
                                case "args":
                                    this.cTokens++;
                                    this.tokens.push(new Token(this.cTokens, this.fila, this.columna, "Palabra reservada", this.lexemaact, "tk_args"));
                                    this.lexemaact = "";
                                    break;
                                case "public":
                                    this.cTokens++;
                                    this.tokens.push(new Token(this.cTokens, this.fila, this.columna, "Palabra reservada", this.lexemaact, "tk_public"));
                                    this.lexemaact = "";
                                    break;
                                case "class":
                                    this.cTokens++;
                                    this.tokens.push(new Token(this.cTokens, this.fila, this.columna, "Palabra reservada", this.lexemaact, "tk_class"));
                                    this.lexemaact = "";
                                    break;
                                case "interface":
                                    this.cTokens++;
                                    this.tokens.push(new Token(this.cTokens, this.fila, this.columna, "Palabra reservada", this.lexemaact, "tk_interface"));
                                    this.lexemaact = "";
                                    break;
                                case "int":
                                    this.cTokens++;
                                    this.tokens.push(new Token(this.cTokens, this.fila, this.columna, "Palabra reservada", this.lexemaact, "tk_int"));
                                    this.lexemaact = "";
                                    break;
                                case "char":
                                    this.cTokens++;
                                    this.tokens.push(new Token(this.cTokens, this.fila, this.columna, "Palabra reservada", this.lexemaact, "tk_char"));
                                    this.lexemaact = "";
                                    break;
                                case "String":
                                    this.cTokens++;
                                    this.tokens.push(new Token(this.cTokens, this.fila, this.columna, "Palabra reservada", this.lexemaact, "tk_string"));
                                    this.lexemaact = "";
                                    break;
                                case "double":
                                    this.cTokens++;
                                    this.tokens.push(new Token(this.cTokens, this.fila, this.columna, "Palabra reservada", this.lexemaact, "tk_double"));
                                    this.lexemaact = "";
                                    break;
                                case "void":
                                    this.cTokens++;
                                    this.tokens.push(new Token(this.cTokens, this.fila, this.columna, "Palabra reservada", this.lexemaact, "tk_void"));
                                    this.lexemaact = "";
                                    break;
                                case "for":
                                    this.cTokens++;
                                    this.tokens.push(new Token(this.cTokens, this.fila, this.columna, "Palabra reservada", this.lexemaact, "tk_for"));
                                    this.lexemaact = "";
                                    break;
                                case "while":
                                    this.cTokens++;
                                    this.tokens.push(new Token(this.cTokens, this.fila, this.columna, "Palabra reservada", this.lexemaact, "tk_while"));
                                    this.lexemaact = "";
                                    break;
                                case "do":
                                    this.cTokens++;
                                    this.tokens.push(new Token(this.cTokens, this.fila, this.columna, "Palabra reservada", this.lexemaact, "tk_do"));
                                    this.lexemaact = "";
                                    break;
                                case "if":
                                    this.cTokens++;
                                    this.tokens.push(new Token(this.cTokens, this.fila, this.columna, "Palabra reservada", this.lexemaact, "tk_if"));
                                    this.lexemaact = "";
                                    break;
                                case "else":
                                    this.cTokens++;
                                    this.tokens.push(new Token(this.cTokens, this.fila, this.columna, "Palabra reservada", this.lexemaact, "tk_else"));
                                    this.lexemaact = "";
                                    break;
                                case "break":
                                    this.cTokens++;
                                    this.tokens.push(new Token(this.cTokens, this.fila, this.columna, "Palabra reservada", this.lexemaact, "tk_break"));
                                    this.lexemaact = "";
                                    break;
                                case "continue":
                                    this.cTokens++;
                                    this.tokens.push(new Token(this.cTokens, this.fila, this.columna, "Palabra reservada", this.lexemaact, "tk_continue"));
                                    this.lexemaact = "";
                                    break;
                                case "return":
                                    this.cTokens++;
                                    this.tokens.push(new Token(this.cTokens, this.fila, this.columna, "Palabra reservada", this.lexemaact, "tk_return"));
                                    this.lexemaact = "";
                                    break;
                                case "boolean":
                                    this.cTokens++;
                                    this.tokens.push(new Token(this.cTokens, this.fila, this.columna, "Palabra reservada", this.lexemaact, "tk_boolean"));
                                    this.lexemaact = "";
                                    break;
                                case "true":
                                    this.cTokens++;
                                    this.tokens.push(new Token(this.cTokens, this.fila, this.columna, "Palabra reservada", this.lexemaact, "tk_true"));
                                    this.lexemaact = "";
                                    break;
                                case "false":
                                    this.cTokens++;
                                    this.tokens.push(new Token(this.cTokens, this.fila, this.columna, "Palabra reservada", this.lexemaact, "tk_false"));
                                    this.lexemaact = "";
                                    break;
                                case "static":
                                    this.cTokens++;
                                    this.tokens.push(new Token(this.cTokens, this.fila, this.columna, "Palabra reservada", this.lexemaact, "tk_static"));
                                    this.lexemaact = "";
                                    break;
                                case "private":
                                    this.cTokens++;
                                    this.tokens.push(new Token(this.cTokens, this.fila, this.columna, "Palabra reservada", this.lexemaact, "tk_private"));
                                    this.lexemaact = "";
                                    break;
                                case "main":
                                    this.cTokens++;
                                    this.tokens.push(new Token(this.cTokens, this.fila, this.columna, "Palabra reservada", this.lexemaact, "tk_main"));
                                    this.lexemaact = "";
                                    break;
                                case "System":
                                    this.cTokens++;
                                    this.tokens.push(new Token(this.cTokens, this.fila, this.columna, "Palabra reservada", this.lexemaact, "tk_system"));
                                    this.lexemaact = "";
                                    break;
                                case "out":
                                    this.cTokens++;
                                    this.tokens.push(new Token(this.cTokens, this.fila, this.columna, "Palabra reservada", this.lexemaact, "tk_out"));
                                    this.lexemaact = "";
                                    break;
                                case "println":
                                    this.cTokens++;
                                    this.tokens.push(new Token(this.cTokens, this.fila, this.columna, "Palabra reservada", this.lexemaact, "tk_println"));
                                    this.lexemaact = "";
                                    break;
                                case "print":
                                    this.cTokens++;
                                    this.tokens.push(new Token(this.cTokens, this.fila, this.columna, "Palabra reservada", this.lexemaact, "tk_print"));
                                    this.lexemaact = "";
                                    break;
                                default:
                                    this.cTokens++;
                                    this.tokens.push(new Token(this.cTokens, this.fila, this.columna, "Identificador", this.lexemaact, "tk_id"));
                                    this.lexemaact = "";
                                    break;
                            }
                            this.estado = 0;
                            if (!this.anular) {
                                this.repetir = true;
                            } else if (this.anular) {
                                this.repetir = false;
                                this.anular = false;
                            }
                            this.lexemaact = "";
                        }
                        break;
                    case 4: //signo menor que
                        if (c == "="){
                            this.lexemaact += c;
                            this.cTokens++;
                            this.tokens.push(new Token(this.cTokens, this.fila, this.columna, "Operador relacional", this.lexemaact, "tk_menorigual"));
                            this.lexemaact = "";
                            this.estado = 0;
                            this.repetir = false;                           
                        } else {
                            this.cTokens++;
                            this.tokens.push(new Token(this.cTokens, this.fila, this.columna, "Operador relacional", this.lexemaact, "tk_menor"));
                            this.lexemaact = "";
                            this.estado = 0;
                            this.repetir = true;
                        }
                        break;
                    case 5: //signo mayor que
                        if (c == "="){
                            this.lexemaact += c;
                            this.cTokens++;
                            this.tokens.push(new Token(this.cTokens, this.fila, this.columna, "Operador relacional", this.lexemaact, "tk_mayorigual"));
                            this.lexemaact = "";
                            this.estado = 0;
                            this.repetir = false;                           
                        } else {
                            this.cTokens++;
                            this.tokens.push(new Token(this.cTokens, this.fila, this.columna, "Operador relacional", this.lexemaact, "tk_mayor"));
                            this.lexemaact = "";
                            this.estado = 0;
                            this.repetir = true;
                        }
                        break;
                    case 6: //signo mas
                        if (c == "+"){
                            this.lexemaact += c;
                            this.cTokens++;
                            this.tokens.push(new Token(this.cTokens, this.fila, this.columna, "Operador aritmetico", this.lexemaact, "tk_add"));
                            this.lexemaact = "";
                            this.estado = 0;
                            this.repetir = false;                           
                        } else {
                            this.cTokens++;
                            this.tokens.push(new Token(this.cTokens, this.fila, this.columna, "Operador aritmetico", this.lexemaact, "tk_mas"));
                            this.lexemaact = "";
                            this.estado = 0;
                            this.repetir = true;
                        }
                        break;
                    case 7: //signo menos
                        if (c == "-"){
                            this.lexemaact += c;
                            this.cTokens++;
                            this.tokens.push(new Token(this.cTokens, this.fila, this.columna, "Operador aritmetico", this.lexemaact, "tk_sus"));
                            this.lexemaact = "";
                            this.estado = 0;
                            this.repetir = false;                           
                        } else {
                            this.cTokens++;
                            this.tokens.push(new Token(this.cTokens, this.fila, this.columna, "Operador aritmetico", this.lexemaact, "tk_menos"));
                            this.lexemaact = "";
                            this.estado = 0;
                            this.repetir = true;
                        }
                        break;
                    case 8: //comentarios y simbolo division
                        if (c == "/"){
                            this.lexemaact += c;
                            this.estado = 15;
                        } else if (c == "*"){
                            this.lexemaact += c
                            this.estado = 16;
                        } else {
                            this.cTokens++;
                            this.tokens.push(new Token(this.cTokens, this.fila, this.columna, "Operador aritmetico", this.lexemaact, "tk_div"));
                            this.lexemaact = "";
                            this.estado = 0;
                            this.repetir = true;
                        }
                        break;
                    case 9: //signo igual
                        if (c == "="){
                            this.lexemaact += c;
                            this.cTokens++;
                            this.tokens.push(new Token(this.cTokens, this.fila, this.columna, "Operador relacional", this.lexemaact, "tk_igualigual"));
                            this.lexemaact = "";
                            this.estado = 0;
                            this.repetir = false;                           
                        } else {
                            this.cTokens++;
                            this.tokens.push(new Token(this.cTokens, this.fila, this.columna, "Simbolo", this.lexemaact, "tk_igual"));
                            this.lexemaact = "";
                            this.estado = 0;
                            this.repetir = true;
                        }
                        break;
                    case 10: //signo !
                        if (c == "="){
                            this.lexemaact += c;
                            this.cTokens++;
                            this.tokens.push(new Token(this.cTokens, this.fila, this.columna, "Operador relacional", this.lexemaact, "tk_noigual"));
                            this.lexemaact = "";
                            this.estado = 0;
                            this.repetir = false;                           
                        } else {
                            this.cTokens++;
                            this.tokens.push(new Token(this.cTokens, this.fila, this.columna, "Simbolo", this.lexemaact, "tk_not"));
                            this.lexemaact = "";
                            this.estado = 0;
                            this.repetir = true;
                        }
                        break;
                    case 11: //signo &
                        if (c == "&"){
                            this.lexemaact += c;
                            this.cTokens++;
                            this.tokens.push(new Token(this.cTokens, this.fila, this.columna, "Operador logico", this.lexemaact, "tk_and"));
                            this.lexemaact = "";
                            this.estado = 0;
                            this.repetir = false;                           
                        } else {
                            this.cErrores++;
                            this.errores.push(new Error(this.cErrores,this.fila,this.columna,"Lexico","Elemento lexico "+this.lexemaact+" no pertenece al lenguaje"));
                            this.lexemaact = "";
                            this.errorLex = true;
                            this.estado = 0;
                            this.repetir = true;
                        }
                        break;
                    case 12: //signo |
                        if (c == "|"){
                            this.lexemaact += c;
                            this.cTokens++;
                            this.tokens.push(new Token(this.cTokens, this.fila, this.columna, "Operador logico", this.lexemaact, "tk_or"));
                            this.lexemaact = "";
                            this.estado = 0;
                            this.repetir = false;                           
                        } else {
                            this.cErrores++;
                            this.errores.push(new Error(this.cErrores,this.fila,this.columna,"Lexico","Elemento lexico "+this.lexemaact+" no pertenece al lenguaje"));
                            this.lexemaact = "";
                            this.errorLex = true;
                            this.estado = 0;
                            this.repetir = true;
                        }
                        break;
                    case 13: //numeros decimales
                        if(isDigit(c)){
                            this.lexemaact += c;
                            this.estado = 14;
                        } else {
                            this.cErrores++;
                            this.errores.push(new Error(this.cErrores,this.fila,this.columna,"Lexico","Elemento lexico "+this.lexemaact+" no pertenece al lenguaje"));
                            this.lexemaact = "";
                            this.errorLex = true;
                            this.estado = 0;
                            this.repetir = true;
                        }
                        break;
                    case 14: //estado aceptacion numeros decimales
                        if(isDigit(c)){
                            this.lexemaact += c;
                            this.estado = 14;
                        } else {
                            this.cTokens++;
                            this.tokens.push(new Token(this.cTokens, this.fila, this.columna, "Numerico", this.lexemaact, "tk_decimal"));
                            this.lexemaact = "";
                            this.estado = 0;
                            this.repetir = true;
                        }
                        break;
                    case 15: //comentarios unilinea
                        if(c != "\n"){
                            this.lexemaact += c;
                            this.estado = 15;
                        } else {
                            this.lexemaact += c;
                            this.cTokens++;
                            this.tokens.push(new Token(this.cTokens, this.fila, this.columna, "Comentario", this.lexemaact, "tk_commentu"));
                            this.columna = 0;
                            this.fila++;
                            this.lexemaact = "";
                            this.estado = 0;
                        }
                        break;
                    case 16: //comentarios multi-linea
                        if(c != "*"){
                            if(c == "\n"){
                                this.columna = 0;
                                this.fila++;
                            }
                            this.lexemaact += c;
                            this.estado = 16;
                        } else {
                            this.lexemaact += c;
                            this.estado = 17;
                        }
                    case 17: // estado aceptacion comentarios multi-linea o retorno a esta 16
                        if (c != "/"){
                            this.lexemaact += c;
                            this.estado = 16;
                        } else {
                            this.lexemaact += c;
                            this.cTokens++;
                            this.tokens.push(new Token(this.cTokens, this.fila, this.columna, "Comentario", this.lexemaact, "tk_commentm"));
                            this.lexemaact = "";
                            this.estado = 0;
                        }                      
                        break;
                    default:
                        console.log("hola");
                        break;
                    }
            } 
        }

        this.cTokens++;
        this.tokens.push(new Token(this.cTokens, this.fila, this.columna, "Fin de cadena", "#", "tk_#"))

    }

    isWhiteSpace(s){

        if(s == " " || s == "\t" || s == "\n" || s == "\f" || s == "\r" || s == "   "){
            return true;
        }
        return false; 
    }

    isDigit(n) { return /^[0-9]$/.test(n); } 

    isLetter(n) { return /^[a-zA-Z]$/.test(n); }

    isNumeric(num){
        return !isNaN(num);
      }

}

module.exports = Lexico;