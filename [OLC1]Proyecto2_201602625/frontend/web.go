package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"html/template"
	"io/ioutil"
	"net/http"
	"os"
)

type consolas struct {
	Script string
}

type entrada struct {
	Texto string
}

func index(w http.ResponseWriter, r *http.Request) {
	t := template.Must(template.ParseFiles("index.html"))
	t.Execute(w, "")
}

func getTraduccionJs(w http.ResponseWriter, r *http.Request) {

	var url = "http://localhost:3000/Traducir/"

	var decoder = json.NewDecoder(r.Body)
	var c entrada
	err := decoder.Decode(&c)
	if err != nil {
		panic(err)
	}

	JSONFormat, _ := json.Marshal(c)

	req, err := http.NewRequest("POST", url, bytes.NewBuffer(JSONFormat))
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		panic(err)
	}

	defer resp.Body.Close()
	bodyBytes, _ := ioutil.ReadAll(resp.Body)
	_, _ = fmt.Fprintf(w, "%s", bodyBytes)
}

func getTraduccionPy(w http.ResponseWriter, r *http.Request) {

	var url = "http://localhost:3001/Traducir/"

	var decoder = json.NewDecoder(r.Body)
	var c entrada
	err := decoder.Decode(&c)
	if err != nil {
		panic(err)
	}

	JSONFormat, _ := json.Marshal(c)

	req, err := http.NewRequest("POST", url, bytes.NewBuffer(JSONFormat))
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		panic(err)
	}

	defer resp.Body.Close()
	bodyBytes, _ := ioutil.ReadAll(resp.Body)
	_, _ = fmt.Fprintf(w, "%s", bodyBytes)
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
	http.HandleFunc("/getTraduccionJs", getTraduccionJs)
	http.HandleFunc("/getTraduccionPy", getTraduccionPy)
	fmt.Println("Escuchando por puerto: " + port)
	http.ListenAndServe(":"+port, nil)
}
