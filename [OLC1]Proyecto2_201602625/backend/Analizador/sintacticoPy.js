const Token = require('../AST/tokenPy');
const Error = require('../AST/error');
var fs = require('fs');

class Sintactico{
    constructor(tokens, errores, cErrores){
        this.tokens = [];
        this.tokens = tokens;
        this.errores = errores;
        this.cErrores = cErrores;
        this.tokenAux = null;
        this.Numtoken = -1;
        this.traduccion = ``;
        this.cadenaAux = ``;
        this.tab = 0;
        this.errorSyntax = false;
        this.salto = 1;
    }

    Start(){

        this.traduccion = "";
        this.salto = 1;
        if (this.Numtoken < ((Object.keys(this.tokens).length) -1) ) {
            
            this.tokenAux = this.SiguienteToken();
            this.Iniciar();
        }    
    }

    Iniciar(){
        this.ListaDeclarariones();    
    }

    ListaDeclarariones(){
        this.DPrograma();
    }

    DPrograma(){
        
        if (this.TokenCorrecto(this.tokenAux,"tk_public") || this.TokenCorrecto(this.tokenAux,"tk_private")){

            this.tokenAux = this.SiguienteToken();
            if (this.TokenCorrecto(this.tokenAux,"tk_class")){

                this.traduccion += this.Tabulacion(this.tab);
                this.traduccion += "class "

                this.tokenAux = this.SiguienteToken();
                if (this.TokenCorrecto(this.tokenAux,"tk_id")){

                    this.traduccion += this.tokenAux.getLexema();

                    this.tokenAux = this.SiguienteToken();
                    if (this.TokenCorrecto(this.tokenAux,"tk_la")){

                        this.traduccion += ":\n";
                        this.tab++;

                        this.tokenAux = this.SiguienteToken();
                        this.ListaDeclarariones();                      

                        if (this.TokenCorrecto(this.tokenAux,"tk_lc")){
                            
                            this.tab--;

                            this.tokenAux = this.SiguienteToken();
                            this.ListaDeclarariones();

                        } else {
                            this.cErrores++;
                            this.errorSyntax = true;            
                            this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba }"));
                        }   


                    } else {
                        this.cErrores++;
                            this.errorSyntax = true;            
                        this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba {"));
                    }

                } else {
                    this.cErrores++;
                            this.errorSyntax = true;            
                    this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba un id"));
                }

            } else if (this.TokenCorrecto(this.tokenAux,"tk_interface")) {

                this.traduccion += this.Tabulacion(this.tab);
                this.traduccion += "class "

                this.tokenAux = this.SiguienteToken();
                if (this.TokenCorrecto(this.tokenAux,"tk_id")){

                    this.traduccion += this.tokenAux.getLexema();

                    this.tokenAux = this.SiguienteToken();
                    if (this.TokenCorrecto(this.tokenAux,"tk_la")){

                        this.traduccion += ":\n";
                        this.tab++;

                        this.tokenAux = this.SiguienteToken();
                        this.LInterfaz();
                        if (this.TokenCorrecto(this.tokenAux,"tk_lc")){

                            this.traduccion += `\n\n`;
                            this.tab--;

                            this.tokenAux = this.SiguienteToken();
                            this.ListaDeclarariones();

                        } else {
                            this.cErrores++;
                            this.errorSyntax = true;            
                            this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba }"));
                        } 


                    } else {
                        this.cErrores++;
                            this.errorSyntax = true;            
                        this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba {"));
                    }  


                } else {
                    this.cErrores++;
                            this.errorSyntax = true;            
                    this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba un id"));
                }  


            } else if (this.TokenCorrecto(this.tokenAux,"tk_static")) {

                this.tokenAux = this.SiguienteToken();
                if (this.TokenCorrecto(this.tokenAux,"tk_void")){
                    
                    this.tokenAux = this.SiguienteToken();
                    if (this.TokenCorrecto(this.tokenAux,"tk_main")){

                        this.tokenAux = this.SiguienteToken();
                        if (this.TokenCorrecto(this.tokenAux,"tk_pa")){

                            this.tokenAux = this.SiguienteToken();
                            if (this.TokenCorrecto(this.tokenAux,"tk_string")){

                                this.tokenAux = this.SiguienteToken();
                                if (this.TokenCorrecto(this.tokenAux,"tk_ca")){
    
                                    this.tokenAux = this.SiguienteToken();
                                    if (this.TokenCorrecto(this.tokenAux,"tk_cc")){
        
                                        this.tokenAux = this.SiguienteToken();
                                        if (this.TokenCorrecto(this.tokenAux,"tk_args")){

                                            this.tokenAux = this.SiguienteToken();
                                            if (this.TokenCorrecto(this.tokenAux,"tk_pc")){

                                                this.tokenAux = this.SiguienteToken();
                                                if (this.TokenCorrecto(this.tokenAux,"tk_la")){

                                                    this.traduccion += this.Tabulacion(this.tab);
                                                    this.traduccion += "def main():\n";
                                                    this.tab++;

                                                    this.tokenAux = this.SiguienteToken();
                                                    this.Instrucciones();
                                                    if (this.TokenCorrecto(this.tokenAux,"tk_lc")){

                                                        this.tab--;
                                                        this.traduccion += this.Tabulacion(this.tab);
                                                        this.traduccion += `if __name__ = "__main__":\n`;
                                                        this.tab++;
                                                        this.traduccion += this.Tabulacion(this.tab) + `main()\n\n`;
                                                        this.tab--;
                            
                                                        this.tokenAux = this.SiguienteToken();
                                                        this.ListaDeclarariones();
                            
                                                    } else {
                                                        this.cErrores++;
                                                        this.errorSyntax = true;            
                                                        this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba }"));
                                                    }   
                    
                                                    
                                                } else {
                                                    this.cErrores++;
                                                    this.errorSyntax = true;            
                                                    this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba {"));
                                                } 
                
                                                
                                            } else {
                                                this.cErrores++;
                                                this.errorSyntax = true;            
                                                this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba )"));
                                            } 
            
                                            
                                        } else {
                                            this.cErrores++;
                                            this.errorSyntax = true;            
                                            this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba la palabra reservada args"));
                                        } 
                                        
                                    } else {
                                        this.cErrores++;
                                        this.errorSyntax = true;            
                                        this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba ]"));
                                    } 
                                    
                                } else {
                                    this.cErrores++;
                                    this.errorSyntax = true;            
                                    this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba ["));
                                } 

                                
                            } else {
                                this.cErrores++;
                                this.errorSyntax = true;            
                                this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba la palabra reservada String"));
                            } 

                            
                        } else {
                            this.cErrores++;
                            this.errorSyntax = true;            
                            this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba ("));
                        } 
                        
                    } else {
                        this.cErrores++;
                        this.errorSyntax = true;            
                        this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba la palabra reservada main"));
                    } 
                    
                } else {
                    this.cErrores++;
                    this.errorSyntax = true;            
                    this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba la palabra reservada void"));
                } 

            } else if (this.TokenCorrecto(this.tokenAux,"tk_void") || this.TokenCorrecto(this.tokenAux,"tk_int") || this.TokenCorrecto(this.tokenAux,"tk_double") || this.TokenCorrecto(this.tokenAux,"tk_string") || this.TokenCorrecto(this.tokenAux,"tk_boolean") || this.TokenCorrecto(this.tokenAux,"tk_char")){

                this.traduccion += this.Tabulacion(this.tab);
                this.traduccion += 'def ';

                this.tokenAux = this.SiguienteToken();
                if (this.TokenCorrecto(this.tokenAux,"tk_id")){

                    this.traduccion += this.tokenAux.getLexema();

                    this.tokenAux = this.SiguienteToken();
                    if (this.TokenCorrecto(this.tokenAux,"tk_pa")){

                        this.traduccion += "(";

                        this.tokenAux = this.SiguienteToken();
                        this.Parametros();
                        if (this.TokenCorrecto(this.tokenAux,"tk_pc")){

                            this.traduccion += ")";

                            this.tokenAux = this.SiguienteToken();
                            if (this.TokenCorrecto(this.tokenAux,"tk_la")){

                                this.traduccion += ":\n";
                                this.tab++;

                                this.tokenAux = this.SiguienteToken();
                                this.Instrucciones();
                                if (this.TokenCorrecto(this.tokenAux,"tk_lc")){

                                    this.traduccion += `\n\n`;
                                    this.tab--;
        
                                    this.tokenAux = this.SiguienteToken();
                                    this.ListaDeclarariones();
        
                                } else {
                                    this.cErrores++;
                            this.errorSyntax = true;            
                                    this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba }"));
                                }   
    
    
                            } else {
                                this.cErrores++;
                            this.errorSyntax = true;            
                                this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba {"));
                            }   


                        } else {
                            this.cErrores++;
                            this.errorSyntax = true;            
                            this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba )"));
                        }   


                    } else {
                        this.cErrores++;
                            this.errorSyntax = true;            
                        this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba ("));
                    }   


                } else {
                    this.cErrores++;
                            this.errorSyntax = true;            
                    this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba un id"));
                }   

            } else {
                this.cErrores++;
                            this.errorSyntax = true;            
                this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba class, interface, static, void, etc."));
            }


        } else if (this.TokenCorrecto(this.tokenAux,"tk_if")){

            this.traduccion += "\n";
            this.traduccion += this.Tabulacion(this.tab);
            this.traduccion += "if";

            this.tokenAux = this.SiguienteToken();
            if (this.TokenCorrecto(this.tokenAux,"tk_pa")){

                this.tokenAux = this.SiguienteToken();
                this.Expresion();
                if (this.TokenCorrecto(this.tokenAux,"tk_pc")){

                    this.tokenAux = this.SiguienteToken();
                    if (this.TokenCorrecto(this.tokenAux,"tk_la")){

                        this.traduccion += ":\n";
                        this.tab++;

                        this.tokenAux = this.SiguienteToken();
                        this.Instrucciones();
                        if (this.TokenCorrecto(this.tokenAux,"tk_lc")){

                            this.traduccion += "\n";
                            this.tab--;

                            this.tokenAux = this.SiguienteToken();
                            this.Elseif();
                            this.ListaDeclarariones();
                       
                        } else {
                            this.cErrores++;
                            this.errorSyntax = true;            
                            this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba }"));
                        }   
        
                    } else {
                        this.cErrores++;
                            this.errorSyntax = true;            
                        
                        this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba {"));
                    } 
    
    
                } else {
                    this.cErrores++;
                            this.errorSyntax = true;            
                    this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba )"));
                } 

            } else {
                this.cErrores++;
                            this.errorSyntax = true;            
                this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba ("));
            } 

        

        } else if (this.TokenCorrecto(this.tokenAux,"tk_for")){

            this.traduccion += "\n";
            this.traduccion += this.Tabulacion(this.tab);
            this.traduccion += "for x in range";

            this.tokenAux = this.SiguienteToken();
            if (this.TokenCorrecto(this.tokenAux,"tk_pa")){

                this.traduccion += "(";
        
                this.tokenAux = this.SiguienteToken();
                this.Dafor();
                if (this.TokenCorrecto(this.tokenAux,"tk_pyc")){

                    this.traduccion += ",";

                    this.tokenAux = this.SiguienteToken();
                    this.Expresion();
                    if (this.TokenCorrecto(this.tokenAux,"tk_pyc")){

                        this.traduccion += ",";

                        this.tokenAux = this.SiguienteToken();
                        this.Expresion();
                        if (this.TokenCorrecto(this.tokenAux,"tk_pc")){

                            this.traduccion += ")";

                            this.tokenAux = this.SiguienteToken();
                            if (this.TokenCorrecto(this.tokenAux,"tk_la")){

                                this.traduccion += ":\n";
                                this.tab++;

                                this.tokenAux = this.SiguienteToken();
                                this.Instrucciones();
                                if (this.TokenCorrecto(this.tokenAux,"tk_lc")){

                                    this.traduccion += "\n";
                                    this.tab--;
                    
                                    this.tokenAux = this.SiguienteToken();
                                    this.ListaDeclarariones();      

                                } else {
                                    this.cErrores++;
                            this.errorSyntax = true;            
                                    this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba }"));
                                }
                
                                      
                            } else {
                                this.cErrores++;
                            this.errorSyntax = true;            
                                this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba {"));
                            }
            
                                  
                        } else {
                            this.cErrores++;
                            this.errorSyntax = true;            
                            this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba )"));
                        }
        
                              
                    } else {
                        this.cErrores++;
                            this.errorSyntax = true;            
                        this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba ;"));
                    }
    
                          
                } else {
                    this.cErrores++;
                            this.errorSyntax = true;            
                    this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba ;"));
                }

                      
            } else {
                this.cErrores++;
                            this.errorSyntax = true;            
                this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba ("));
            }
           

        } else if (this.TokenCorrecto(this.tokenAux,"tk_while")){

            this.traduccion += "\n";
            this.traduccion += this.Tabulacion(this.tab);
            this.traduccion += "while "

            this.tokenAux = this.SiguienteToken();
            if (this.TokenCorrecto(this.tokenAux,"tk_pa")){

                this.tokenAux = this.SiguienteToken();
                this.Expresion();
                if (this.TokenCorrecto(this.tokenAux,"tk_pc")){
    
                    this.tokenAux = this.SiguienteToken();
                    if (this.TokenCorrecto(this.tokenAux,"tk_la")){

                        this.traduccion += ":\n";
                        this.tab++;
        
                        this.tokenAux = this.SiguienteToken();
                        this.Instrucciones();
                        if (this.TokenCorrecto(this.tokenAux,"tk_lc")){

                            this.traduccion += "\n";
                            this.tab--;
            
                            this.tokenAux = this.SiguienteToken();      
                            this.ListaDeclarariones();

                        } else {
                            this.cErrores++;
                            this.errorSyntax = true;            
                            this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba }"));
                        }    

                    } else {
                        this.cErrores++;
                            this.errorSyntax = true;            
                        this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba {"));
                    }    

                } else {
                    this.cErrores++;
                            this.errorSyntax = true;            
                    this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba )"));
                }    

            } else {
                this.cErrores++;
                            this.errorSyntax = true;            
                this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba ("));
            }

            

        } else if (this.TokenCorrecto(this.tokenAux,"tk_do")){

            this.traduccion += "\n";
            this.traduccion += this.Tabulacion(this.tab);
            this.traduccion += " while True";

            this.tokenAux = this.SiguienteToken();
            if (this.TokenCorrecto(this.tokenAux,"tk_la")){

                this.traduccion += ":\n";
                this.tab++;

                this.tokenAux = this.SiguienteToken();
                this.Instrucciones();
                if (this.TokenCorrecto(this.tokenAux,"tk_lc")){

                    this.tokenAux = this.SiguienteToken();
                    if (this.TokenCorrecto(this.tokenAux,"tk_while")){

                        this.traduccion += this.Tabulacion(this.tab);
                        this.traduccion += "if"
        
                        this.tokenAux = this.SiguienteToken();
                        if (this.TokenCorrecto(this.tokenAux,"tk_pa")){

                            this.tokenAux = this.SiguienteToken();
                            this.Expresion();
                            if (this.TokenCorrecto(this.tokenAux,"tk_pc")){

                                this.tokenAux = this.SiguienteToken();
                                if (this.TokenCorrecto(this.tokenAux,"tk_pyc")){

                                    this.traduccion += ":\n";
                                    this.traduccion += this.Tabulacion(this.tab);
                                    this.traduccion += "    continue\n";
                                    this.traduccion += this.Tabulacion(this.tab);
                                    this.traduccion += "else:\n"
                                    this.traduccion += this.Tabulacion(this.tab);
                                    this.traduccion += "    break\n";
                                    this.traduccion += "\n";
                                    this.tab--;

                                    this.tokenAux = this.SiguienteToken();      
                                    this.ListaDeclarariones();
                    
                                } else {
                                    this.cErrores++;
                            this.errorSyntax = true;            
                                    this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba ;"));
                                }  
                
                
                            } else {
                                this.cErrores++;
                            this.errorSyntax = true;            
                                this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba )"));
                            }  
            
            
                        } else {
                            this.cErrores++;
                            this.errorSyntax = true;            
                            this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba ("));
                        }  

                    } else {
                        this.cErrores++;
                            this.errorSyntax = true;            
                        this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba la palabra reservada while"));
                    }  
    
    
                } else {
                    this.cErrores++;
                            this.errorSyntax = true;            
                    this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba }"));
                }  

            } else {
                this.cErrores++;
                            this.errorSyntax = true;            
                this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba {"));
            }    

        } else if (this.TokenCorrecto(this.tokenAux,"tk_int") || this.TokenCorrecto(this.tokenAux,"tk_double") || this.TokenCorrecto(this.tokenAux,"tk_string") || this.TokenCorrecto(this.tokenAux,"tk_boolean") || this.TokenCorrecto(this.tokenAux,"tk_char")){

                this.traduccion += this.Tabulacion(this.tab);
                this.traduccion += "var ";

                this.tokenAux = this.SiguienteToken();
                this.Variable();
                if (this.TokenCorrecto(this.tokenAux,"tk_pyc")){

                    this.traduccion += "\n";

                    this.tokenAux = this.SiguienteToken();      
                    this.ListaDeclarariones();

                } else {
                    this.cErrores++;
                            this.errorSyntax = true;            
                    this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba ;"));
                }  

        } else if (this.TokenCorrecto(this.tokenAux,"tk_id")){

            this.traduccion += this.Tabulacion(this.tab);
            this.traduccion += this.tokenAux.getLexema();

            this.tokenAux = this.SiguienteToken();
            this.AsignacionLlamada();
            if (this.TokenCorrecto(this.tokenAux,"tk_pyc")){

                this.traduccion += "\n";

                this.tokenAux = this.SiguienteToken();      
                this.ListaDeclarariones();

            } else {
                this.cErrores++;
                            this.errorSyntax = true;            
                this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba ;"));
            }  

        } else if (this.TokenCorrecto(this.tokenAux,"tk_commentu")){

            this.traduccion += this.Tabulacion(this.tab);
            this.traduccion += "#" + this.tokenAux.getLexema();

            this.tokenAux = this.SiguienteToken();      
            this.ListaDeclarariones(); 

        } else if (this.TokenCorrecto(this.tokenAux,"tk_commentm")){

            this.traduccion += this.Tabulacion(this.tab);
            this.traduccion += `'''` + this.tokenAux.getLexema() + `'''`+"\n";

            this.tokenAux = this.SiguienteToken();      
            this.ListaDeclarariones(); 

        } else if (this.TokenCorrecto(this.tokenAux,"tk_system")){ 

            this.tokenAux = this.SiguienteToken(); 
            if (this.TokenCorrecto(this.tokenAux,"tk_punto")){
                
                this.tokenAux = this.SiguienteToken(); 
                if (this.TokenCorrecto(this.tokenAux,"tk_out")){

                    this.tokenAux = this.SiguienteToken(); 
                    if (this.TokenCorrecto(this.tokenAux,"tk_punto")){
    
                        this.tokenAux = this.SiguienteToken(); 
                        this.Print();
                        if (this.TokenCorrecto(this.tokenAux,"tk_pa")){

                            this.traduccion += this.Tabulacion(this.tab);
                            this.traduccion += "print("
        
                            this.tokenAux = this.SiguienteToken(); 
                            this.Expresion();
                            if (this.TokenCorrecto(this.tokenAux,"tk_pc")){

                                if (this.salto == 1){
                                    this.traduccion += `, end="")`;
                                } else if (this.salto == 2){
                                    this.traduccion += `)`;
                                }
            
                                this.tokenAux = this.SiguienteToken(); 
                                if (this.TokenCorrecto(this.tokenAux,"tk_pyc")){

                                    this.traduccion += "\n";
                
                                    this.tokenAux = this.SiguienteToken();      
                                    this.ListaDeclarariones(); 
                                
                                } else {
                                    this.cErrores++;
                            this.errorSyntax = true;            
                                    this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba ;"));
                                } 
                            
                            } else {
                                this.cErrores++;
                            this.errorSyntax = true;            
                                this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba )"));
                            } 
                        
                        } else {
                            this.cErrores++;
                            this.errorSyntax = true;            
                            this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba ("));
                        } 
                    
                    } else {
                        this.cErrores++;
                            this.errorSyntax = true;            
                        this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba la palabra ."));
                    } 
                
                } else {
                    this.cErrores++;
                            this.errorSyntax = true;            
                    this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba la palabra reservada out"));
                } 

            } else {
                this.cErrores++;
                            this.errorSyntax = true;            
                this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba ."));
            } 

        } 
    }

