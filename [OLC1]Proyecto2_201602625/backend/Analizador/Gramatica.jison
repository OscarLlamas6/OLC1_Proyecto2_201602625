
/*===========================================IMPORTS===========================================*/
%{
    const Nodo = require('../AST/nodoArbol');
    const Arbol = require('../AST/recorridoArbol');
    const Token = require('../AST/token');
    const Lista = require('../AST/listaTokens');
    const Error = require('../AST/error');
    const ListaE = require('../AST/listaErrores');
    const fs = require('fs');
    var miLista = new Lista();
    var miListaE = new ListaE();
    var Numero = 1;
    var NumeroE = 1;

%}


/*===========================================LEXICO===========================================*/
%lex
%options case-sensitive
%%

[/][/].*                            %{ miLista.agregarToken(new Token(Numero, yylloc.first_line, yylloc.first_column + 1, "comentario", yytext)); Numero++;  return 'tk_commentu'; %}
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/] %{ miLista.agregarToken(new Token(Numero, yylloc.first_line, yylloc.first_column + 1, "comentario", yytext)); Numero++;  return 'tk_commentm'; %}                    
"args"                  %{ miLista.agregarToken(new Token(Numero, yylloc.first_line, yylloc.first_column + 1, "palabra reservada", yytext)); Numero++; return 'tk_args'; %}
"public"                %{ miLista.agregarToken(new Token(Numero, yylloc.first_line, yylloc.first_column + 1, "palabra reservada", yytext)); Numero++; return 'tk_public'; %}
"class"                 %{ miLista.agregarToken(new Token(Numero, yylloc.first_line, yylloc.first_column + 1, "palabra reservada", yytext)); Numero++; return 'tk_class'; %}
"interface"             %{ miLista.agregarToken(new Token(Numero, yylloc.first_line, yylloc.first_column + 1, "palabra reservada", yytext)); Numero++; return 'tk_interface'; %}
"int"                   %{ miLista.agregarToken(new Token(Numero, yylloc.first_line, yylloc.first_column + 1, "palabra reservada", yytext)); Numero++; return 'tk_int'; %}
"char"                  %{ miLista.agregarToken(new Token(Numero, yylloc.first_line, yylloc.first_column + 1, "palabra reservada", yytext)); Numero++; return 'tk_char'; %}
"String"                %{ miLista.agregarToken(new Token(Numero, yylloc.first_line, yylloc.first_column + 1, "palabra reservada", yytext)); Numero++; return 'tk_string'; %}
"double"                %{ miLista.agregarToken(new Token(Numero, yylloc.first_line, yylloc.first_column + 1, "palabra reservada", yytext)); Numero++; return 'tk_double'; %}
"void"                  %{ miLista.agregarToken(new Token(Numero, yylloc.first_line, yylloc.first_column + 1, "palabra reservada", yytext)); Numero++; return 'tk_void'; %}
"for"                   %{ miLista.agregarToken(new Token(Numero, yylloc.first_line, yylloc.first_column + 1, "palabra reservada", yytext)); Numero++; return 'tk_for'; %}
"while"                 %{ miLista.agregarToken(new Token(Numero, yylloc.first_line, yylloc.first_column + 1, "palabra reservada", yytext)); Numero++; return 'tk_while'; %}
"do"                    %{ miLista.agregarToken(new Token(Numero, yylloc.first_line, yylloc.first_column + 1, "palabra reservada", yytext)); Numero++; return 'tk_do'; %}
"if"                    %{ miLista.agregarToken(new Token(Numero, yylloc.first_line, yylloc.first_column + 1, "palabra reservada", yytext)); Numero++; return 'tk_if'; %}
"else"                  %{ miLista.agregarToken(new Token(Numero, yylloc.first_line, yylloc.first_column + 1, "palabra reservada", yytext)); Numero++; return 'tk_else'; %}
"break"                 %{ miLista.agregarToken(new Token(Numero, yylloc.first_line, yylloc.first_column + 1, "palabra reservada", yytext)); Numero++; return 'tk_break'; %}
"continue"              %{ miLista.agregarToken(new Token(Numero, yylloc.first_line, yylloc.first_column + 1, "palabra reservada", yytext)); Numero++; return 'tk_continue'; %}
"return"                %{ miLista.agregarToken(new Token(Numero, yylloc.first_line, yylloc.first_column + 1, "palabra reservada", yytext)); Numero++; return 'tk_return'; %}
"boolean"               %{ miLista.agregarToken(new Token(Numero, yylloc.first_line, yylloc.first_column + 1, "palabra reservada", yytext)); Numero++; return 'tk_boolean'; %}
"true"                  %{ miLista.agregarToken(new Token(Numero, yylloc.first_line, yylloc.first_column + 1, "palabra reservada", yytext)); Numero++; return 'tk_true'; %}
"false"                 %{ miLista.agregarToken(new Token(Numero, yylloc.first_line, yylloc.first_column + 1, "palabra reservada", yytext)); Numero++; return 'tk_false'; %}
"static"                %{ miLista.agregarToken(new Token(Numero, yylloc.first_line, yylloc.first_column + 1, "palabra reservada", yytext)); Numero++; return 'tk_static'; %}
"private"               %{ miLista.agregarToken(new Token(Numero, yylloc.first_line, yylloc.first_column + 1, "palabra reservada", yytext)); Numero++; return 'tk_private'; %}
"main"                  %{ miLista.agregarToken(new Token(Numero, yylloc.first_line, yylloc.first_column + 1, "palabra reservada", yytext)); Numero++; return 'tk_main'; %}
"System.out.println"    %{ miLista.agregarToken(new Token(Numero, yylloc.first_line, yylloc.first_column + 1, "funcion", yytext)); Numero++; return 'tk_println'; %}
"System.out.print"      %{ miLista.agregarToken(new Token(Numero, yylloc.first_line, yylloc.first_column + 1, "funcion", yytext)); Numero++; return 'tk_print'; %}
"&&"                    %{ miLista.agregarToken(new Token(Numero, yylloc.first_line, yylloc.first_column + 1, "operador logico", yytext)); Numero++; return 'tk_and'; %}
"||"                    %{ miLista.agregarToken(new Token(Numero, yylloc.first_line, yylloc.first_column + 1, "operador logico", yytext)); Numero++; return 'tk_or'; %}
"++"                    %{ miLista.agregarToken(new Token(Numero, yylloc.first_line, yylloc.first_column + 1, "operador aritmetico", yytext)); Numero++; return 'tk_add'; %}
"--"                    %{ miLista.agregarToken(new Token(Numero, yylloc.first_line, yylloc.first_column + 1, "operador aritmetico", yytext)); Numero++; return 'tk_sus'; %}
">="                    %{ miLista.agregarToken(new Token(Numero, yylloc.first_line, yylloc.first_column + 1, "operador relacional", yytext)); Numero++; return 'tk_mayorigual'; %}
"<="                    %{ miLista.agregarToken(new Token(Numero, yylloc.first_line, yylloc.first_column + 1, "operador relacional", yytext)); Numero++; return 'tk_menorigual'; %}
"=="                    %{ miLista.agregarToken(new Token(Numero, yylloc.first_line, yylloc.first_column + 1, "operador relacional", yytext)); Numero++; return 'tk_igualigual'; %}
"!="                    %{ miLista.agregarToken(new Token(Numero, yylloc.first_line, yylloc.first_column + 1, "operador relacional", yytext)); Numero++; return 'tk_noigual'; %}
">"                     %{ miLista.agregarToken(new Token(Numero, yylloc.first_line, yylloc.first_column + 1, "operador relacional", yytext)); Numero++; return 'tk_mayor'; %}
"<"                     %{ miLista.agregarToken(new Token(Numero, yylloc.first_line, yylloc.first_column + 1, "operador relacional", yytext)); Numero++; return 'tk_menor'; %}
"!"                     %{ miLista.agregarToken(new Token(Numero, yylloc.first_line, yylloc.first_column + 1, "operador logico", yytext)); Numero++; return 'tk_not'; %}
"^"                     %{ miLista.agregarToken(new Token(Numero, yylloc.first_line, yylloc.first_column + 1, "operador logico", yytext)); Numero++; return 'tk_xor'; %}
","                     %{ miLista.agregarToken(new Token(Numero, yylloc.first_line, yylloc.first_column + 1, "simbolo", yytext)); Numero++; return 'tk_coma'; %}
"["                     %{ miLista.agregarToken(new Token(Numero, yylloc.first_line, yylloc.first_column + 1, "simbolo", yytext)); Numero++; return 'tk_ca'; %}
"]"                     %{ miLista.agregarToken(new Token(Numero, yylloc.first_line, yylloc.first_column + 1, "simbolo", yytext)); Numero++; return 'tk_cc'; %}
"{"                     %{ miLista.agregarToken(new Token(Numero, yylloc.first_line, yylloc.first_column + 1, "simbolo", yytext)); Numero++; return 'tk_la'; %}
"}"                     %{ miLista.agregarToken(new Token(Numero, yylloc.first_line, yylloc.first_column + 1, "simbolo", yytext)); Numero++; return 'tk_lc'; %}
"("                     %{ miLista.agregarToken(new Token(Numero, yylloc.first_line, yylloc.first_column + 1, "simbolo", yytext)); Numero++; return 'tk_pa'; %}
")"                     %{ miLista.agregarToken(new Token(Numero, yylloc.first_line, yylloc.first_column + 1, "simbolo", yytext)); Numero++; return 'tk_pc'; %}
";"                     %{ miLista.agregarToken(new Token(Numero, yylloc.first_line, yylloc.first_column + 1, "simbolo", yytext)); Numero++; return 'tk_pyc'; %}
"+"                     %{ miLista.agregarToken(new Token(Numero, yylloc.first_line, yylloc.first_column + 1, "operador aritmetico", yytext)); Numero++; return 'tk_mas'; %}
"-"                     %{ miLista.agregarToken(new Token(Numero, yylloc.first_line, yylloc.first_column + 1, "operador aritmetico", yytext)); Numero++; return 'tk_menos'; %}
"*"                     %{ miLista.agregarToken(new Token(Numero, yylloc.first_line, yylloc.first_column + 1, "operador aritmetico", yytext)); Numero++; return 'tk_mul'; %}
"/"                     %{ miLista.agregarToken(new Token(Numero, yylloc.first_line, yylloc.first_column + 1, "operador aritmetico", yytext)); Numero++; return 'tk_div'; %}
"="                     %{ miLista.agregarToken(new Token(Numero, yylloc.first_line, yylloc.first_column + 1, "simbolo", yytext)); Numero++; return 'tk_igual'; %}
"."                     %{ miLista.agregarToken(new Token(Numero, yylloc.first_line, yylloc.first_column + 1, "simbolo", yytext)); Numero++; return 'tk_punto'; %}


