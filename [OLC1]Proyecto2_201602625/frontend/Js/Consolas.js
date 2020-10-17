var consolaJS = CodeMirror.fromTextArea
(document.getElementById('consolaJS'),{
    theme: "cobalt",
    lineNumbers: false,
    fixedGutter: false,
    autoRefresh: true,
    readOnly: true,
    readOnly: "nocursor"
});

consolaJS.setSize(850, 300);
consolaJS.refresh();

var consolaPython = CodeMirror.fromTextArea
(document.getElementById('consolaPython'),{
    theme: "cobalt",
    lineNumbers: false,
    fixedGutter: false,
    autoRefresh: true,
    readOnly: true,
    readOnly: "nocursor"
});

consolaPython.setSize(850, 300);
consolaPython.refresh();


