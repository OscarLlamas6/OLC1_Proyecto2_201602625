

function GenerarDescarga(){
    if(tab==1){
        download(editor.getValue(),"Doc.JAVA","text/JAVA");
    } else if(tab==2){
        download(editor2.getValue(),"Doc.JAVA","text/JAVA");
    } else if(tab==3){
        download(editor3.getValue(),"Doc.JAVA","text/JAVA");
    } else if(tab==4){
        download(editor4.getValue(),"Doc.JAVA","text/JAVA");
    }
}


function download(text, name, type) {
    var a = document.getElementById("a");
    var file = new Blob([text], {type: type});
    a.href = URL.createObjectURL(file);
    a.download = name;
  }

