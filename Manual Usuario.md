# [OLC1] Proyecto 2: "Translator in Docker" - Manual de usuario

## Información General
- SO: Linux-Ubuntu 20.04
- Lenguaje: Javascript/Golang
- Creado por Oscar Alfredo Llamas Lemus
- Octubre 2020


**Comando para servidor Golang _frontend/web.go_**

    > go run web.go

**Comando para levantar servidor backend Nodejs _backend/app.js_**

    > node app.js

**Comando para levantar el servidor del traductor Python  _backend/appPython.js_**

    > node appPython.js

## Utilización de la interfaz

    > Esta es la pantalla principal del traductor, y básicamente toda la interfaz a utilizarse.

![Pantalla principal](https://i.ibb.co/rkhBLTv/1.png)

    > En el apartado menú encontraremos opciones como: abrir, nuevo y guardar como...

![Menu](https://i.ibb.co/VYVMHQ3/2.png)

    > Esta es el área principal aqui podemos ingresar la cadena de entrada, en cualquiera de las 4 pestañas disponibles. También encontramos el botón principal para iniciar el analisis y traducción de la entrada.

![Area entrada](https://i.ibb.co/q7Cqd1x/3.png)

    > Del lado derecho encontramos las 2 consolas de la interfaz, donde se desplegará el resultado de la traducción asi mismo como los errores encontrados durante la fase de analisis, en caso de haber alguno, o bien un mensaje de éxito si no se tuvo ningún error léxico o sintáctico durante el proceso.

![Consolas](https://i.ibb.co/myFZ1HS/4.png)

    > Una vez realizado el proceso de analisis y traducción de nuestra cadena de entrada, en el apartado de Descargar podremos obtener una copia de la traducción deseada (Javascript, Python o ambas).

![Descargar](https://i.ibb.co/7k8YNCP/5.png)

