FROM ubuntu
ENV TZ=America/Guatemala
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN apt-get update
RUN apt-get install wget -y
RUN apt-get install -y graphviz
RUN apt-get clean
RUN wget https://dl.google.com/go/go1.14.2.linux-amd64.tar.gz
RUN tar -xvf go1.14.2.linux-amd64.tar.gz -C /usr/local/
RUN echo 'export PATH="/usr/local/go/bin:$PATH"' >> /etc/bash.bashrc
RUN echo 'source ~/.profile' >> /etc/bash.bashrc
RUN apt-get update
RUN apt install nodejs -y
RUN apt install npm -y
RUN npm install typescript -g
RUN npm install express -g
RUN npm install cors -g
RUN npm install body-parser -g
RUN npm install jison -g
RUN npm install typescript-require
EXPOSE 8000
EXPOSE 3000
EXPOSE 3001