    AsignacionLlamada(){

        if (this.TokenCorrecto(this.tokenAux,"tk_igual")){

            this.traduccion += " =";

            this.tokenAux = this.SiguienteToken(); 
            this.Expresion();     

        } else if (this.TokenCorrecto(this.tokenAux,"tk_pa")){

            this.traduccion += "(";

            this.tokenAux = this.SiguienteToken();
            this.Valores();
            if (this.TokenCorrecto(this.tokenAux,"tk_pc")){

                this.traduccion += ")";

                this.tokenAux = this.SiguienteToken();      
                this.ListaDeclarariones();

            } else {
                this.cErrores++;
                            this.errorSyntax = true;            
                this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba )"));
            }        

        } else if (this.TokenCorrecto(this.tokenAux,"tk_add")){

            this.traduccion += "+=1";

            this.tokenAux = this.SiguienteToken();      

        } else if (this.TokenCorrecto(this.tokenAux,"tk_sus")){

            this.traduccion += "-=1";

            this.tokenAux = this.SiguienteToken();      

        } else {
            this.cErrores++;
                            this.errorSyntax = true;            
            this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba =, (, ++ o --"));
        } 

    }

    Variable(){

        if (this.TokenCorrecto(this.tokenAux,"tk_id")){

            this.traduccion += this.tokenAux.getLexema();

            this.tokenAux = this.SiguienteToken();
            this.AsignacionVariable();
            this.OtraVariable();

        } else {
            this.cErrores++;
                            this.errorSyntax = true;            
            this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba un id"));
        } 
        
    }

