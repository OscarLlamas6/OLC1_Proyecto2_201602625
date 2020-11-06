# [OLC1] Proyecto 2: "Translator in Docker" - Manual técnico

## Información General
- SO: Linux-Ubuntu 20.04
- Lenguaje: Javascript/Golang
- Creado por Oscar Alfredo Llamas Lemus
- Octubre 2020


**Comando para servidor Golang _frontend/web.go_**

    > go run web.go

**Comando para levantar el servidor del traductor Js  _backend/app.js_**

    > node app.js

**Comando para levantar el servidor del traductor Python  _backend/appPython.js_**

    > node appPython.js

# Comandos Docker usados

**Instalar docker en Ubuntu 20.04**
    > sudo apt update

    > sudo apt install apt-transport-https ca-certificates curl software-properties-common

    > curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add 

    > sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"

    > sudo apt update

    > apt-cache policy docker-ce

    > sudo apt install docker-ce

**Verificar si Docker esta corriendo**

    > sudo systemctl status docker

## El resultado debe ser parecido a lo siguiente:



    ● docker.service - Docker Application Container Engine
         Loaded: loaded (/lib/systemd/system/docker.service; enabled; vendor preset: enabled)
         Active: active (running) since Tue 2020-05-19 17:00:41 UTC; 17s ago
    TriggeredBy: ● docker.socket
           Docs: https://docs.docker.com
       Main PID: 24321 (dockerd)
          Tasks: 8
         Memory: 46.4M
         CGroup: /system.slice/docker.service
             └─24321 /usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock

             
## Ya creados nuestros contenedores podemos verificar cuales esta corriendo o que se muestren todos:

    > sudo docker ps

    > sudo docker ps -a

## Si apagamos nuestro contenedor podemos iniciarlo nuevamente con el comando:

    > sudo docker start nombre_contenedor

    > sudo docker attach nombre_contenedor

## Para terminar la ejecucion del contenedor utilizamos el comando:

    > sudo docker stop nombre_contenedor

## Como eliminar contenedores e imagenes docker


    > sudo docker rm <nombre o id contenedor>

    > sudo docker rmi imagen:tag


## Como crear un entorno de trabajo

    >sudo docker run -v path_host:path_cont -p puertoLocal:puertoDocker --name nombre_contenedor -it imagen:tag bash

### Ejemplo (comando usado para este proyecto):

    > sudo docker run -v /home/oscar-pc/Proyecto2/:/Proyecto2/ -p 7000:8000 -p 3000:3000 -p 3001:3001 -it --name proyecto2 oscarllamas6/ubuntu-go-node-proyecto2:v1 /bin/bash


> Para terminar, podemos salir del contenedor utilizando el comando exit.

## Subir Docker image a DockerHub

    > sudo docker commit <ID_CONTENEDOR> <NUEVO_NOMBRE>:<TAG_IMAGEN>

    > sudo docker login --username <USERNAME>

    > sudo docker push <REPOSITORY>:<TAG>

## Acceder a distintas sesiones del mismo contenedor

    > docker exec -it <ID CONTENEDOR> bash

### Ejemplo:

    > docker exec -it proyecto2 /bin/bash


# Uso de Dockerfile para crear imagenes docker
Para crear una imagen docker podemos utilizar un conjunto de instrucciones que se encuentran dentro de un archivo Dockerfile, dentro de el especificamos el conjunto de acciones que quedemos realizar. Una vez realizo dentro de la carpeta que contiene el dockerfile debemos correr el comando:

    > sudo docker build -t NombreImagen:tag .

### Ejemplo:

    > sudo docker build -t entorno:v1 .
