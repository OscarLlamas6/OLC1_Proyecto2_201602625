
/*===========================================IMPORTS===========================================*/
%{

%}


/*===========================================LEXICO===========================================*/
%lex
%options case-sensitive
%%

"args"                %{ return 'tk_args'; %}
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
.           %{  /*Reportar Error*/ console.log("Error lexico: "+ yytext);  %}

/lex


/*===========================================SINTACTICO===========================================*/

%left tk_mayor tk_menor tk_mayorigual tk_menorigual tk_igualigual tk_noigual tk_mas tk_menos tk_mul tk_div tk_and tk_or tk_not tk_xor tk_add tk_sus


%start INICIO
%% 

INICIO: LISTA_DECLARACIONES EOF { };

LISTA_DECLARACIONES: DPROGRAMA LISTA_DECLARACIONES

    | ;


DPROGRAMA: VISIBILIDAD CLASE_INTERFAZ_METODO_FUNCION

    | tk_if tk_pa EXPRESION tk_pc tk_la INSTRUCCIONES tk_lc ELSEIF

    | tk_for tk_pa DAFOR tk_pyc EXPRESION tk_pyc EXPRESION tk_pc tk_la INSTRUCCIONES tk_lc

    | tk_while tk_pa EXPRESION tk_pc tk_la INSTRUCCIONES tk_lc

    | tk_do tk_la INSTRUCCIONES tk_lc tk_while tk_pa EXPRESION tk_pc tk_pyc 

    | DECLARACION

    | tk_id ASIGNACION_LLAMADA tk_pyc

    | COMENTARIO

    | PRINT;


DAFOR: DECLARACION

    | ASIGNACION OTRA_ASIGNACION;


ASIGNACION: tk_id tk_igual EXPRESION;


OTRA_ASIGNACION: tk_coma ASIGNACION OTRA_ASIGNACION

    | ;


ELSEIF: tk_else ELSE 

    | ;


ELSE: tk_if tk_pa EXPRESION tk_pc tk_la INSTRUCCIONES tk_lc ELSEIF

    | tk_la INSTRUCCIONES tk_lc;



VISIBILIDAD: tk_public

    | tk_private;


CLASE_INTERFAZ_METODO_FUNCION: tk_class tk_id tk_la LISTA_DECLARACIONES tk_lc

    | tk_interface tk_id tk_la LINTERFAZ tk_lc

    | tk_static tk_void tk_main tk_pa tk_string tk_ca tk_cc tk_args tk_pc tk_la INSTRUCCIONES tk_lc

    | TIPO_METODO_FUNCION tk_id tk_pa PARAMETROS tk_pc tk_la INSTRUCCIONES tk_lc;


LINTERFAZ: DINTERFAZ LINTERFAZ

    | ;


DINTERFAZ: VISIBILIDAD DMETODONTERFAZ

    | DECLARACION

    | ASIGNACION;


DMETODONTERFAZ: TIPO_METODO_FUNCION tk_id tk_pa PARAMETROS tk_pc tk_pyc;


TIPO_METODO_FUNCION: tk_void

    | tk_int

    | tk_double

    | tk_string

    | tk_boolean

    | tk_char;


TIPO_DATO: tk_int

    | tk_double

    | tk_string

    | tk_boolean

    | tk_char;


INSTRUCCIONES: DINSTRUCCION INSTRUCCIONES

    | ;


DINSTRUCCION: tk_if tk_pa EXPRESION tk_pc tk_la INSTRUCCIONES tk_lc ELSEIF

    | tk_for tk_pa DAFOR tk_pyc EXPRESION tk_pyc EXPRESION tk_pc tk_la INSTRUCCIONES tk_lc

    | tk_while tk_pa EXPRESION tk_pc tk_la INSTRUCCIONES tk_lc

    | tk_do tk_la INSTRUCCIONES tk_lc tk_while tk_pa EXPRESION tk_pc tk_pyc 

    | tk_break tk_pyc

    | tk_continue tk_pyc

    | tk_return RETURN tk_pyc

    | DECLARACION

    | tk_id ASIGNACION_LLAMADA tk_pyc

    | COMENTARIO

    | PRINT;


PARAMETROS: PARAMETRO OTRO_PARAMETRO

    | ;


PARAMETRO: TIPO_DATO tk_id;


OTRO_PARAMETRO: tk_coma PARAMETRO OTRO_PARAMETRO

    | ;


NUMERO: tk_entero

    | tk_decimal;


EXPRESION: tk_id

    | tk_cadena

    | tk_true

    | tk_false

    | NUMERO

    | EXPRESION OPERADOR

    | tk_menos EXPRESION

    | tk_pa EXPRESION tk_pc;


OPERADOR: tk_mayor EXPRESION

    | tk_menor EXPRESION

    | tk_mayorigual EXPRESION

    | tk_menorigual EXPRESION

    | tk_igualigual EXPRESION

    | tk_noigual EXPRESION

    | tk_mas EXPRESION

    | tk_menos EXPRESION

    | tk_mul EXPRESION

    | tk_div EXPRESION

    | tk_and EXPRESION

    | tk_or EXPRESION

    | tk_not EXPRESION

    | tk_xor EXPRESION

    | tk_add

    | tk_sus;


RETURN: EXPRESION

    | ;


COMENTARIO: tk_commentu

    | tk_commentm;


DECLARACION: TIPO_DATO VARIABLE OTRA_VARIABLE tk_pyc;


VARIABLE: tk_id ASIGNACION_VARIABLE;


ASIGNACION_VARIABLE: tk_igual EXPRESION

    | ;


OTRA_VARIABLE: tk_coma VARIABLE OTRA_VARIABLE

    | ;


ASIGNACION_LLAMADA: tk_igual EXPRESION

    | tk_pa VALORES tk_pc

    | tk_add

    | tk_sus;


VALORES: EXPRESION OTRO_VALOR

    | ;


OTRO_VALOR: tk_coma EXPRESION OTRO_VALOR

    | ;


PRINT: tk_println tk_pa EXPRESION tk_pc tk_pyc 

    | tk_print tk_pa EXPRESION tk_pc tk_pyc ;







