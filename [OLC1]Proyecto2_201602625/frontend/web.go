package main

import (
	"fmt"
	"html/template"
	"net/http"
	"os"
)

type consolas struct {
	Script string
}

func index(w http.ResponseWriter, r *http.Request) {
	t := template.Must(template.ParseFiles("index.html"))
	t.Execute(w, "")
}

func prueba(w http.ResponseWriter, r *http.Request) {

	s := fmt.Sprintf(`<script>consolaJS.setValue("%s");
					consolaJS.refresh();
					consolaPython.setValue("%s");
					consolaPython.refresh();</script>`, "ConsolaJs :D", "ConsolaPython :D")

	t := template.Must(template.ParseFiles("index.html"))
	t.Execute(w, template.HTML(s))
}

func main() {

	port, defport := os.LookupEnv("GOPORT")

	if !defport {
		port = "8000"
	}

	http.Handle("/codemirror/", http.StripPrefix("/codemirror/", http.FileServer(http.Dir("codemirror/"))))
	http.Handle("/Js/", http.StripPrefix("/Js/", http.FileServer(http.Dir("Js/"))))
	http.Handle("/Css/", http.StripPrefix("/Css/", http.FileServer(http.Dir("Css/"))))
	http.HandleFunc("/", index)
	http.HandleFunc("/prueba", prueba)
	fmt.Println("Escuchando por puerto: " + port)
	http.ListenAndServe(":"+port, nil)
}
