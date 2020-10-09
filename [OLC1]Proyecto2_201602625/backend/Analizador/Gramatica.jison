
/*===========================================IMPORTS===========================================*/
%{

%}


/*===========================================LEXICO===========================================*/
%lex
%options case-sensitive
%%

\"[^\"]*\"              { yytext = yytext.substr(1, yyleng-2); return 'tk_cadena'; }
[0-9]+"."[0-9]+\b             %{  return 'tk_decimal';  %}
[0-9]+\b                      %{  return 'tk_entero';  %}
([a-zA-Z])[a-zA-Z0-9_]*     %{ return 'tk_identificador'; %}
"//".*                      %{ yytext = yytext.substr(1, yyleng-2); return 'tk_commentu'; %}
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/] %{ yytext = yytext.substr(1, yyleng-2); return 'tk_commentm'; %}

[ \t\r\n\f] %{  /*Los Ignoramos*/   %}

<<EOF>>     %{  return 'EOF';   %}

.           %{  /*Reportar Error*/ console.log("Error lexico: "+ yytext);  %}

/lex


/*===========================================SINTACTICO===========================================*/


%start S
%% 

S:EXP EOF { };
