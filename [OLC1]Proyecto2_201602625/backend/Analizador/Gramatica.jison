
/*===========================================IMPORTS===========================================*/
%{
    const Nodo = require('../AST/nodoArbol');
    const Arbol = require('../AST/recorridoArbol');
    const fs = require('fs');
   
%}


/*===========================================LEXICO===========================================*/
%lex
%options case-sensitive
%%

"args"                  %{ return 'tk_args'; %}
"public"                %{ return 'tk_public'; %}
"class"                 %{ return 'tk_class'; %}
"interface"             %{ return 'tk_interface'; %}
"int"                   %{ return 'tk_int'; %}
"char"                  %{ return 'tk_char'; %}
"String"                %{ return 'tk_string'; %}
"double"                %{ return 'tk_double'; %}
"void"                  %{ return 'tk_void'; %}
"for"                   %{ return 'tk_for'; %}
"while"                 %{ return 'tk_while'; %}
"do"                    %{ return 'tk_do'; %}
"if"                    %{ return 'tk_if'; %}
"else"                  %{ return 'tk_else'; %}
"break"                 %{ return 'tk_break'; %}
"continue"              %{ return 'tk_continue'; %}
"return"                %{ return 'tk_return'; %}
"boolean"               %{ return 'tk_boolean'; %}
"true"                  %{ return 'tk_true'; %}
"false"                 %{ return 'tk_false'; %}
"static"                %{ return 'tk_static'; %}
"private"               %{ return 'tk_private'; %}
"main"                  %{ return 'tk_main'; %}
"System.out.println"    %{ return 'tk_println'; %}
"System.out.print"      %{ return 'tk_print'; %}
"&&"                    %{ return 'tk_and'; %}
"||"                    %{ return 'tk_or'; %}
"++"                    %{ return 'tk_add'; %}
"--"                    %{ return 'tk_sus'; %}
">="                    %{ return 'tk_mayorigual'; %}
"<="                    %{ return 'tk_menorigual'; %}
"=="                    %{ return 'tk_igualigual'; %}
"!="                    %{ return 'tk_noigual'; %}
">"                     %{ return 'tk_mayor'; %}
"<"                     %{ return 'tk_menor'; %}
"!"                     %{ return 'tk_not'; %}
"^"                     %{ return 'tk_xor'; %}
","                     %{ return 'tk_coma'; %}
"["                     %{ return 'tk_ca'; %}
"]"                     %{ return 'tk_cc'; %}
"{"                     %{ return 'tk_la'; %}
"}"                     %{ return 'tk_lc'; %}
"("                     %{ return 'tk_pa'; %}
")"                     %{ return 'tk_pc'; %}
";"                     %{ return 'tk_pyc'; %}
"+"                     %{ return 'tk_mas'; %}
"-"                     %{ return 'tk_menos'; %}
"*"                     %{ return 'tk_mul'; %}
"/"                     %{ return 'tk_div'; %}
"="                     %{ return 'tk_igual'; %}
"."                     %{ return 'tk_punto'; %}


