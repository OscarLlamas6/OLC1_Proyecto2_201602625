/*===========================================IMPORTS===========================================*/
%{
    const Generador = require('../AST/archivoJS');
    var Salida = new Generador();
%}


/*===========================================LEXICO===========================================*/
%lex
%options case-sensitive
%%

[/][/].*                            %{ return 'tk_commentu'; %}
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/] %{ return 'tk_commentm'; %}                 
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


\"[^\"]*\"              %{ return 'tk_cadena'; %}
[0-9]+"."[0-9]+\b             %{ return 'tk_decimal';  %}
[0-9]+\b                      %{ return 'tk_entero';  %}
([a-zA-Z])[a-zA-Z0-9_]*     %{ return 'tk_id'; %}
[ \t\r\n\f] %{  /*Los Ignoramos*/   %}
<<EOF>>     %{  return 'EOF';   %}
.          { }

/lex


/*===========================================SINTACTICO===========================================*/

%left tk_mayor tk_menor tk_mayorigual tk_menorigual tk_igualigual tk_noigual tk_mas tk_menos tk_mul tk_div tk_and tk_or tk_not tk_xor tk_add tk_sus


%start INICIO
%% 

INICIO: LISTA_DECLARACIONES EOF { $$ = $1 ; $$ = $$.replace("! ", "!"); Salida.crearArchivo($$); return $$; };

LISTA_DECLARACIONES: DPROGRAMA LISTA_DECLARACIONES  { $$ = $1 + $2; }

    | /*EPSILON*/   { $$ = ""; } ;


DPROGRAMA: VISIBILIDAD CLASE_INTERFAZ_METODO_FUNCION { $$ = $2; }

    | tk_if tk_pa EXPRESION tk_pc tk_la INSTRUCCIONES tk_lc ELSEIF  { $$ = "if (" + $3 + "){\n  " + $6 + "}" + $8; }

    | tk_for tk_pa DAFOR tk_pyc EXPRESION tk_pyc EXPRESION tk_pc tk_la INSTRUCCIONES tk_lc  { $$ = "for (" + $3 + "; " + $5 + "; " + $7 + "){\n " + $10 + "}\n"; }

    | tk_while tk_pa EXPRESION tk_pc tk_la INSTRUCCIONES tk_lc  { $$ = "while (" + $3 + "){\n   " + $6 + "}\n";  }

    | tk_do tk_la INSTRUCCIONES tk_lc tk_while tk_pa EXPRESION tk_pc tk_pyc { $$ = "do {\n  " + $3 + "} while (" + $7 + ");\n"; }

    | DECLARACION tk_pyc  { $$ = $1 + ";\n"; }

    | tk_id ASIGNACION_LLAMADA tk_pyc { $$ = $1 + $2 + ";\n"; }

    | COMENTARIO { $$ = $1; }

    | PRINT { $$ = $1; }
    
    | error FINERROR { $$ = "";  };

FINERROR: tk_pyc

        | tk_lc

        | tk_pc;


DAFOR: DECLARACION { $$ = $1; }

    | ASIGNACION OTRA_ASIGNACION { $$ = $1 + $2; } ;


ASIGNACION: tk_id tk_igual EXPRESION { $$ = $1 + " = " + $3; } ;


OTRA_ASIGNACION: tk_coma ASIGNACION OTRA_ASIGNACION { $$ = ", " + $2 + $3; } 

    | /*EPSILON*/   { $$ = ""; } ;


ELSEIF: tk_else ELSE  { $$ = " else" + $2; } 

    | /*EPSILON*/   { $$ = "\n"; } ;


ELSE: tk_if tk_pa EXPRESION tk_pc tk_la INSTRUCCIONES tk_lc ELSEIF  { $$ = " if (" + $3 + "){\n " + $6 + "}" + $8; } 

    | tk_la INSTRUCCIONES tk_lc { $$ = " {\n " + $2 + "}\n"; }  ;



VISIBILIDAD: tk_public  { $$ = ""; }

    | tk_private { $$ = ""; } ;