\"[^\"]*\"              %{ yytext = yytext.substr(1, yyleng-2); miLista.agregarToken(new Token(Numero, yylloc.first_line, yylloc.first_column + 1, "cadena", yytext)); Numero++; return 'tk_cadena'; %}
[0-9]+"."[0-9]+\b             %{ miLista.agregarToken(new Token(Numero, yylloc.first_line, yylloc.first_column + 1, "numerico", yytext)); Numero++; return 'tk_decimal';  %}
[0-9]+\b                      %{ miLista.agregarToken(new Token(Numero, yylloc.first_line, yylloc.first_column + 1, "numerico", yytext)); Numero++;  return 'tk_entero';  %}
([a-zA-Z_])[a-zA-Z0-9_]*     %{ miLista.agregarToken(new Token(Numero, yylloc.first_line, yylloc.first_column + 1, "identificador", yytext)); Numero++;  return 'tk_id'; %}
[ \t\r\n\f] %{  /*Los Ignoramos*/   %}
<<EOF>>     %{  return 'EOF';   %}
.          { miListaE.agregarError(new Error(NumeroE, yylloc.first_line, yylloc.first_column + 1, "Lexico", "El caracter " + yytext + " no pertenece al lenguaje.")); NumeroE++; }

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
                                      raiz.execDOT();
                                    });                                  
                                    miLista.ReporteTokens();
                                    miListaE.ReporteErrores();
                                    return miListaE.getErrores();
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

    | COMENTARIO {    $$ = new Nodo("DPROGRAMA","");
                      $$.agregarHijo($1);
                            }

    | PRINT { $$ = new Nodo("DPROGRAMA","");
              $$.agregarHijo($1);
            }
    
    | error FINERROR {  $$ = new Nodo("DPROGRAMA","");
                        $$.agregarHijo(new Nodo("Error",""));                    
                        miListaE.agregarError(new Error(NumeroE, yylineno, 1, "Sintactico", yytext)); NumeroE++;  };

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

    | error FINERROR {  $$ = new Nodo("CLASE_INTERFAZ_METODO_FUNCION","");
                        $$.agregarHijo(new Nodo("Error",""));                    
                        miListaE.agregarError(new Error(NumeroE, yylineno, 1, "Sintactico", yytext)); NumeroE++; };


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
    
    | error FINERROR {  $$ = new Nodo("DINTERFAZ","");
                        $$.agregarHijo(new Nodo("Error",""));                    
                        miListaE.agregarError(new Error(NumeroE, yylineno, 1, "Sintactico", yytext)); NumeroE++; };


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

    | COMENTARIO {     $$ = new Nodo("DINSTRUCCION","");
                                $$.agregarHijo($1);
                            }

    | PRINT { $$ = new Nodo("DINSTRUCCION","");
              $$.agregarHijo($1);
            }

    | error FINERROR {  $$ = new Nodo("DINSTRUCCION","");
                        $$.agregarHijo(new Nodo("Error",""));                    
                        miListaE.agregarError(new Error(NumeroE, yylineno, 1, "Sintactico", yytext)); NumeroE++; };


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

    | tk_not EXPRESION {  $$ = new Nodo("EXPRESION","");
                        $$.agregarHijo(new Nodo($1,"operador"));
                        $$.agregarHijo($2);
                        } 

    | tk_pa EXPRESION tk_pc {  $$ = new Nodo("EXPRESION","");
                               $$.agregarHijo(new Nodo($1,"simbolo"));
                               $$.agregarHijo($2);
                               $$.agregarHijo(new Nodo($3,"simbolo"));
                            } 

    | error FINERROR {  $$ = new Nodo("EXPRESION","");
                        $$.agregarHijo(new Nodo("Error",""));                    
                        miListaE.agregarError(new Error(NumeroE, yylineno, 1, "Sintactico", yytext)); NumeroE++; };


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


COMENTARIO: tk_commentu {   $$ = new Nodo("COMENTARIO","");
                            $$.agregarHijo(new Nodo($1,"comentario")); 
                            } 

    | tk_commentm {   $$ = new Nodo("COMENTARIO","");
                      $$.agregarHijo(new Nodo($1,"comentario")); 
                      } ;


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

    | error FINERROR {  $$ = new Nodo("ASIGNACION_LLAMADA","");
                        $$.agregarHijo(new Nodo("Error",""));                    
                        miListaE.agregarError(new Error(NumeroE, yylineno, 1, "Sintactico", yytext)); NumeroE++;  };


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