    AsignacionVariable(){

        if (this.TokenCorrecto(this.tokenAux,"tk_igual")){

            this.traduccion += " = ";

            this.tokenAux = this.SiguienteToken();
            this.Expresion();

        }
    }

    OtraVariable(){

        if (this.TokenCorrecto(this.tokenAux,"tk_coma")){

            this.traduccion = ", ";

            this.tokenAux = this.SiguienteToken();
            this.Variable();

        }

    }

    LInterfaz(){
        this.DInterfaz();
    }

    DInterfaz(){

        if (this.TokenCorrecto(this.tokenAux,"tk_public") || this.TokenCorrecto(this.tokenAux,"tk_private")){

            this.tokenAux = this.SiguienteToken();
            if (this.TokenCorrecto(this.tokenAux,"tk_void") || this.TokenCorrecto(this.tokenAux,"tk_int") || this.TokenCorrecto(this.tokenAux,"tk_double") || this.TokenCorrecto(this.tokenAux,"tk_string") || this.TokenCorrecto(this.tokenAux,"tk_boolean") || this.TokenCorrecto(this.tokenAux,"tk_char")){

                this.tokenAux = this.SiguienteToken();
                if (this.TokenCorrecto(this.tokenAux,"tk_id")){

                    this.traduccion += this.Tabulacion(this.tab);
                    this.traduccion += "def " + this.tokenAux.getLexema();

                    this.tokenAux = this.SiguienteToken();
                    if (this.TokenCorrecto(this.tokenAux,"tk_pa")){

                        this.traduccion += "(";

                        this.tokenAux = this.SiguienteToken();
                        this.Parametros();
                        if (this.TokenCorrecto(this.tokenAux,"tk_pc")){

                            this.traduccion += "):\n";
                            this.traduccion += this.Tabulacion(this.tab);
                            this.traduccion += "    pass";

                            this.tokenAux = this.SiguienteToken();
                            if (this.TokenCorrecto(this.tokenAux,"tk_pyc")){

                                this.traduccion += "\n";

                                this.tokenAux = this.SiguienteToken();      
                                this.LInterfaz();  
    
                            } else {
                                this.cErrores++;
                            this.errorSyntax = true;            
                                this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba {"));
                            }   


                        } else {
                            this.cErrores++;
                            this.errorSyntax = true;            
                            this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba )"));
                        }   


                    } else {
                        this.cErrores++;
                            this.errorSyntax = true;            
                        this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba ("));
                    }   


                } else {
                    this.cErrores++;
                            this.errorSyntax = true;            
                    this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba un id"));
                }   

            }


        } else if (this.TokenCorrecto(this.tokenAux,"tk_int") || this.TokenCorrecto(this.tokenAux,"tk_double") || this.TokenCorrecto(this.tokenAux,"tk_string") || this.TokenCorrecto(this.tokenAux,"tk_boolean") || this.TokenCorrecto(this.tokenAux,"tk_char")){

            this.traduccion += this.Tabulacion(this.tab);
            this.traduccion += "var ";

            this.tokenAux = this.SiguienteToken();
            this.Variable();
            if (this.TokenCorrecto(this.tokenAux,"tk_pyc")){

                this.traduccion += "\n";

                this.tokenAux = this.SiguienteToken();      
                this.LInterfaz();

            } else {
                this.cErrores++;
                            this.errorSyntax = true;            
                this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba ;"));
            }  

        } else if (this.TokenCorrecto(this.tokenAux,"tk_id")){

            this.traduccion += this.Tabulacion(this.tab);
            this.traduccion += this.tokenAux.getLexema();

            this.tokenAux = this.SiguienteToken();
            if (this.TokenCorrecto(this.tokenAux,"tk_igual")){

                this.traduccion += " = ";

                this.tokenAux = this.SiguienteToken();
                this.Expresion();
                this.OtraAsignacion();
                if (this.TokenCorrecto(this.tokenAux,"tk_pyc")){

                    this.traduccion += "\n";

                    this.tokenAux = this.SiguienteToken();      
                    this.LInterfaz();
    
                } else {
                    this.cErrores++;
                            this.errorSyntax = true;            
                    this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba ;"));
                }  
                      
            } else {
                this.cErrores++;
                            this.errorSyntax = true;            
                this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba ="));
            } 

        }

    }

    Dafor(){

        if (this.TokenCorrecto(this.tokenAux,"tk_int") || this.TokenCorrecto(this.tokenAux,"tk_double") || this.TokenCorrecto(this.tokenAux,"tk_string") || this.TokenCorrecto(this.tokenAux,"tk_boolean") || this.TokenCorrecto(this.tokenAux,"tk_char")){

            this.traduccion += "var ";
            this.tokenAux = this.SiguienteToken();
            this.Variable();
 

        } else if (this.TokenCorrecto(this.tokenAux,"tk_id")){

            this.traduccion += this.tokenAux.getLexema();

            this.tokenAux = this.SiguienteToken();
            if (this.TokenCorrecto(this.tokenAux,"tk_igual")){

                this.traduccion += " = ";

                this.tokenAux = this.SiguienteToken();
                this.Expresion();
                this.OtraAsignacion();
                      
            } else {
                this.cErrores++;
                            this.errorSyntax = true;            
                this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba ="));
            }     

        } else {
            this.cErrores++;
                            this.errorSyntax = true;            
            this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba un tipo de dato o un id"));
        }  
    }

    OtraAsignacion(){

        if (this.TokenCorrecto(this.tokenAux,"tk_coma")){

            this.traduccion += ", ";

            this.tokenAux = this.SiguienteToken();
            if (this.TokenCorrecto(this.tokenAux,"tk_id")){

                this.traduccion += this.tokenAux.getLexema();

                this.tokenAux = this.SiguienteToken();
                if (this.TokenCorrecto(this.tokenAux,"tk_igual")){

                    this.traduccion += " = ";
    
                    this.tokenAux = this.SiguienteToken();
                    this.Expresion();
                    this.OtraAsignacion();
                          
                } else {
                    this.cErrores++;
                            this.errorSyntax = true;            
                    this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba ="));
                }     
    
            } else {
                this.cErrores++;
                            this.errorSyntax = true;            
                this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba un id"));
            }  
                  
        } 

    }

    Instrucciones(){
        this.DInstruccion();
    }

    DInstruccion(){

        if (this.TokenCorrecto(this.tokenAux,"tk_if")){

            this.traduccion += "\n";
            this.traduccion += this.Tabulacion(this.tab);
            this.traduccion += "if";

            this.tokenAux = this.SiguienteToken();
            if (this.TokenCorrecto(this.tokenAux,"tk_pa")){

                this.tokenAux = this.SiguienteToken();
                this.Expresion();
                if (this.TokenCorrecto(this.tokenAux,"tk_pc")){

                    this.tokenAux = this.SiguienteToken();
                    if (this.TokenCorrecto(this.tokenAux,"tk_la")){

                        this.traduccion += ":\n";
                        this.tab++;

                        this.tokenAux = this.SiguienteToken();
                        this.Instrucciones();
                        if (this.TokenCorrecto(this.tokenAux,"tk_lc")){

                            this.traduccion += "\n";
                            this.tab--;

                            this.tokenAux = this.SiguienteToken();
                            this.Elseif();
                            this.Instrucciones();
                       
                        } else {
                            this.cErrores++;
                            this.errorSyntax = true;            
                            this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba }"));
                        }   
        
                    } else {
                        this.cErrores++;
                            this.errorSyntax = true;            
                        this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba {"));
                    } 
    
    
                } else {
                    this.cErrores++;
                            this.errorSyntax = true;            
                    this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba )"));
                } 

            } else {
                this.cErrores++;
                            this.errorSyntax = true;            
                this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba ("));
            } 

        

        } else if (this.TokenCorrecto(this.tokenAux,"tk_for")){

            this.traduccion += this.Tabulacion(this.tab);
            this.traduccion += "for x in range";

            this.tokenAux = this.SiguienteToken();
            if (this.TokenCorrecto(this.tokenAux,"tk_pa")){

                this.traduccion += "(";

                this.tokenAux = this.SiguienteToken();
                this.Dafor();
                if (this.TokenCorrecto(this.tokenAux,"tk_pyc")){

                    this.traduccion += ",";

                    this.tokenAux = this.SiguienteToken();
                    this.Expresion();
                    if (this.TokenCorrecto(this.tokenAux,"tk_pyc")){

                        this.traduccion += ",";

                        this.tokenAux = this.SiguienteToken();
                        this.Expresion();
                        if (this.TokenCorrecto(this.tokenAux,"tk_pc")){

                            this.traduccion += ")";

                            this.tokenAux = this.SiguienteToken();
                            if (this.TokenCorrecto(this.tokenAux,"tk_la")){

                                this.traduccion += ":\n";
                                this.tab++;

                                this.tokenAux = this.SiguienteToken();
                                this.Instrucciones();
                                if (this.TokenCorrecto(this.tokenAux,"tk_lc")){

                                    this.traduccion += "\n";
                                    this.tab--;
                    
                                    this.tokenAux = this.SiguienteToken();
                                    this.Instrucciones();     

                                } else {
                                    this.cErrores++;
                            this.errorSyntax = true;            
                                    this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba }"));
                                }
                
                                      
                            } else {
                                this.cErrores++;
                            this.errorSyntax = true;            
                                this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba {"));
                            }
            
                                  
                        } else {
                            this.cErrores++;
                            this.errorSyntax = true;            
                            this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba )"));
                        }
        
                              
                    } else {
                        this.cErrores++;
                            this.errorSyntax = true;            
                        this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba ;"));
                    }
    
                          
                } else {
                    this.cErrores++;
                            this.errorSyntax = true;            
                    this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba ;"));
                }

                      
            } else {
                this.cErrores++;
                            this.errorSyntax = true;            
                this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba ("));
            }
           

        } else if (this.TokenCorrecto(this.tokenAux,"tk_while")){

            this.traduccion += this.Tabulacion(this.tab);
            this.traduccion += "while "

            this.tokenAux = this.SiguienteToken();
            if (this.TokenCorrecto(this.tokenAux,"tk_pa")){

                this.tokenAux = this.SiguienteToken();
                this.Expresion();
                if (this.TokenCorrecto(this.tokenAux,"tk_pc")){
    
                    this.tokenAux = this.SiguienteToken();
                    if (this.TokenCorrecto(this.tokenAux,"tk_la")){

                        this.traduccion += ":\n";
                        this.tab++;
        
                        this.tokenAux = this.SiguienteToken();
                        this.Instrucciones();
                        if (this.TokenCorrecto(this.tokenAux,"tk_lc")){

                            this.traduccion += "\n";
                            this.tab--;
            
                            this.tokenAux = this.SiguienteToken();      
                            this.Instrucciones();

                        } else {
                            this.cErrores++;
                            this.errorSyntax = true;            
                            this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba }"));
                        }    

                    } else {
                        this.cErrores++;
                            this.errorSyntax = true;            
                        this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba {"));
                    }    

                } else {
                    this.cErrores++;
                            this.errorSyntax = true;            
                    this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba )"));
                }    

            } else {
                this.cErrores++;
                            this.errorSyntax = true;            
                this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba ("));
            }

            

        } else if (this.TokenCorrecto(this.tokenAux,"tk_do")){

            this.traduccion += this.Tabulacion(this.tab);
            this.traduccion += " while True";

            this.tokenAux = this.SiguienteToken();
            if (this.TokenCorrecto(this.tokenAux,"tk_la")){

                this.traduccion += ":\n";
                this.tab++;

                this.tokenAux = this.SiguienteToken();
                this.Instrucciones();
                if (this.TokenCorrecto(this.tokenAux,"tk_lc")){

                    this.tokenAux = this.SiguienteToken();
                    if (this.TokenCorrecto(this.tokenAux,"tk_while")){

                        this.traduccion += this.Tabulacion(this.tab);
                        this.traduccion += "if"
        
                        this.tokenAux = this.SiguienteToken();
                        if (this.TokenCorrecto(this.tokenAux,"tk_pa")){

                            this.tokenAux = this.SiguienteToken();
                            this.Expresion();
                            if (this.TokenCorrecto(this.tokenAux,"tk_pc")){

                                this.tokenAux = this.SiguienteToken();
                                if (this.TokenCorrecto(this.tokenAux,"tk_pyc")){

                                    this.traduccion += ":\n";
                                    this.traduccion += this.Tabulacion(this.tab);
                                    this.traduccion += "    continue\n";
                                    this.traduccion += this.Tabulacion(this.tab);
                                    this.traduccion += "else:\n"
                                    this.traduccion += this.Tabulacion(this.tab);
                                    this.traduccion += "    break\n";
                                    this.traduccion += "\n";
                                    this.tab--;
                                    
                                    this.tokenAux = this.SiguienteToken();      
                                    this.Instrucciones();
                    
                                } else {
                                    this.cErrores++;
                            this.errorSyntax = true;            
                                    this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba ;"));
                                }  
                
                
                            } else {
                                this.cErrores++;
                            this.errorSyntax = true;            
                                this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba )"));
                            }  
            
            
                        } else {
                            this.cErrores++;
                            this.errorSyntax = true;            
                            this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba ("));
                        }  

                    } else {
                        this.cErrores++;
                            this.errorSyntax = true;            
                        this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba la palabra reservada while"));
                    }  
    
    
                } else {
                    this.cErrores++;
                            this.errorSyntax = true;            
                    this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba }"));
                }  

            } else {
                this.cErrores++;
                            this.errorSyntax = true;            
                this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba {"));
            }    

        } else if (this.TokenCorrecto(this.tokenAux,"tk_break")){

            this.traduccion += this.Tabulacion(this.tab);
            this.traduccion += "break";
                                    
            this.tokenAux = this.SiguienteToken();
            if (this.TokenCorrecto(this.tokenAux,"tk_pyc")){

                this.traduccion += "\n";
                
                this.tokenAux = this.SiguienteToken();      
                this.Instrucciones();

            } else {
                this.cErrores++;
                            this.errorSyntax = true;            
                this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba ;"));
            }       
            

        } else if (this.TokenCorrecto(this.tokenAux,"tk_continue")){

            this.traduccion += this.Tabulacion(this.tab);
            this.traduccion += "continue";
                                    
            this.tokenAux = this.SiguienteToken();
            if (this.TokenCorrecto(this.tokenAux,"tk_pyc")){

                this.traduccion += "\n";
                
                this.tokenAux = this.SiguienteToken();      
                this.Instrucciones();

            } else {
                this.cErrores++;
                            this.errorSyntax = true;            
                this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba ;"));
            }       
            

        } else if (this.TokenCorrecto(this.tokenAux,"tk_return")){

            this.traduccion += this.Tabulacion(this.tab);
            this.traduccion += "return";
                                    
            this.tokenAux = this.SiguienteToken();
            this.Return();
            if (this.TokenCorrecto(this.tokenAux,"tk_pyc")){

                this.traduccion += "\n";
                
                this.tokenAux = this.SiguienteToken();      
                this.Instrucciones();

            } else {
                this.cErrores++;
                            this.errorSyntax = true;            
                this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba ;"));
            }       
            

        } else if (this.TokenCorrecto(this.tokenAux,"tk_int") || this.TokenCorrecto(this.tokenAux,"tk_double") || this.TokenCorrecto(this.tokenAux,"tk_string") || this.TokenCorrecto(this.tokenAux,"tk_boolean") || this.TokenCorrecto(this.tokenAux,"tk_char")){

            this.traduccion += this.Tabulacion(this.tab);
            this.traduccion += "var ";

            this.tokenAux = this.SiguienteToken();
            this.Variable();
            if (this.TokenCorrecto(this.tokenAux,"tk_pyc")){

                this.traduccion += "\n";

                this.tokenAux = this.SiguienteToken();      
                this.Instrucciones();

            } else {
                this.cErrores++;
                            this.errorSyntax = true;            
                this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba ;"));
            }  

        } else if (this.TokenCorrecto(this.tokenAux,"tk_id")){

            this.traduccion += this.Tabulacion(this.tab);
            this.traduccion += this.tokenAux.getLexema();

            this.tokenAux = this.SiguienteToken();
            this.AsignacionLlamada();
            if (this.TokenCorrecto(this.tokenAux,"tk_pyc")){

                this.traduccion += "\n";

                this.tokenAux = this.SiguienteToken();      
                this.Instrucciones();

            } else {
                this.cErrores++;
                            this.errorSyntax = true;            
                this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba ;"));
            }  

        } else if (this.TokenCorrecto(this.tokenAux,"tk_commentu")){

            this.traduccion += this.Tabulacion(this.tab);
            this.traduccion += "#" + this.tokenAux.getLexema();

            this.tokenAux = this.SiguienteToken();      
            this.Instrucciones();

        } else if (this.TokenCorrecto(this.tokenAux,"tk_commentm")){

            this.traduccion += this.Tabulacion(this.tab);
            this.traduccion += `'''` + this.tokenAux.getLexema() + `'''`+"\n";

            this.tokenAux = this.SiguienteToken();      
            this.Instrucciones();

        } else if (this.TokenCorrecto(this.tokenAux,"tk_system")){ 

            this.tokenAux = this.SiguienteToken(); 
            if (this.TokenCorrecto(this.tokenAux,"tk_punto")){
                
                this.tokenAux = this.SiguienteToken(); 
                if (this.TokenCorrecto(this.tokenAux,"tk_out")){

                    this.tokenAux = this.SiguienteToken(); 
                    if (this.TokenCorrecto(this.tokenAux,"tk_punto")){
    
                        this.tokenAux = this.SiguienteToken(); 
                        this.Print();
                        if (this.TokenCorrecto(this.tokenAux,"tk_pa")){

                            this.traduccion += this.Tabulacion(this.tab);
                            this.traduccion += "print("
        
                            this.tokenAux = this.SiguienteToken(); 
                            this.Expresion();
                            if (this.TokenCorrecto(this.tokenAux,"tk_pc")){

                                if (this.salto == 1){
                                    this.traduccion += `, end="")`;
                                } else if (this.salto == 2){
                                    this.traduccion += `)`;
                                }
            
                                this.tokenAux = this.SiguienteToken(); 
                                if (this.TokenCorrecto(this.tokenAux,"tk_pyc")){

                                    this.traduccion += "\n";
                
                                    this.tokenAux = this.SiguienteToken();      
                                    this.Instrucciones();
                                
                                } else {
                                    this.cErrores++;
                            this.errorSyntax = true;            
                                    this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba ;"));
                                } 
                            
                            } else {
                                this.cErrores++;
                            this.errorSyntax = true;            
                                this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba )"));
                            } 
                        
                        } else {
                            this.cErrores++;
                            this.errorSyntax = true;            
                            this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba ("));
                        } 
                    
                    } else {
                        this.cErrores++;
                            this.errorSyntax = true;            
                        this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba la palabra ."));
                    } 
                
                } else {
                    this.cErrores++;
                            this.errorSyntax = true;            
                    this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba la palabra reservada out"));
                } 

            } else {
                this.cErrores++;
                            this.errorSyntax = true;            
                this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba ."));
            } 

        } 

    }

    Return(){

        if (this.TokenCorrecto(this.tokenAux,"tk_id")){

            this.traduccion += " " + this.tokenAux.getLexema();

            this.tokenAux = this.SiguienteToken();
            this.IDLLamada();
            this.EPrima();

                  
        } else if (this.TokenCorrecto(this.tokenAux,"tk_cadena")){

            this.traduccion += " " + this.tokenAux.getLexema();

            this.tokenAux = this.SiguienteToken();
            this.EPrima();

                  
        } else if (this.TokenCorrecto(this.tokenAux,"tk_true")){

            this.traduccion += " True";

            this.tokenAux = this.SiguienteToken();
            this.EPrima();
                  
        } else if (this.TokenCorrecto(this.tokenAux,"tk_false")){

            this.traduccion += " False";

            this.tokenAux = this.SiguienteToken();
            this.EPrima();

                  
        } else if (this.TokenCorrecto(this.tokenAux,"tk_entero")){

            this.traduccion += " " + this.tokenAux.getLexema();

            this.tokenAux = this.SiguienteToken();
            this.EPrima();

                  
        } else if (this.TokenCorrecto(this.tokenAux,"tk_decimal")){

            this.traduccion += " " + this.tokenAux.getLexema();

            this.tokenAux = this.SiguienteToken();
            this.EPrima();

                   
        } else if (this.TokenCorrecto(this.tokenAux,"tk_menos")){

            this.traduccion += " -";

            this.tokenAux = this.SiguienteToken();
            this.Expresion();
            this.EPrima();


        } else if (this.TokenCorrecto(this.tokenAux,"tk_not")){

            this.traduccion += " not";

            this.tokenAux = this.SiguienteToken();
            this.Expresion();
            this.traduccion = this.traduccion.replace("! ", "!");
            this.EPrima();

        } else if (this.TokenCorrecto(this.tokenAux,"tk_pa")){

            this.traduccion += " (";

            this.tokenAux = this.SiguienteToken();
            this.Expresion
            this.EPrima();
            if (this.TokenCorrecto(this.tokenAux,"tk_pc")){

                this.traduccion += ")";

                this.tokenAux = this.SiguienteToken();
                this.EPrima();
                      
            } else {
                this.cErrores++;
                this.errorSyntax = true;            
                this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba )"));
            }
                  
        }
        
    }