CLASE_INTERFAZ_METODO_FUNCION: tk_class tk_id tk_la LISTA_DECLARACIONES tk_lc { $$ = "class " + $2 + "{\n   constructor(){\n    }\n \n" + $4 + "}\n"; } 

    | tk_interface tk_id tk_la LINTERFAZ tk_lc  { $$ = ""; } 

    | tk_static tk_void tk_main tk_pa tk_string tk_ca tk_cc tk_args tk_pc tk_la INSTRUCCIONES tk_lc { $$ = "main(){\n   " + $11 + "}\n"; }

    | TIPO_METODO_FUNCION tk_id tk_pa PARAMETROS tk_pc tk_la INSTRUCCIONES tk_lc { $$ = "function " + $2 + "(" + $4 + "){\n " + $7 + "}\n"; } 

    | error FINERROR { $$ = ""; };


LINTERFAZ: DINTERFAZ LINTERFAZ { $$ = ""; }

    | /*EPSILON*/ { $$ = ""; }  ;


DINTERFAZ: VISIBILIDAD DMETODONTERFAZ { $$ = ""; }

    | DECLARACION tk_pyc { $$ = ""; }

    | ASIGNACION tk_pyc { $$ = ""; }
    
    | error FINERROR { $$ = "";  };


DMETODONTERFAZ: TIPO_METODO_FUNCION tk_id tk_pa PARAMETROS tk_pc tk_pyc { $$ = ""; } ;

 
TIPO_METODO_FUNCION: tk_void { $$ = ""; }

    | tk_int { $$ = ""; }

    | tk_double { $$ = ""; }

    | tk_string { $$ = ""; }

    | tk_boolean { $$ = ""; }

    | tk_char { $$ = ""; } ;


TIPO_DATO: tk_int { $$ = ""; }

    | tk_double { $$ = ""; }

    | tk_string { $$ = "";  }

    | tk_boolean { $$ = ""; }

    | tk_char { $$ = "";  } ;


INSTRUCCIONES: DINSTRUCCION INSTRUCCIONES { $$ = $1 + $2;  }

    |   /*EPSILON*/ { $$ = ""; }  ;


DINSTRUCCION: tk_if tk_pa EXPRESION tk_pc tk_la INSTRUCCIONES tk_lc ELSEIF  { $$ = "if (" + $3 + "){\n  " + $6 + "}" + $8; }

    | tk_for tk_pa DAFOR tk_pyc EXPRESION tk_pyc EXPRESION tk_pc tk_la INSTRUCCIONES tk_lc  { $$ = "for (" + $3 + "; " + $5 + "; " + $7 + "){\n " + $10 + "}\n"; }

    | tk_while tk_pa EXPRESION tk_pc tk_la INSTRUCCIONES tk_lc  { $$ = "while (" + $3 + "){\n   " + $6 + "}\n"; }

    | tk_do tk_la INSTRUCCIONES tk_lc tk_while tk_pa EXPRESION tk_pc tk_pyc { $$ = "do {\n  " + $3 + "} while (" + $7 + ");\n"; }

    | tk_break tk_pyc { $$ = $1 + ";\n  "; }

    | tk_continue tk_pyc { $$ = $1 + ";\n   "; }

    | tk_return RETURN tk_pyc { $$ = $1 + $2 + ";\n "; }

    | DECLARACION tk_pyc { $$ = $1 + ";\n   "; }

    | tk_id ASIGNACION_LLAMADA tk_pyc { $$ = $1 + $2 + ";\n "; }

    | COMENTARIO { $$ = $1; }

    | PRINT { $$ = $1; }

    | error tk_pyc { $$ = ""; }
    
    | error  { $$ = ""; };


PARAMETROS: PARAMETRO OTRO_PARAMETRO { $$ = $1 + $2; }

    |  /*EPSILON*/ { $$ = ""; } ;


PARAMETRO: TIPO_DATO tk_id { $$ = $2; } ;


