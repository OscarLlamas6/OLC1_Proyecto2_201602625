package main

import (
	"html/template"
	"net/http"
)

func index(w http.ResponseWriter, r *http.Request) {
	t := template.Must(template.ParseFiles("index.html"))
	t.Execute(w, "")
}

func main() {
	http.Handle("/codemirror/", http.StripPrefix("/codemirror/", http.FileServer(http.Dir("codemirror/"))))
	http.Handle("/Js/", http.StripPrefix("/Js/", http.FileServer(http.Dir("Js/"))))
	http.Handle("/Css/", http.StripPrefix("/Css/", http.FileServer(http.Dir("Css/"))))
	http.HandleFunc("/", index)
	http.ListenAndServe(":8000", nil)
}