    Parametros(){

        if (this.TokenCorrecto(this.tokenAux,"tk_int") || this.TokenCorrecto(this.tokenAux,"tk_double") || this.TokenCorrecto(this.tokenAux,"tk_string") || this.TokenCorrecto(this.tokenAux,"tk_boolean") || this.TokenCorrecto(this.tokenAux,"tk_char")){

            this.traduccion += "var ";
            this.tokenAux = this.SiguienteToken();
            if (this.TokenCorrecto(this.tokenAux,"tk_id")){

                this.traduccion += this.tokenAux.getLexema();

                this.tokenAux = this.SiguienteToken();
                this.OtroParametro();
                      
            } else {
                this.cErrores++;
                            this.errorSyntax = true;            
                this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba un id"));
            }

        } 

    }

    Parametro(){

        if (this.TokenCorrecto(this.tokenAux,"tk_int") || this.TokenCorrecto(this.tokenAux,"tk_double") || this.TokenCorrecto(this.tokenAux,"tk_string") || this.TokenCorrecto(this.tokenAux,"tk_boolean") || this.TokenCorrecto(this.tokenAux,"tk_char")){

            this.traduccion += "var ";
            this.tokenAux = this.SiguienteToken();
            if (this.TokenCorrecto(this.tokenAux,"tk_id")){

                this.traduccion += this.tokenAux.getLexema();

                this.tokenAux = this.SiguienteToken();
                this.OtroParametro();
                      
            } else {
                this.cErrores++;
                            this.errorSyntax = true;            
                this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba un id"));
            }

        } else {
            this.cErrores++;
                            this.errorSyntax = true;            
            this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba un tipo de dato"));
        }

    }

