function Traducir(){

    var texto = editor.getValue();
    console.log(texto);

    consolaJS.setValue("");
    consolaJS.refresh();

    puerto = 3000;

    var url='http://localhost:'+ puerto +'/Traducir/';

    $.post(url,{text:texto},function(data,status){
        if(status.toString()=="success"){
            consolaJS.setValue(data);
            consolaJS.refresh();
        }else{
           
        }
    });
}

function Ejecutar(){

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
            "texto" : contenido 
        };
    
        fetch("http://localhost:3000/Traducir/",{
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                "Content-Type" : "application/json"  }
            }).then(res => res.json())
            .catch(error => {console.log(error);
                            JSresultado(errorJson);})
            .then(response => JSresultado(response));

        fetch("http://localhost:3001/Traducir/",{
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                "Content-Type" : "application/json"  }
            }).then(res => res.json())
            .catch(error => {console.log(error);
                            Pyresultado(errorJson);})
            .then(response => Pyresultado(response));
    }

} 

function Ejecutar2(){

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
            "texto" : contenido 
        };
    
        fetch("http://localhost:3000/Traducir/",{
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                "Content-Type" : "application/json"  }
            }).then(res => res.json())
            .catch(error => {console.log(error);
                            JSresultado(errorJson);})
            .then(response => JSresultado(response));

        fetch("http://localhost:3001/Traducir/",{
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                "Content-Type" : "application/json"  }
            }).then(res => res.json())
            .catch(error => {console.log(error);
                            Pyresultado(errorJson);})
            .then(response => Pyresultado(response));
    }
}     

function Ejecutar3(){

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
            "texto" : contenido 
        };
    
        fetch("http://localhost:3000/Traducir/",{
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                "Content-Type" : "application/json"  }
            }).then(res => res.json())
            .catch(error => {console.log(error);
                            JSresultado(errorJson);})
            .then(response => JSresultado(response));

        fetch("http://localhost:3001/Traducir/",{
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                "Content-Type" : "application/json"  }
            }).then(res => res.json())
            .catch(error => {console.log(error);
                            Pyresultado(errorJson);})
            .then(response => Pyresultado(response));
    }
} 

function Ejecutar4(){

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
            "texto" : contenido 
        };
    
        fetch("http://localhost:3000/Traducir/",{
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                "Content-Type" : "application/json"  }
            }).then(res => res.json())
            .catch(error => {console.log(error);
                            JSresultado(errorJson);})
            .then(response => JSresultado(response));

        fetch("http://localhost:3001/Traducir/",{
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                "Content-Type" : "application/json"  }
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