OTRO_PARAMETRO: tk_coma PARAMETRO OTRO_PARAMETRO { $$ = ", " + $2 + $3; }

    |  /*EPSILON*/ { $$ = ""; } ;


NUMERO: tk_entero { $$ = $1; } 

    | tk_decimal { $$ = $2; } ;


EXPRESION: tk_id ID_LLAMADA { $$ = " " + $1 + $2; } 

    | tk_cadena { $$ = " " + $1; } 

    | tk_true { $$ = " " + $1; } 

    | tk_false { $$ = " " + $1;  } 

    | NUMERO { $$ = " " + $1; } 

    | EXPRESION OPERADOR { $$ = $1 + $2; } 

    | tk_menos EXPRESION { $$ = " -" + $2; } 

    | tk_not EXPRESION { $$ = " !" + $2; } 

    | tk_pa EXPRESION tk_pc { $$ = " ( " + $2 + ")"; } 

    | error { $$ = "";  };


ID_LLAMADA: tk_pa VALORES tk_pc { $$ = "( " + $2 + ")"; } 

    | /*EPSILON*/ { $$ = ""; } ;


OPERADOR: tk_mayor EXPRESION { $$ = " > " + $2; } 

    | tk_menor EXPRESION { $$ = " < " + $2; } 

    | tk_mayorigual EXPRESION { $$ = " >= " + $2; } 

    | tk_menorigual EXPRESION { $$ = " <= " + $2; } 

    | tk_igualigual EXPRESION { $$ = " == " + $2; } 

    | tk_noigual EXPRESION { $$ = " != " + $2; } 

    | tk_mas EXPRESION { $$ = " + " + $2; } 

    | tk_menos EXPRESION { $$ = " - " + $2; } 

    | tk_mul EXPRESION { $$ = " * " + $2; } 

    | tk_div EXPRESION { $$ = " / " + $2; } 

    | tk_and EXPRESION { $$ = " && " + $2; } 

    | tk_or EXPRESION { $$ = " || " + $2; } 

    | tk_xor EXPRESION { $$ = " ^ " + $2; } 

    | tk_add { $$ = "++"; } 

    | tk_sus { $$ = "--"; }  ;


RETURN: EXPRESION { $$ = " " + $1; }

    | /*EPSILON*/ { $$ = ""; } ;


COMENTARIO: tk_commentu { $$ = $1 + "\n" ; }
 
    | tk_commentm { $$ = $1 + "\n"; } ;


DECLARACION: TIPO_DATO VARIABLE OTRA_VARIABLE { $$ = "var " + $2 + $3; } ;


VARIABLE: tk_id ASIGNACION_VARIABLE { $$ = $1 + " " + $2; } ;


ASIGNACION_VARIABLE: tk_igual EXPRESION { $$ = "= " + $2; }

    | /*EPSILON*/ { $$ = ""; } ;


OTRA_VARIABLE: tk_coma VARIABLE OTRA_VARIABLE { $$ = ", " + $2 + $3; }

    | /*EPSILON*/ { $$ = ""; } ;


ASIGNACION_LLAMADA: tk_igual EXPRESION { $$ = " = " + $2  }

    | tk_pa VALORES tk_pc { $$ = "( " + $2 + ")"; }

    | tk_add { $$ = "++"; }

    | tk_sus { $$ = "--";  }

    | error FINERROR { $$ = ""; };


VALORES: EXPRESION OTRO_VALOR { $$ = $1 + $2; }

    | /*EPSILON*/ { $$ = ""; } ;


OTRO_VALOR: tk_coma EXPRESION OTRO_VALOR {  $$ = ", " + $2 + $3;  }

    | /*EPSILON*/ { $$ = ""; } ;


PRINT: tk_println tk_pa EXPRESION tk_pc tk_pyc { $$ = " console.log(" + $3 + ");" + "\n  ";  }

    | tk_print tk_pa EXPRESION tk_pc tk_pyc { $$ = "    console.log(" + $3 + ");" + "\n "; } ;