    OtroParametro(){

        if (this.TokenCorrecto(this.tokenAux,"tk_coma")){

            this.traduccion += ", ";

            this.tokenAux = this.SiguienteToken();
            this.Parametro();
                  
        } 

    }

    IDLLamada(){

        if (this.TokenCorrecto(this.tokenAux,"tk_pa")){

            this.traduccion += "(";

            this.tokenAux = this.SiguienteToken();
            this.Valores();
            if (this.TokenCorrecto(this.tokenAux,"tk_pc")){

                this.traduccion += ")";

                this.tokenAux = this.SiguienteToken();
                      
            } else {
                this.cErrores++;
                            this.errorSyntax = true;            
                this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba )"));
            }

        } 

    }

    Valores(){
        this.Expresion();
        this.OtroValor();
    }

    OtroValor(){

        if (this.TokenCorrecto(this.tokenAux,"tk_coma")){

            this.traduccion += ", ";

            this.tokenAux = this.SiguienteToken();
            this.Expresion();
            this.OtroValor();
        } 

    }

    EPrima(){       
        this.Operador();
    }

    Expresion(){

        if (this.TokenCorrecto(this.tokenAux,"tk_id")){

            this.traduccion += " " + this.tokenAux.getLexema();

            this.tokenAux = this.SiguienteToken();
            this.IDLLamada();
            this.EPrima();
                  
        } else if (this.TokenCorrecto(this.tokenAux,"tk_cadena")){

            this.traduccion += " " + this.tokenAux.getLexema();

            this.tokenAux = this.SiguienteToken();
            this.EPrima();

                  
        } else if (this.TokenCorrecto(this.tokenAux,"tk_true")){

            this.traduccion += " True";

            this.tokenAux = this.SiguienteToken();
            this.EPrima();
                  
        } else if (this.TokenCorrecto(this.tokenAux,"tk_false")){

            this.traduccion += " False";

            this.tokenAux = this.SiguienteToken();
            this.EPrima();
                  
        } else if (this.TokenCorrecto(this.tokenAux,"tk_entero")){

            this.traduccion += " " + this.tokenAux.getLexema();

            this.tokenAux = this.SiguienteToken();
            this.EPrima();
                  
        } else if (this.TokenCorrecto(this.tokenAux,"tk_decimal")){

            this.traduccion += " " + this.tokenAux.getLexema();

            this.tokenAux = this.SiguienteToken();
            this.EPrima();

                   
        } else if (this.TokenCorrecto(this.tokenAux,"tk_menos")){

            this.traduccion += " -";

            this.tokenAux = this.SiguienteToken();
            this.Expresion();
            this.EPrima();

        } else if (this.TokenCorrecto(this.tokenAux,"tk_not")){

            this.traduccion += " not";

            this.tokenAux = this.SiguienteToken();
            this.Expresion();
            this.traduccion = this.traduccion.replace("! ", "!");
            this.EPrima();

        } else if (this.TokenCorrecto(this.tokenAux,"tk_pa")){

            this.traduccion += " (";

            this.tokenAux = this.SiguienteToken();
            this.Expresion
            this.EPrima();
            if (this.TokenCorrecto(this.tokenAux,"tk_pc")){

                this.traduccion += ")";

                this.tokenAux = this.SiguienteToken();
                this.EPrima();
                      
            } else {
                this.cErrores++;
                this.errorSyntax = true;            
                this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba )"));
            }
                  
        } else {
            this.cErrores++;
                            this.errorSyntax = true;            
            this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba una expresion"));
        }

    }

    Operador(){

        if (this.TokenCorrecto(this.tokenAux,"tk_mayor")){

            this.traduccion += " >";

            this.tokenAux = this.SiguienteToken();
            this.Expresion();
            this.EPrima();
                  
        } else if (this.TokenCorrecto(this.tokenAux,"tk_menor")){

            this.traduccion += " <";

            this.tokenAux = this.SiguienteToken();
            this.Expresion();
            this.EPrima();
                  
        } else if (this.TokenCorrecto(this.tokenAux,"tk_mayorigual")){

            this.traduccion += " >=";

            this.tokenAux = this.SiguienteToken();
            this.Expresion();
            this.EPrima();
                  
        } else if (this.TokenCorrecto(this.tokenAux,"tk_menorigual")){

            this.traduccion += " <=";

            this.tokenAux = this.SiguienteToken();
            this.Expresion();
            this.EPrima();
                  
        } else if (this.TokenCorrecto(this.tokenAux,"tk_igualigual")){

            this.traduccion += " ==";

            this.tokenAux = this.SiguienteToken();
            this.Expresion();
            this.EPrima();
                  
        } else if (this.TokenCorrecto(this.tokenAux,"tk_noigual")){

            this.traduccion += " !=";

            this.tokenAux = this.SiguienteToken();
            this.Expresion();
            this.EPrima();
                  
        } else if (this.TokenCorrecto(this.tokenAux,"tk_mas")){

            this.traduccion += " +";

            this.tokenAux = this.SiguienteToken();
            this.Expresion();
            this.EPrima();
                  
        } else if (this.TokenCorrecto(this.tokenAux,"tk_menos")){

            this.traduccion += " -";

            this.tokenAux = this.SiguienteToken();
            this.Expresion();
            this.EPrima();
                  
        } else if (this.TokenCorrecto(this.tokenAux,"tk_mul")){

            this.traduccion += " *";

            this.tokenAux = this.SiguienteToken();
            this.Expresion();
            this.EPrima();
                  
        } else if (this.TokenCorrecto(this.tokenAux,"tk_div")){

            this.traduccion += " /";

            this.tokenAux = this.SiguienteToken();
            this.Expresion();
            this.EPrima();
                  
        } else if (this.TokenCorrecto(this.tokenAux,"tk_and")){

            this.traduccion += " and";

            this.tokenAux = this.SiguienteToken();
            this.Expresion();
            this.EPrima();
                  
        } else if (this.TokenCorrecto(this.tokenAux,"tk_or")){

            this.traduccion += " or";

            this.tokenAux = this.SiguienteToken();
            this.Expresion();
            this.EPrima();
                  
        } else if (this.TokenCorrecto(this.tokenAux,"tk_xor")){

            this.traduccion += " xor";

            this.tokenAux = this.SiguienteToken();
            this.Expresion();
            this.EPrima();
                  
        } else if (this.TokenCorrecto(this.tokenAux,"tk_add")){

            this.traduccion += " +=1";

            this.tokenAux = this.SiguienteToken();
                  
        } else if (this.TokenCorrecto(this.tokenAux,"tk_sus")){

            this.traduccion += " -=1";

            this.tokenAux = this.SiguienteToken();
                  
        }

    }

    Elseif(){

        if (this.TokenCorrecto(this.tokenAux,"tk_else")){
            this.tokenAux = this.SiguienteToken();
            this.Else();
        } 

    }

    Else(){

        if (this.TokenCorrecto(this.tokenAux,"tk_if")){

            this.traduccion += this.Tabulacion(this.tab);
            this.traduccion += "elif";

            this.tokenAux = this.SiguienteToken();
            if (this.TokenCorrecto(this.tokenAux,"tk_pa")){

                this.tokenAux = this.SiguienteToken();
                this.Expresion();
                if (this.TokenCorrecto(this.tokenAux,"tk_pc")){

                    this.tokenAux = this.SiguienteToken();
                    if (this.TokenCorrecto(this.tokenAux,"tk_la")){

                        this.traduccion += ":\n";
                        this.tab++;

                        this.tokenAux = this.SiguienteToken();
                        this.Instrucciones();
                        if (this.TokenCorrecto(this.tokenAux,"tk_lc")){

                            this.traduccion += "\n";
                            this.tab--;

                            this.tokenAux = this.SiguienteToken();
                            this.Elseif();
                                  
                        } else {
                            this.cErrores++;
                            this.errorSyntax = true;            
                            this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba }"));
                        }
        
                   
                    } else {
                        this.cErrores++;
                            this.errorSyntax = true;            
                        this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba {"));
                    }
    
               
                } else {
                    this.cErrores++;
                            this.errorSyntax = true;            
                    this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba )"));
                }
           
            } else {
                this.cErrores++;
                            this.errorSyntax = true;            
                this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba ("));
            }

        } else if (this.TokenCorrecto(this.tokenAux,"tk_la")){

            this.traduccion += this.Tabulacion(this.tab);
            this.traduccion += "else:\n";
            this.tab++;

            this.tokenAux = this.SiguienteToken();
            this.Instrucciones();
            if (this.TokenCorrecto(this.tokenAux,"tk_lc")){

                this.traduccion += "\n";
                this.tab--;

                this.tokenAux = this.SiguienteToken();
                      
            } else {
                this.cErrores++;
                            this.errorSyntax = true;            
                this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba }"));
            }

        }  else {
            this.cErrores++;
                            this.errorSyntax = true;            
            this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba if o {"));
        } 

    }

    Print(){

        if (this.TokenCorrecto(this.tokenAux,"tk_print")){
            this.salto = 1;
            this.tokenAux = this.SiguienteToken();
        } else if (this.TokenCorrecto(this.tokenAux,"tk_println")){
            this.salto = 2;
            this.tokenAux = this.SiguienteToken();
        } 

    }

    Panico(){
        for (var i = this.Numtoken; i< this.tokens.lenght; i++){
            if (this.tokens[i].getToken() == "tk_pyc"){
                this.Numtoken++;
                this.tokenAux = this.tokens[this.Numtoken];
                return true;
            }
        }
        return false;
    }

    TokenCorrecto(token, tipo){
        if (token !=null){
            if (token.getToken() == tipo){
                return true;
            }
            return false;
        }
        return false;
    }

    SiguienteToken(){
        if (this.Numtoken < (Object.keys(this.tokens).length -1)){
            this.Numtoken++;
            return this.tokens[this.Numtoken];
        } 
        return null;
    }

    Tabulacion(n){
        return "    ".repeat(n);
    }

    getErrores(){
        var concatena = "";

            if (Object.keys(this.errores).length > 0) {
                this.errores.forEach(element => {
                    concatena += element.getNo() + ". " + "Fil: " + element.getFila() + " Col: " + element.getColumna() + " Tipo: " + element.getTipo() + " Desc. " + element.getDescripcion() + "\n";
                });
            } else {
                concatena = "No se encontraron errores lexicos ni sintacticos.";
            }        
        return concatena;
    }

    ReporteErrores(){
        var contenido = `<!DOCTYPE html>
        <html>
        <body><center>
        <h1>REPORTE DE ERRORES: TRADUCTOR PYTHON</h1>
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

        fs.writeFile('./Reportes/ErroresPy.html', contenido, (err) => {
        if (err) throw err;
        console.log('Reporte errores generado correctamente.');
        });

    }

}

module.exports = Sintactico;