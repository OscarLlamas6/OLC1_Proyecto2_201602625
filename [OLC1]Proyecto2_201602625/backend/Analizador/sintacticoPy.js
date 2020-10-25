const Token = require('../AST/tokenPy');
const Error = require('../AST/error');

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
        this.tab = ``;
        this.errorSyntax = false;
    }

    Start(){

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

                this.tokenAux = this.SiguienteToken();
                if (this.TokenCorrecto(this.tokenAux,"tk_id")){

                    this.tokenAux = this.SiguienteToken();
                    if (this.TokenCorrecto(this.tokenAux,"tk_la")){

                        this.tokenAux = this.SiguienteToken();
                        this.ListaDeclarariones();
                        if (this.TokenCorrecto(this.tokenAux,"tk_lc")){
                            
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

                this.tokenAux = this.SiguienteToken();
                if (this.TokenCorrecto(this.tokenAux,"tk_id")){

                    this.tokenAux = this.SiguienteToken();
                    if (this.TokenCorrecto(this.tokenAux,"tk_la")){

                        this.tokenAux = this.SiguienteToken();
                        this.LInterfaz();
                        if (this.TokenCorrecto(this.tokenAux,"tk_lc")){

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

                                                    this.tokenAux = this.SiguienteToken();
                                                    this.Instrucciones();
                                                    if (this.TokenCorrecto(this.tokenAux,"tk_lc")){
                            
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

                this.tokenAux = this.SiguienteToken();
                if (this.TokenCorrecto(this.tokenAux,"tk_id")){

                    this.tokenAux = this.SiguienteToken();
                    if (this.TokenCorrecto(this.tokenAux,"tk_pa")){

                        this.tokenAux = this.SiguienteToken();
                        this.Parametros();
                        if (this.TokenCorrecto(this.tokenAux,"tk_pc")){

                            this.tokenAux = this.SiguienteToken();
                            if (this.TokenCorrecto(this.tokenAux,"tk_la")){

                                this.tokenAux = this.SiguienteToken();
                                this.Instrucciones();
                                if (this.TokenCorrecto(this.tokenAux,"tk_lc")){
        
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

            this.tokenAux = this.SiguienteToken();
            if (this.TokenCorrecto(this.tokenAux,"tk_pa")){

                this.tokenAux = this.SiguienteToken();
                this.Expresion();
                if (this.TokenCorrecto(this.tokenAux,"tk_pc")){

                    this.tokenAux = this.SiguienteToken();
                    if (this.TokenCorrecto(this.tokenAux,"tk_la")){

                        this.tokenAux = this.SiguienteToken();
                        this.Instrucciones();
                        if (this.TokenCorrecto(this.tokenAux,"tk_lc")){

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

            this.tokenAux = this.SiguienteToken();
            if (this.TokenCorrecto(this.tokenAux,"tk_pa")){

                this.tokenAux = this.SiguienteToken();
                this.Dafor();
                if (this.TokenCorrecto(this.tokenAux,"tk_pyc")){

                    this.tokenAux = this.SiguienteToken();
                    this.Expresion();
                    if (this.TokenCorrecto(this.tokenAux,"tk_pyc")){

                        this.tokenAux = this.SiguienteToken();
                        this.Expresion();
                        if (this.TokenCorrecto(this.tokenAux,"tk_pc")){

                            this.tokenAux = this.SiguienteToken();
                            if (this.TokenCorrecto(this.tokenAux,"tk_la")){

                                this.tokenAux = this.SiguienteToken();
                                this.Instrucciones();
                                if (this.TokenCorrecto(this.tokenAux,"tk_lc")){
                    
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

            this.tokenAux = this.SiguienteToken();
            if (this.TokenCorrecto(this.tokenAux,"tk_pa")){

                this.tokenAux = this.SiguienteToken();
                this.Expresion();
                if (this.TokenCorrecto(this.tokenAux,"tk_pc")){
    
                    this.tokenAux = this.SiguienteToken();
                    if (this.TokenCorrecto(this.tokenAux,"tk_la")){
        
                        this.tokenAux = this.SiguienteToken();
                        this.Instrucciones();
                        if (this.TokenCorrecto(this.tokenAux,"tk_lc")){
            
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

            this.tokenAux = this.SiguienteToken();
            if (this.TokenCorrecto(this.tokenAux,"tk_la")){

                this.tokenAux = this.SiguienteToken();
                this.Instrucciones();
                if (this.TokenCorrecto(this.tokenAux,"tk_lc")){

                    this.tokenAux = this.SiguienteToken();
                    if (this.TokenCorrecto(this.tokenAux,"tk_while")){
        
                        this.tokenAux = this.SiguienteToken();
                        if (this.TokenCorrecto(this.tokenAux,"tk_pa")){

                            this.tokenAux = this.SiguienteToken();
                            this.Expresion();
                            if (this.TokenCorrecto(this.tokenAux,"tk_pc")){

                                this.tokenAux = this.SiguienteToken();
                                if (this.TokenCorrecto(this.tokenAux,"tk_pyc")){
                                    
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

                this.tokenAux = this.SiguienteToken();
                this.Variable();
                if (this.TokenCorrecto(this.tokenAux,"tk_pyc")){

                    this.tokenAux = this.SiguienteToken();      
                    this.ListaDeclarariones();

                } else {
                    this.cErrores++;
                            this.errorSyntax = true;            
                    this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba ;"));
                }  

        } else if (this.TokenCorrecto(this.tokenAux,"tk_id")){

            this.tokenAux = this.SiguienteToken();
            this.AsignacionLlamada();
            if (this.TokenCorrecto(this.tokenAux,"tk_pyc")){

                this.tokenAux = this.SiguienteToken();      
                this.ListaDeclarariones();

            } else {
                this.cErrores++;
                            this.errorSyntax = true;            
                this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba ;"));
            }  

        } else if (this.TokenCorrecto(this.tokenAux,"tk_commentu")){

            this.tokenAux = this.SiguienteToken();      
            this.ListaDeclarariones(); 

        } else if (this.TokenCorrecto(this.tokenAux,"tk_commentm")){

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
        
                            this.tokenAux = this.SiguienteToken(); 
                            this.Expresion();
                            if (this.TokenCorrecto(this.tokenAux,"tk_pc")){
            
                                this.tokenAux = this.SiguienteToken(); 
                                if (this.TokenCorrecto(this.tokenAux,"tk_pyc")){
                
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

            this.tokenAux = this.SiguienteToken(); 
            this.Expresion();     

        } else if (this.TokenCorrecto(this.tokenAux,"tk_pa")){

            this.tokenAux = this.SiguienteToken();
            this.Valores();
            if (this.TokenCorrecto(this.tokenAux,"tk_pc")){

                this.tokenAux = this.SiguienteToken();      
                this.ListaDeclarariones();

            } else {
                this.cErrores++;
                            this.errorSyntax = true;            
                this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba )"));
            }        

        } else if (this.TokenCorrecto(this.tokenAux,"tk_add")){

            this.tokenAux = this.SiguienteToken();      

        } else if (this.TokenCorrecto(this.tokenAux,"tk_sus")){

            this.tokenAux = this.SiguienteToken();      

        } else {
            this.cErrores++;
                            this.errorSyntax = true;            
            this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba =, (, ++ o --"));
        } 

    }

    Variable(){

        if (this.TokenCorrecto(this.tokenAux,"tk_id")){

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

            this.tokenAux = this.SiguienteToken();
            this.Expresion();

        }
    }

    OtraVariable(){

        if (this.TokenCorrecto(this.tokenAux,"tk_coma")){

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

                    this.tokenAux = this.SiguienteToken();
                    if (this.TokenCorrecto(this.tokenAux,"tk_pa")){

                        this.tokenAux = this.SiguienteToken();
                        this.Parametros();
                        if (this.TokenCorrecto(this.tokenAux,"tk_pc")){

                            this.tokenAux = this.SiguienteToken();
                            if (this.TokenCorrecto(this.tokenAux,"tk_pyc")){

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

            this.tokenAux = this.SiguienteToken();
            this.Variable();
            if (this.TokenCorrecto(this.tokenAux,"tk_pyc")){

                this.tokenAux = this.SiguienteToken();      
                this.LInterfaz();

            } else {
                this.cErrores++;
                            this.errorSyntax = true;            
                this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba ;"));
            }  

        } else if (this.TokenCorrecto(this.tokenAux,"tk_id")){

            this.tokenAux = this.SiguienteToken();
            if (this.TokenCorrecto(this.tokenAux,"tk_igual")){

                this.tokenAux = this.SiguienteToken();
                this.Expresion();
                this.OtraAsignacion();
                if (this.TokenCorrecto(this.tokenAux,"tk_pyc")){

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

            this.tokenAux = this.SiguienteToken();
            this.Variable();
 

        } else if (this.TokenCorrecto(this.tokenAux,"tk_id")){

            this.tokenAux = this.SiguienteToken();
            if (this.TokenCorrecto(this.tokenAux,"tk_igual")){

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

            this.tokenAux = this.SiguienteToken();
            if (this.TokenCorrecto(this.tokenAux,"tk_id")){

                this.tokenAux = this.SiguienteToken();
                if (this.TokenCorrecto(this.tokenAux,"tk_igual")){
    
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

            this.tokenAux = this.SiguienteToken();
            if (this.TokenCorrecto(this.tokenAux,"tk_pa")){

                this.tokenAux = this.SiguienteToken();
                this.Expresion();
                if (this.TokenCorrecto(this.tokenAux,"tk_pc")){

                    this.tokenAux = this.SiguienteToken();
                    if (this.TokenCorrecto(this.tokenAux,"tk_la")){

                        this.tokenAux = this.SiguienteToken();
                        this.Instrucciones();
                        if (this.TokenCorrecto(this.tokenAux,"tk_lc")){

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

            this.tokenAux = this.SiguienteToken();
            if (this.TokenCorrecto(this.tokenAux,"tk_pa")){

                this.tokenAux = this.SiguienteToken();
                this.Dafor();
                if (this.TokenCorrecto(this.tokenAux,"tk_pyc")){

                    this.tokenAux = this.SiguienteToken();
                    this.Expresion();
                    if (this.TokenCorrecto(this.tokenAux,"tk_pyc")){

                        this.tokenAux = this.SiguienteToken();
                        this.Expresion();
                        if (this.TokenCorrecto(this.tokenAux,"tk_pc")){

                            this.tokenAux = this.SiguienteToken();
                            if (this.TokenCorrecto(this.tokenAux,"tk_la")){

                                this.tokenAux = this.SiguienteToken();
                                this.Instrucciones();
                                if (this.TokenCorrecto(this.tokenAux,"tk_lc")){
                    
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

            this.tokenAux = this.SiguienteToken();
            if (this.TokenCorrecto(this.tokenAux,"tk_pa")){

                this.tokenAux = this.SiguienteToken();
                this.Expresion();
                if (this.TokenCorrecto(this.tokenAux,"tk_pc")){
    
                    this.tokenAux = this.SiguienteToken();
                    if (this.TokenCorrecto(this.tokenAux,"tk_la")){
        
                        this.tokenAux = this.SiguienteToken();
                        this.Instrucciones();
                        if (this.TokenCorrecto(this.tokenAux,"tk_lc")){
            
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

            this.tokenAux = this.SiguienteToken();
            if (this.TokenCorrecto(this.tokenAux,"tk_la")){

                this.tokenAux = this.SiguienteToken();
                this.Instrucciones();
                if (this.TokenCorrecto(this.tokenAux,"tk_lc")){

                    this.tokenAux = this.SiguienteToken();
                    if (this.TokenCorrecto(this.tokenAux,"tk_while")){
        
                        this.tokenAux = this.SiguienteToken();
                        if (this.TokenCorrecto(this.tokenAux,"tk_pa")){

                            this.tokenAux = this.SiguienteToken();
                            this.Expresion();
                            if (this.TokenCorrecto(this.tokenAux,"tk_pc")){

                                this.tokenAux = this.SiguienteToken();
                                if (this.TokenCorrecto(this.tokenAux,"tk_pyc")){
                                    
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
                                    
            this.tokenAux = this.SiguienteToken();
            if (this.TokenCorrecto(this.tokenAux,"tk_pyc")){
                
                this.tokenAux = this.SiguienteToken();      
                this.Instrucciones();

            } else {
                this.cErrores++;
                            this.errorSyntax = true;            
                this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba ;"));
            }       
            

        } else if (this.TokenCorrecto(this.tokenAux,"tk_continue")){
                                    
            this.tokenAux = this.SiguienteToken();
            if (this.TokenCorrecto(this.tokenAux,"tk_pyc")){
                
                this.tokenAux = this.SiguienteToken();      
                this.Instrucciones();

            } else {
                this.cErrores++;
                            this.errorSyntax = true;            
                this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba ;"));
            }       
            

        } else if (this.TokenCorrecto(this.tokenAux,"tk_return")){
                                    
            this.tokenAux = this.SiguienteToken();
            this.Return();
            if (this.TokenCorrecto(this.tokenAux,"tk_pyc")){
                
                this.tokenAux = this.SiguienteToken();      
                this.Instrucciones();

            } else {
                this.cErrores++;
                            this.errorSyntax = true;            
                this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba ;"));
            }       
            

        } else if (this.TokenCorrecto(this.tokenAux,"tk_int") || this.TokenCorrecto(this.tokenAux,"tk_double") || this.TokenCorrecto(this.tokenAux,"tk_string") || this.TokenCorrecto(this.tokenAux,"tk_boolean") || this.TokenCorrecto(this.tokenAux,"tk_char")){

            this.tokenAux = this.SiguienteToken();
            this.Variable();
            if (this.TokenCorrecto(this.tokenAux,"tk_pyc")){

                this.tokenAux = this.SiguienteToken();      
                this.Instrucciones();

            } else {
                this.cErrores++;
                            this.errorSyntax = true;            
                this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba ;"));
            }  

        } else if (this.TokenCorrecto(this.tokenAux,"tk_id")){

            this.tokenAux = this.SiguienteToken();
            this.AsignacionLlamada();
            if (this.TokenCorrecto(this.tokenAux,"tk_pyc")){

                this.tokenAux = this.SiguienteToken();      
                this.Instrucciones();

            } else {
                this.cErrores++;
                            this.errorSyntax = true;            
                this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba ;"));
            }  

        } else if (this.TokenCorrecto(this.tokenAux,"tk_commentu")){

            this.tokenAux = this.SiguienteToken();      
            this.Instrucciones();

        } else if (this.TokenCorrecto(this.tokenAux,"tk_commentm")){

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
        
                            this.tokenAux = this.SiguienteToken(); 
                            this.Expresion();
                            if (this.TokenCorrecto(this.tokenAux,"tk_pc")){
            
                                this.tokenAux = this.SiguienteToken(); 
                                if (this.TokenCorrecto(this.tokenAux,"tk_pyc")){
                
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

            this.tokenAux = this.SiguienteToken();
            this.IDLLamada();
            this.EPrima();
                  
        } else if (this.TokenCorrecto(this.tokenAux,"tk_cadena")){

            this.tokenAux = this.SiguienteToken();
            this.EPrima();

                  
        } else if (this.TokenCorrecto(this.tokenAux,"tk_true")){

            this.tokenAux = this.SiguienteToken();
            this.EPrima();
                  
        } else if (this.TokenCorrecto(this.tokenAux,"tk_false")){

            this.tokenAux = this.SiguienteToken();
            this.EPrima();
                  
        } else if (this.TokenCorrecto(this.tokenAux,"tk_true")){

            this.tokenAux = this.SiguienteToken();
            this.EPrima();

                  
        } else if (this.TokenCorrecto(this.tokenAux,"tk_entero")){

            this.tokenAux = this.SiguienteToken();
            this.EPrima();

                  
        } else if (this.TokenCorrecto(this.tokenAux,"tk_decimal")){

            this.tokenAux = this.SiguienteToken();
            this.EPrima();

                   
        } else if (this.TokenCorrecto(this.tokenAux,"tk_menos")){

            this.tokenAux = this.SiguienteToken();
            this.EPrima();

                  
        } else if (this.TokenCorrecto(this.tokenAux,"tk_pa")){

            this.tokenAux = this.SiguienteToken();
            this.EPrima();
                  
        }
        
    }

    Parametros(){

        if (this.TokenCorrecto(this.tokenAux,"tk_int") || this.TokenCorrecto(this.tokenAux,"tk_double") || this.TokenCorrecto(this.tokenAux,"tk_string") || this.TokenCorrecto(this.tokenAux,"tk_boolean") || this.TokenCorrecto(this.tokenAux,"tk_char")){

            this.tokenAux = this.SiguienteToken();
            if (this.TokenCorrecto(this.tokenAux,"tk_id")){

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

            this.tokenAux = this.SiguienteToken();
            if (this.TokenCorrecto(this.tokenAux,"tk_id")){

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

            this.tokenAux = this.SiguienteToken();
            this.Parametro();
                  
        } 

    }

    IDLLamada(){

        if (this.TokenCorrecto(this.tokenAux,"tk_pa")){

            this.tokenAux = this.SiguienteToken();
            this.Valores();
            if (this.TokenCorrecto(this.tokenAux,"tk_pc")){

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

            this.tokenAux = this.SiguienteToken();
            this.IDLLamada();
            this.EPrima();
                  
        } else if (this.TokenCorrecto(this.tokenAux,"tk_cadena")){

            this.tokenAux = this.SiguienteToken();
            this.EPrima();

                  
        } else if (this.TokenCorrecto(this.tokenAux,"tk_true")){

            this.tokenAux = this.SiguienteToken();
            this.EPrima();
                  
        } else if (this.TokenCorrecto(this.tokenAux,"tk_false")){

            this.tokenAux = this.SiguienteToken();
            this.EPrima();
                  
        } else if (this.TokenCorrecto(this.tokenAux,"tk_true")){

            this.tokenAux = this.SiguienteToken();
            this.EPrima();

                  
        } else if (this.TokenCorrecto(this.tokenAux,"tk_entero")){

            this.tokenAux = this.SiguienteToken();
            this.EPrima();

                  
        } else if (this.TokenCorrecto(this.tokenAux,"tk_decimal")){

            this.tokenAux = this.SiguienteToken();
            this.EPrima();

                   
        } else if (this.TokenCorrecto(this.tokenAux,"tk_menos")){

            this.tokenAux = this.SiguienteToken();
            this.EPrima();

                  
        } else if (this.TokenCorrecto(this.tokenAux,"tk_pa")){

            this.tokenAux = this.SiguienteToken();
            this.EPrima();
                  
        } else {
            this.cErrores++;
                            this.errorSyntax = true;            
            this.errores.push(new Error(this.cErrores,this.tokenAux.getFila(),this.tokenAux.getColumna(),"Sintactico","Se encontró "+this.tokenAux.getLexema()+" y se esperaba una expresion"));
        }

    }

    Operador(){

        if (this.TokenCorrecto(this.tokenAux,"tk_mayor")){

            this.tokenAux = this.SiguienteToken();
            this.Expresion();
            this.EPrima();
                  
        } else if (this.TokenCorrecto(this.tokenAux,"tk_menor")){

            this.tokenAux = this.SiguienteToken();
            this.Expresion();
            this.EPrima();
                  
        } else if (this.TokenCorrecto(this.tokenAux,"tk_mayorigual")){

            this.tokenAux = this.SiguienteToken();
            this.Expresion();
            this.EPrima();
                  
        } else if (this.TokenCorrecto(this.tokenAux,"tk_menorigual")){

            this.tokenAux = this.SiguienteToken();
            this.Expresion();
            this.EPrima();
                  
        } else if (this.TokenCorrecto(this.tokenAux,"tk_igualigual")){

            this.tokenAux = this.SiguienteToken();
            this.Expresion();
            this.EPrima();
                  
        } else if (this.TokenCorrecto(this.tokenAux,"tk_noigual")){

            this.tokenAux = this.SiguienteToken();
            this.Expresion();
            this.EPrima();
                  
        } else if (this.TokenCorrecto(this.tokenAux,"tk_mas")){

            this.tokenAux = this.SiguienteToken();
            this.Expresion();
            this.EPrima();
                  
        } else if (this.TokenCorrecto(this.tokenAux,"tk_menos")){

            this.tokenAux = this.SiguienteToken();
            this.Expresion();
            this.EPrima();
                  
        } else if (this.TokenCorrecto(this.tokenAux,"tk_mul")){

            this.tokenAux = this.SiguienteToken();
            this.Expresion();
            this.EPrima();
                  
        } else if (this.TokenCorrecto(this.tokenAux,"tk_div")){

            this.tokenAux = this.SiguienteToken();
            this.Expresion();
            this.EPrima();
                  
        } else if (this.TokenCorrecto(this.tokenAux,"tk_and")){

            this.tokenAux = this.SiguienteToken();
            this.Expresion();
            this.EPrima();
                  
        } else if (this.TokenCorrecto(this.tokenAux,"tk_or")){

            this.tokenAux = this.SiguienteToken();
            this.Expresion();
            this.EPrima();
                  
        } else if (this.TokenCorrecto(this.tokenAux,"tk_not")){

            this.tokenAux = this.SiguienteToken();
            this.Expresion();
            this.EPrima();
                  
        } else if (this.TokenCorrecto(this.tokenAux,"tk_xor")){

            this.tokenAux = this.SiguienteToken();
            this.Expresion();
            this.EPrima();
                  
        } else if (this.TokenCorrecto(this.tokenAux,"tk_add")){

            this.tokenAux = this.SiguienteToken();
                  
        } else if (this.TokenCorrecto(this.tokenAux,"tk_sus")){

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

            this.tokenAux = this.SiguienteToken();
            if (this.TokenCorrecto(this.tokenAux,"tk_pa")){

                this.tokenAux = this.SiguienteToken();
                this.Expresion();
                if (this.TokenCorrecto(this.tokenAux,"tk_pc")){

                    this.tokenAux = this.SiguienteToken();
                    if (this.TokenCorrecto(this.tokenAux,"tk_la")){

                        this.tokenAux = this.SiguienteToken();
                        this.Instrucciones();
                        if (this.TokenCorrecto(this.tokenAux,"tk_lc")){

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

            this.tokenAux = this.SiguienteToken();
            this.Instrucciones();
            if (this.TokenCorrecto(this.tokenAux,"tk_lc")){

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
            this.tokenAux = this.SiguienteToken();
        } else if (this.TokenCorrecto(this.tokenAux,"tk_println")){
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

}

module.exports = Sintactico;