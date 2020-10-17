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