function Traducir(){

    var contenido = editor.getValue();

    if (contenido == ""){

        consolaJS.setValue("No hay entrada para analizar.");
        consolaJS.refresh();
        consolaPython.setValue("No hay entrada para analizar.");
        consolaPython.refresh();


    } else {

        var errorJson = {
            "jsconsole" : "El servidor no esta disponible",
            "pyconsole" : "El servidor no esta disponible",
        };

        var data = {
            "Texto" : contenido 
        };

    
        fetch('../getTraduccionJs', {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
              'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .catch(error => {console.log(error);
                        JSresultado(errorJson);})
        .then(response => JSresultado(response));
       
        fetch('../getTraduccionPy', {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
              'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .catch(error => {console.log(error);
                        Pyresultado(errorJson);})
        .then(response => Pyresultado(response));
    
    }
          
}

function Traducir2(){

    var contenido = editor2.getValue();

    if (contenido == ""){

        consolaJS.setValue("No hay entrada para analizar.");
        consolaJS.refresh();
        consolaPython.setValue("No hay entrada para analizar.");
        consolaPython.refresh();


    } else {

        var errorJson = {
            "jsconsole" : "El servidor no esta disponible",
            "pyconsole" : "El servidor no esta disponible",
        };

        var data = {
            "Texto" : contenido 
        };

    
        fetch('../getTraduccionJs', {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
              'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .catch(error => {console.log(error);
                        JSresultado(errorJson);})
        .then(response => JSresultado(response));
       
        fetch('../getTraduccionPy', {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
              'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .catch(error => {console.log(error);
                        Pyresultado(errorJson);})
        .then(response => Pyresultado(response));
    
    }
          
}

function Traducir3(){

    var contenido = editor3.getValue();

    if (contenido == ""){

        consolaJS.setValue("No hay entrada para analizar.");
        consolaJS.refresh();
        consolaPython.setValue("No hay entrada para analizar.");
        consolaPython.refresh();


    } else {

        var errorJson = {
            "jsconsole" : "El servidor no esta disponible",
            "pyconsole" : "El servidor no esta disponible",
        };

        var data = {
            "Texto" : contenido 
        };

    
        fetch('../getTraduccionJs', {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
              'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .catch(error => {console.log(error);
                        JSresultado(errorJson);})
        .then(response => JSresultado(response));
       
        fetch('../getTraduccionPy', {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
              'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .catch(error => {console.log(error);
                        Pyresultado(errorJson);})
        .then(response => Pyresultado(response));
    
    }
          
}

function Traducir4(){

    var contenido = editor4.getValue();

    if (contenido == ""){

        consolaJS.setValue("No hay entrada para analizar.");
        consolaJS.refresh();
        consolaPython.setValue("No hay entrada para analizar.");
        consolaPython.refresh();


    } else {

        var errorJson = {
            "jsconsole" : "El servidor no esta disponible",
            "pyconsole" : "El servidor no esta disponible",
        };

        var data = {
            "Texto" : contenido 
        };

    
        fetch('../getTraduccionJs', {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
              'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .catch(error => {console.log(error);
                        JSresultado(errorJson);})
        .then(response => JSresultado(response));
       
        fetch('../getTraduccionPy', {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
              'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .catch(error => {console.log(error);
                        Pyresultado(errorJson);})
        .then(response => Pyresultado(response));
    
    }
          
}

function JSresultado(response){
    consolaJS.setValue(response.jsconsole);
    consolaJS.refresh();
}

function Pyresultado(response){
    consolaPython.setValue(response.pyconsole);
    consolaPython.refresh();
}


function TraduccionJS(){
    puerto = 3000;
    var url='http://localhost:'+ puerto +'/descargarJS/';
    window.open(url);
}

function TraduccionPy(){
    puerto = 3001;
    var url='http://localhost:'+ puerto +'/descargarPy/';
    window.open(url);
}