\"[^\"]*\"              %{ yytext = yytext.substr(1, yyleng-2); return 'tk_cadena'; %}
[0-9]+"."[0-9]+\b             %{  return 'tk_decimal';  %}
[0-9]+\b                      %{  return 'tk_entero';  %}
([a-zA-Z])[a-zA-Z0-9_]*     %{ return 'tk_id'; %}
[/][/].*                      %{ yytext = yytext.substr(1, yyleng-2); return 'tk_commentu'; %}
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/] %{ yytext = yytext.substr(1, yyleng-2); return 'tk_commentm'; %}
[ \t\r\n\f] %{  /*Los Ignoramos*/   %}
<<EOF>>     %{  return 'EOF';   %}
.          { console.log('Error Lexico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); }

/lex


/*===========================================SINTACTICO===========================================*/

%left tk_mayor tk_menor tk_mayorigual tk_menorigual tk_igualigual tk_noigual tk_mas tk_menos tk_mul tk_div tk_and tk_or tk_not tk_xor tk_add tk_sus


%start INICIO
%% 

INICIO: LISTA_DECLARACIONES EOF {   $$ = new Nodo("INICIO","");
                                    $$.agregarHijo($1);
                                    var raiz = new Arbol();
                                    var contenido = "digraph G {" + raiz.recorrerDOT($$) + "}";
                                    fs.writeFile('codigo.dot', contenido, (err) => {
                                    if (err) throw err;
                                    console.log('Codigo dot generado correctamente.');
                                    });
                                    raiz.execDOT();
                                };

LISTA_DECLARACIONES: DPROGRAMA LISTA_DECLARACIONES  {   $$ = new Nodo("LISTA_DECLARACIONES","");
                                                        $$.agregarHijo($1);
                                                        $$.agregarHijo($2);  
                                                    }

    | /*EPSILON*/   {   $$ = new Nodo("LISTA_DECLARACIONES","");
                        $$.agregarHijo(new Nodo("E","simbolo"));
                    } ;


DPROGRAMA: VISIBILIDAD CLASE_INTERFAZ_METODO_FUNCION {  $$ = new Nodo("DPROGRAMA","");
                                                        $$.agregarHijo($1);
                                                        $$.agregarHijo($2);  
                                                    }

    | tk_if tk_pa EXPRESION tk_pc tk_la INSTRUCCIONES tk_lc ELSEIF  {   $$ = new Nodo("DPROGRAMA","");
                                                                        $$.agregarHijo(new Nodo($1,"palabra reservada"));
                                                                        $$.agregarHijo(new Nodo($2,"simbolo"));  
                                                                        $$.agregarHijo($3);
                                                                        $$.agregarHijo(new Nodo($4,"simbolo"));
                                                                        $$.agregarHijo(new Nodo($5,"simbolo"));
                                                                        $$.agregarHijo($6);  
                                                                        $$.agregarHijo(new Nodo($7,"simbolo")); 
                                                                        $$.agregarHijo($8);  
                                                                    }

    | tk_for tk_pa DAFOR tk_pyc EXPRESION tk_pyc EXPRESION tk_pc tk_la INSTRUCCIONES tk_lc  {   $$ = new Nodo("DPROGRAMA","");
                                                                                                $$.agregarHijo(new Nodo($1,"palabra reservada"));
                                                                                                $$.agregarHijo(new Nodo($2,"simbolo"));  
                                                                                                $$.agregarHijo($3);
                                                                                                $$.agregarHijo(new Nodo($4,"simbolo"));  
                                                                                                $$.agregarHijo($5);
                                                                                                $$.agregarHijo(new Nodo($6,"simbolo"));  
                                                                                                $$.agregarHijo($7);
                                                                                                $$.agregarHijo(new Nodo($8,"simbolo")); 
                                                                                                $$.agregarHijo(new Nodo($9,"simbolo")); 
                                                                                                $$.agregarHijo($10);
                                                                                                $$.agregarHijo(new Nodo($11,"simbolo")); 
                                                                                            }

    | tk_while tk_pa EXPRESION tk_pc tk_la INSTRUCCIONES tk_lc  {   $$ = new Nodo("DPROGRAMA","");
                                                                    $$.agregarHijo(new Nodo($1,"palabra reservada"));
                                                                    $$.agregarHijo(new Nodo($2,"simbolo"));  
                                                                    $$.agregarHijo($3);
                                                                    $$.agregarHijo(new Nodo($4,"simbolo")); 
                                                                    $$.agregarHijo(new Nodo($5,"simbolo")); 
                                                                    $$.agregarHijo($6);
                                                                    $$.agregarHijo(new Nodo($7,"simbolo"));
                                                                }

    | tk_do tk_la INSTRUCCIONES tk_lc tk_while tk_pa EXPRESION tk_pc tk_pyc {  $$ = new Nodo("DPROGRAMA","");
                                                                               $$.agregarHijo(new Nodo($1,"palabra reservada"));
                                                                               $$.agregarHijo(new Nodo($2,"simbolo"));  
                                                                               $$.agregarHijo($3);
                                                                               $$.agregarHijo(new Nodo($4,"simbolo")); 
                                                                               $$.agregarHijo(new Nodo($5,"palabra reservada"));
                                                                               $$.agregarHijo(new Nodo($6,"simbolo")); 
                                                                               $$.agregarHijo($7);
                                                                               $$.agregarHijo(new Nodo($8,"simbolo"));
                                                                               $$.agregarHijo(new Nodo($9,"simbolo"));  
                                                                            }

    | DECLARACION tk_pyc  {     $$ = new Nodo("DPROGRAMA","");
                                $$.agregarHijo($1);
                                $$.agregarHijo(new Nodo($2,"simbolo")); 
                            }

    | tk_id ASIGNACION_LLAMADA tk_pyc { $$ = new Nodo("DPROGRAMA","");
                                        $$.agregarHijo(new Nodo($1,"identificador")); 
                                        $$.agregarHijo($2);
                                        $$.agregarHijo(new Nodo($3,"simbolo")); 
                                      }

    | COMENTARIO

    | PRINT { $$ = new Nodo("DPROGRAMA","");
              $$.agregarHijo($1);
            }
    
    | error FINERROR {console.log("Error sintactico en la Linea: " + this._$.first_line + " en la Columna: " + this._$.first_column);};

FINERROR: tk_pyc

        | tk_lc

        | tk_pc;


DAFOR: DECLARACION {    $$ = new Nodo("DAFOR","");
                        $$.agregarHijo($1);
                    }

    | ASIGNACION OTRA_ASIGNACION    {   $$ = new Nodo("DAFOR","");
                                        $$.agregarHijo($1);
                                        $$.agregarHijo($2);
                                    } ;


ASIGNACION: tk_id tk_igual EXPRESION {  $$ = new Nodo("ASIGNACION","");
                                        $$.agregarHijo(new Nodo($1,"identificador"));
                                        $$.agregarHijo(new Nodo($2,"simbolo"));
                                        $$.agregarHijo($3);                                       
                                    } ;


OTRA_ASIGNACION: tk_coma ASIGNACION OTRA_ASIGNACION {   $$ = new Nodo("OTRA_ASIGNACION","");
                                                        $$.agregarHijo(new Nodo($1,"simbolo"));
                                                        $$.agregarHijo($2);
                                                        $$.agregarHijo($3);
                                                    } 

    | /*EPSILON*/   {   $$ = new Nodo("OTRA_ASIGNACION","");
                        $$.agregarHijo(new Nodo("E","simbolo"));
                    } ;


ELSEIF: tk_else ELSE  { $$ = new Nodo("ELSE","");
                        $$.agregarHijo(new Nodo($1,"palabra reservada"));
                        $$.agregarHijo($2);
                    } 

    | /*EPSILON*/   {   $$ = new Nodo("ELSEIF","");
                        $$.agregarHijo(new Nodo("E","simbolo"));
                    } ;


ELSE: tk_if tk_pa EXPRESION tk_pc tk_la INSTRUCCIONES tk_lc ELSEIF  {   $$ = new Nodo("ELSE","");
                                                                        $$.agregarHijo(new Nodo($1,"palabra reservada"));
                                                                        $$.agregarHijo(new Nodo($2,"simbolo"));
                                                                        $$.agregarHijo($3);
                                                                        $$.agregarHijo(new Nodo($4,"simbolo"));
                                                                        $$.agregarHijo(new Nodo($5,"simbolo"));
                                                                        $$.agregarHijo($6);
                                                                        $$.agregarHijo(new Nodo($7,"simbolo"));
                                                                        $$.agregarHijo($8);
                                                                    } 

    | tk_la INSTRUCCIONES tk_lc {   $$ = new Nodo("ELSE","");
                                    $$.agregarHijo(new Nodo($1,"simbolo"));
                                    $$.agregarHijo($2);
                                    $$.agregarHijo(new Nodo($3,"simbolo"));
                                }  ;



VISIBILIDAD: tk_public  {   $$ = new Nodo("VISIBILIDAD","");
                            $$.agregarHijo(new Nodo($1,"palabra reservada"));
                            }

    | tk_private {  $$ = new Nodo("VISIBILIDAD","");
                    $$.agregarHijo(new Nodo($1,"palabra reservada"));
                    } ;


CLASE_INTERFAZ_METODO_FUNCION: tk_class tk_id tk_la LISTA_DECLARACIONES tk_lc { $$ = new Nodo("CLASE_INTERFAZ_METODO_FUNCION","");
                                                                                $$.agregarHijo(new Nodo($1,"palabra reservada"));
                                                                                $$.agregarHijo(new Nodo($2,"identificador"));
                                                                                $$.agregarHijo(new Nodo($3,"simbolo"));
                                                                                $$.agregarHijo($4);
                                                                                $$.agregarHijo(new Nodo($5,"simbolo"));
                                                                            } 

    | tk_interface tk_id tk_la LINTERFAZ tk_lc  {   $$ = new Nodo("CLASE_INTERFAZ_METODO_FUNCION","");
                                                    $$.agregarHijo(new Nodo($1,"palabra reservada"));
                                                    $$.agregarHijo(new Nodo($2,"identificador"));
                                                    $$.agregarHijo(new Nodo($3,"simbolo"));
                                                    $$.agregarHijo($4);
                                                    $$.agregarHijo(new Nodo($5,"simbolo"));
                                                } 

    | tk_static tk_void tk_main tk_pa tk_string tk_ca tk_cc tk_args tk_pc tk_la INSTRUCCIONES tk_lc {   $$ = new Nodo("CLASE_INTERFAZ_METODO_FUNCION","");
                                                                                                        $$.agregarHijo(new Nodo($1,"palabra reservada"));
                                                                                                        $$.agregarHijo(new Nodo($2,"palabra reservada"));
                                                                                                        $$.agregarHijo(new Nodo($3,"palabra reservada"));
                                                                                                        $$.agregarHijo(new Nodo($4,"simbolo"));
                                                                                                        $$.agregarHijo(new Nodo($5,"palabra reservada"));
                                                                                                        $$.agregarHijo(new Nodo($6,"simbolo"));
                                                                                                        $$.agregarHijo(new Nodo($7,"simbolo"));
                                                                                                        $$.agregarHijo(new Nodo($8,"palabra reservada"));
                                                                                                        $$.agregarHijo(new Nodo($9,"simbolo"));
                                                                                                        $$.agregarHijo(new Nodo($10,"simbolo"));
                                                                                                        $$.agregarHijo($11);
                                                                                                        $$.agregarHijo(new Nodo($12,"simbolo"));
                                                                                                    }

    | TIPO_METODO_FUNCION tk_id tk_pa PARAMETROS tk_pc tk_la INSTRUCCIONES tk_lc {  $$ = new Nodo("CLASE_INTERFAZ_METODO_FUNCION","");
                                                                                    $$.agregarHijo($1);
                                                                                    $$.agregarHijo(new Nodo($2,"identificador"));
                                                                                    $$.agregarHijo(new Nodo($3,"simbolo"));
                                                                                    $$.agregarHijo($4);
                                                                                    $$.agregarHijo(new Nodo($5,"simbolo"));
                                                                                    $$.agregarHijo(new Nodo($6,"simbolo"));
                                                                                    $$.agregarHijo($7);
                                                                                    $$.agregarHijo(new Nodo($8,"simbolo"));
                                                                                } 

    | error FINERROR {console.log("Error sintactico en la Linea: " + this._$.first_line + " en la Columna: " + this._$.first_column);};


LINTERFAZ: DINTERFAZ LINTERFAZ {    $$ = new Nodo("lINTERFAZ","");
                                    $$.agregarHijo($1);
                                    $$.agregarHijo($2);
                                    }

    | /*EPSILON*/ { $$ = new Nodo("LINTERFAZ","");
                    $$.agregarHijo(new Nodo("E","simbolo"));
                  }  ;


DINTERFAZ: VISIBILIDAD DMETODONTERFAZ { $$ = new Nodo("DINTERFAZ","");
                                        $$.agregarHijo($1);
                                        $$.agregarHijo($2);
                                        }

    | DECLARACION tk_pyc { $$ = new Nodo("DINTERFAZ","");
                    $$.agregarHijo($1);
                    $$.agregarHijo(new Nodo($2,"simbolo"));
                  }

    | ASIGNACION tk_pyc { $$ = new Nodo("DINTERFAZ","");
                    $$.agregarHijo($1);
                    $$.agregarHijo(new Nodo($2,"simbolo"));
                  }
    
    | error FINERROR {console.log("Error sintactico en la Linea: " + this._$.first_line + " en la Columna: " + this._$.first_column);};


DMETODONTERFAZ: TIPO_METODO_FUNCION tk_id tk_pa PARAMETROS tk_pc tk_pyc {   $$ = new Nodo("DINSTRUCCION","");
                                                                            $$.agregarHijo($1);
                                                                            $$.agregarHijo(new Nodo($2,"identificador"));
                                                                            $$.agregarHijo(new Nodo($3,"simbolo"));
                                                                            $$.agregarHijo($4);
                                                                            $$.agregarHijo(new Nodo($5,"simbolo"));
                                                                            $$.agregarHijo(new Nodo($6,"simbolo"));
                                                                        } ;

 
TIPO_METODO_FUNCION: tk_void {  $$ = new Nodo("TIPO_METODO_FUNCION","");
                                $$.agregarHijo(new Nodo($1,"palabra reservada"));
             }

    | tk_int {  $$ = new Nodo("TIPO_METODO_FUNCION","");
                $$.agregarHijo(new Nodo($1,"palabra reservada"));
             }

    | tk_double {   $$ = new Nodo("TIPO_METODO_FUNCION","");
                    $$.agregarHijo(new Nodo($1,"palabra reservada"));
             }

    | tk_string {   $$ = new Nodo("TIPO_METODO_FUNCION","");
                    $$.agregarHijo(new Nodo($1,"palabra reservada"));
             }

    | tk_boolean {  $$ = new Nodo("TIPO_METODO_FUNCION","");
                    $$.agregarHijo(new Nodo($1,"palabra reservada"));
             }

    | tk_char { $$ = new Nodo("TIPO_METODO_FUNCION","");
                $$.agregarHijo(new Nodo($1,"palabra reservada"));
             } ;


TIPO_DATO: tk_int { $$ = new Nodo("TIPO_DATO","");
                    $$.agregarHijo(new Nodo($1,"palabra reservada"));
             }

    | tk_double {   $$ = new Nodo("TIPO_DATO","");
                    $$.agregarHijo(new Nodo($1,"palabra reservada"));
             }

    | tk_string {   $$ = new Nodo("TIPO_DATO","");
                    $$.agregarHijo(new Nodo($1,"palabra reservada"));
             }

    | tk_boolean {  $$ = new Nodo("TIPO_DATO","");
                    $$.agregarHijo(new Nodo($1,"palabra reservada"));
             }

    | tk_char { $$ = new Nodo("TIPO_DATO","");
                $$.agregarHijo(new Nodo($1,"palabra reservada"));
             } ;


INSTRUCCIONES: DINSTRUCCION INSTRUCCIONES { $$ = new Nodo("INSTRUCCIONES","");
                                            $$.agregarHijo($1);
                                            $$.agregarHijo($2);
                                            }

    |   /*EPSILON*/ {   $$ = new Nodo("INSTRUCCIONES","");
                        $$.agregarHijo(new Nodo("E","simbolo"));
                    }  ;


DINSTRUCCION: tk_if tk_pa EXPRESION tk_pc tk_la INSTRUCCIONES tk_lc ELSEIF  {   $$ = new Nodo("DINSTRUCCION","");
                                                                                $$.agregarHijo(new Nodo($1,"palabra reservada"));
                                                                                $$.agregarHijo(new Nodo($2,"simbolo"));  
                                                                                $$.agregarHijo($3);
                                                                                $$.agregarHijo(new Nodo($4,"simbolo"));
                                                                                $$.agregarHijo(new Nodo($5,"simbolo"));
                                                                                $$.agregarHijo($6);  
                                                                                $$.agregarHijo(new Nodo($7,"simbolo")); 
                                                                                $$.agregarHijo($8);  
                                                                            }

    | tk_for tk_pa DAFOR tk_pyc EXPRESION tk_pyc EXPRESION tk_pc tk_la INSTRUCCIONES tk_lc  {   $$ = new Nodo("DINSTRUCCION","");
                                                                                                $$.agregarHijo(new Nodo($1,"palabra reservada"));
                                                                                                $$.agregarHijo(new Nodo($2,"simbolo"));  
                                                                                                $$.agregarHijo($3);
                                                                                                $$.agregarHijo(new Nodo($4,"simbolo"));  
                                                                                                $$.agregarHijo($5);
                                                                                                $$.agregarHijo(new Nodo($6,"simbolo"));  
                                                                                                $$.agregarHijo($7);
                                                                                                $$.agregarHijo(new Nodo($8,"simbolo")); 
                                                                                                $$.agregarHijo(new Nodo($9,"simbolo")); 
                                                                                                $$.agregarHijo($10);
                                                                                                $$.agregarHijo(new Nodo($11,"simbolo")); 
                                                                                            }

    | tk_while tk_pa EXPRESION tk_pc tk_la INSTRUCCIONES tk_lc  {   $$ = new Nodo("DINSTRUCCION","");
                                                                    $$.agregarHijo(new Nodo($1,"palabra reservada"));
                                                                    $$.agregarHijo(new Nodo($2,"simbolo"));  
                                                                    $$.agregarHijo($3);
                                                                    $$.agregarHijo(new Nodo($4,"simbolo")); 
                                                                    $$.agregarHijo(new Nodo($5,"simbolo")); 
                                                                    $$.agregarHijo($6);
                                                                    $$.agregarHijo(new Nodo($7,"simbolo"));
                                                                }

    | tk_do tk_la INSTRUCCIONES tk_lc tk_while tk_pa EXPRESION tk_pc tk_pyc {  $$ = new Nodo("DINSTRUCCION","");
                                                                               $$.agregarHijo(new Nodo($1,"palabra reservada"));
                                                                               $$.agregarHijo(new Nodo($2,"simbolo"));  
                                                                               $$.agregarHijo($3);
                                                                               $$.agregarHijo(new Nodo($4,"simbolo")); 
                                                                               $$.agregarHijo(new Nodo($5,"palabra reservada"));
                                                                               $$.agregarHijo(new Nodo($6,"simbolo")); 
                                                                               $$.agregarHijo($7);
                                                                               $$.agregarHijo(new Nodo($8,"simbolo"));
                                                                               $$.agregarHijo(new Nodo($9,"simbolo"));  
                                                                            }

    | tk_break tk_pyc {  $$ = new Nodo("DINSTRUCCION","");
                         $$.agregarHijo(new Nodo($1,"palabra reservada")); 
                         $$.agregarHijo(new Nodo($2,"simbolo")); 
                        }

    | tk_continue tk_pyc {  $$ = new Nodo("DINSTRUCCION","");
                            $$.agregarHijo(new Nodo($1,"palabra reservada")); 
                            $$.agregarHijo(new Nodo($2,"simbolo")); 
                            }

    | tk_return RETURN tk_pyc { $$ = new Nodo("DINSTRUCCION","");
                                $$.agregarHijo(new Nodo($1,"palabra reservada")); 
                                $$.agregarHijo($2);
                                $$.agregarHijo(new Nodo($3,"simbolo")); 
                                }

    | DECLARACION tk_pyc { $$ = new Nodo("DINSTRUCCION","");
                    $$.agregarHijo($1);
                    $$.agregarHijo(new Nodo($2,"simbolo")); 
                  }

    | tk_id ASIGNACION_LLAMADA tk_pyc { $$ = new Nodo("DINSTRUCCION","");
                                        $$.agregarHijo(new Nodo($1,"identificador")); 
                                        $$.agregarHijo($2);
                                        $$.agregarHijo(new Nodo($3,"simbolo")); 
                                      }

    | COMENTARIO 

    | PRINT { $$ = new Nodo("DINSTRUCCION","");
              $$.agregarHijo($1);
            }

    | error FINERROR {console.log("Error sintactico en la Linea: " + this._$.first_line + " en la Columna: " + this._$.first_column);};


PARAMETROS: PARAMETRO OTRO_PARAMETRO { $$ = new Nodo("PARAMETROS","");
                                       $$.agregarHijo($1);
                                       $$.agregarHijo($2);
                                     }

    |  /*EPSILON*/ { $$ = new Nodo("PARAMETROS","");
                    $$.agregarHijo(new Nodo("E","simbolo"));
                  } ;


PARAMETRO: TIPO_DATO tk_id {    $$ = new Nodo("PARAMETRO","");
                                $$.agregarHijo($1);
                                $$.agregarHijo(new Nodo($2,"identificador"));                              
                            } ;


OTRO_PARAMETRO: tk_coma PARAMETRO OTRO_PARAMETRO { $$ = new Nodo("OTRO_PARAMETRO","");
                                                   $$.agregarHijo(new Nodo($1,"simbolo"));
                                                   $$.agregarHijo($2);
                                                   $$.agregarHijo($3);
                                                }

    |  /*EPSILON*/ { $$ = new Nodo("OTRO_PARAMETRO","");
                    $$.agregarHijo(new Nodo("E","simbolo"));
                  } ;


NUMERO: tk_entero { $$ = new Nodo("NUMERO","");
                    $$.agregarHijo(new Nodo($1,"entero"));
                 } 

    | tk_decimal {  $$ = new Nodo("NUMERO","");
                    $$.agregarHijo(new Nodo($1,"decimal"));
                 } ;


EXPRESION: tk_id ID_LLAMADA {   $$ = new Nodo("EXPRESION","");
                                $$.agregarHijo(new Nodo($1,"identificador"));
                                $$.agregarHijo($2);
                            } 

    | tk_cadena {  $$ = new Nodo("EXPRESION","");
                   $$.agregarHijo(new Nodo($1,"cadena"));
                } 

    | tk_true {  $$ = new Nodo("EXPRESION","");
                  $$.agregarHijo(new Nodo($1,"palabra reservada"));
               } 

    | tk_false {  $$ = new Nodo("EXPRESION","");
                  $$.agregarHijo(new Nodo($1,"palabra reservada"));
               } 

    | NUMERO {  $$ = new Nodo("EXPRESION","");
                $$.agregarHijo($1);
                } 

    | EXPRESION OPERADOR {  $$ = new Nodo("EXPRESION","");
                            $$.agregarHijo($1);
                            $$.agregarHijo($2);
                            } 

    | tk_menos EXPRESION {  $$ = new Nodo("EXPRESION","");
                            $$.agregarHijo(new Nodo($1,"operador"));
                            $$.agregarHijo($2);
                            } 

    | tk_pa EXPRESION tk_pc {  $$ = new Nodo("EXPRESION","");
                               $$.agregarHijo(new Nodo($1,"simbolo"));
                               $$.agregarHijo($2);
                               $$.agregarHijo(new Nodo($3,"simbolo"));
                            } 

    | error FINERROR {console.log("Error sintactico en la Linea: " + this._$.first_line + " en la Columna: " + this._$.first_column);};


ID_LLAMADA: tk_pa VALORES tk_pc { $$ = new Nodo("ID_LLAMADA","");
                               $$.agregarHijo(new Nodo($1,"simbolo"));
                               $$.agregarHijo($2);
                               $$.agregarHijo(new Nodo($3,"simbolo"));
                            } 

    | /*EPSILON*/ { $$ = new Nodo("ID_LLAMADA","");
                    $$.agregarHijo(new Nodo("E","simbolo"));
                  } ;


OPERADOR: tk_mayor EXPRESION { $$ = new Nodo("OPERADOR","");
                               $$.agregarHijo(new Nodo($1,"operador"));
                               $$.agregarHijo($2);
                            } 

    | tk_menor EXPRESION { $$ = new Nodo("OPERADOR","");
                           $$.agregarHijo(new Nodo($1,"operador"));
                           $$.agregarHijo($2);
                        } 

    | tk_mayorigual EXPRESION { $$ = new Nodo("OPERADOR","");
                                $$.agregarHijo(new Nodo($1,"operador"));
                                $$.agregarHijo($2);
                              } 

    | tk_menorigual EXPRESION { $$ = new Nodo("OPERADOR","");
                                $$.agregarHijo(new Nodo($1,"operador"));
                                $$.agregarHijo($2);
                                } 

    | tk_igualigual EXPRESION { $$ = new Nodo("OPERADOR","");
                                $$.agregarHijo(new Nodo($1,"operador"));
                                $$.agregarHijo($2);
                                } 

    | tk_noigual EXPRESION { $$ = new Nodo("OPERADOR","");
                             $$.agregarHijo(new Nodo($1,"operador"));
                             $$.agregarHijo($2);
                        } 

    | tk_mas EXPRESION { $$ = new Nodo("OPERADOR","");
                         $$.agregarHijo(new Nodo($1,"operador"));
                         $$.agregarHijo($2);
                        } 

    | tk_menos EXPRESION { $$ = new Nodo("OPERADOR","");
                         $$.agregarHijo(new Nodo($1,"operador"));
                         $$.agregarHijo($2);
                        } 

    | tk_mul EXPRESION { $$ = new Nodo("OPERADOR","");
                         $$.agregarHijo(new Nodo($1,"operador"));
                         $$.agregarHijo($2);
                        } 

    | tk_div EXPRESION { $$ = new Nodo("OPERADOR","");
                         $$.agregarHijo(new Nodo($1,"operador"));
                         $$.agregarHijo($2);
                        } 

    | tk_and EXPRESION { $$ = new Nodo("OPERADOR","");
                         $$.agregarHijo(new Nodo($1,"operador"));
                         $$.agregarHijo($2);
                        } 

    | tk_or EXPRESION { $$ = new Nodo("OPERADOR","");
                         $$.agregarHijo(new Nodo($1,"operador"));
                         $$.agregarHijo($2);
                        } 

    | tk_not EXPRESION { $$ = new Nodo("OPERADOR","");
                         $$.agregarHijo(new Nodo($1,"operador"));
                         $$.agregarHijo($2);
                        } 

    | tk_xor EXPRESION { $$ = new Nodo("OPERADOR","");
                         $$.agregarHijo(new Nodo($1,"operador"));
                         $$.agregarHijo($2);
                        } 

    | tk_add { $$ = new Nodo("OPERADOR","");
               $$.agregarHijo(new Nodo($1,"operador"));
             } 

    | tk_sus { $$ = new Nodo("OPERADOR","");
               $$.agregarHijo(new Nodo($1,"operador"));
             }  ;


RETURN: EXPRESION { $$ = new Nodo("RETURN","");
                    $$.agregarHijo($1);
                  }

    | /*EPSILON*/ { $$ = new Nodo("RETURN","");
                    $$.agregarHijo(new Nodo("E","simbolo"));
                  } ;


COMENTARIO: tk_commentu 

    | tk_commentm;


DECLARACION: TIPO_DATO VARIABLE OTRA_VARIABLE { $$ = new Nodo("DECLARACION","");
                                                       $$.agregarHijo($1);
                                                       $$.agregarHijo($2);
                                                       $$.agregarHijo($3);
                                                     } ;


VARIABLE: tk_id ASIGNACION_VARIABLE { $$ = new Nodo("VARIABLE","");
                                      $$.agregarHijo(new Nodo($1,"simbolo"));
                                      $$.agregarHijo($2);
                                       } ;


ASIGNACION_VARIABLE: tk_igual EXPRESION { $$ = new Nodo("ASIGNACION_VARIABLE","");
                                         $$.agregarHijo(new Nodo($1,"simbolo"));
                                         $$.agregarHijo($2);
                                       }

    | /*EPSILON*/ { $$ = new Nodo("ASIGNACION_VARIABLE","");
                    $$.agregarHijo(new Nodo("E","simbolo"));
                  } ;


OTRA_VARIABLE: tk_coma VARIABLE OTRA_VARIABLE { $$ = new Nodo("OTRA_VARIABLE","");
                                                $$.agregarHijo(new Nodo($1,"simbolo"));
                                                $$.agregarHijo($2);
                                                $$.agregarHijo($3);
                                              }

    | /*EPSILON*/ { $$ = new Nodo("OTRA_VARIABLE","");
                    $$.agregarHijo(new Nodo("E","simbolo"));
                  } ;


ASIGNACION_LLAMADA: tk_igual EXPRESION { $$ = new Nodo("ASIGNACION_LLAMADA","");
                                         $$.agregarHijo(new Nodo($1,"simbolo"));
                                         $$.agregarHijo($2);
                                       }

    | tk_pa VALORES tk_pc { $$ = new Nodo("ASIGNACION_LLAMADA","");
                            $$.agregarHijo(new Nodo($1,"simbolo"));
                            $$.agregarHijo($2);
                            $$.agregarHijo(new Nodo($3,"simbolo"));
                          }

    | tk_add { $$ = new Nodo("ASIGNACION_LLAMADA","");
               $$.agregarHijo(new Nodo($1,"operador"));
             }

    | tk_sus { $$ = new Nodo("ASIGNACION_LLAMADA","");
               $$.agregarHijo(new Nodo($1,"operador"));
             }

    | error FINERROR {console.log("Error sintactico en la Linea: " + this._$.first_line + " en la Columna: " + this._$.first_column);};


VALORES: EXPRESION OTRO_VALOR { $$ = new Nodo("VALORES","");
                                $$.agregarHijo($1);
                                $$.agregarHijo($2);
                              }

    | /*EPSILON*/ { $$ = new Nodo("VALORES","");
                    $$.agregarHijo(new Nodo("E","simbolo"));
                  } ;


OTRO_VALOR: tk_coma EXPRESION OTRO_VALOR { $$ = new Nodo("OTRO_VALOR","");
                                           $$.agregarHijo(new Nodo($1,"simbolo"));
                                           $$.agregarHijo($2);
                                           $$.agregarHijo($3);
                                         }

    | /*EPSILON*/ { $$ = new Nodo("OTRO_VALOR","");
                    $$.agregarHijo(new Nodo("E","simbolo"));
                  } ;


PRINT: tk_println tk_pa EXPRESION tk_pc tk_pyc {  $$ = new Nodo("PRINT","");
                                               $$.agregarHijo(new Nodo($1,"funcion"));
                                               $$.agregarHijo(new Nodo($2,"simbolo"));
                                               $$.agregarHijo($3);
                                               $$.agregarHijo(new Nodo($4,"simbolo"));
                                               $$.agregarHijo(new Nodo($5,"simbolo"));
                                            }

    | tk_print tk_pa EXPRESION tk_pc tk_pyc {  $$ = new Nodo("PRINT","");
                                               $$.agregarHijo(new Nodo($1,"funcion"));
                                               $$.agregarHijo(new Nodo($2,"simbolo"));
                                               $$.agregarHijo($3);
                                               $$.agregarHijo(new Nodo($4,"simbolo"));
                                               $$.agregarHijo(new Nodo($5,"simbolo"));
                                            } ;







