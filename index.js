const express = require("express");
const app = express(); 
const path = require("path"); 
//Importamos UUID   
const { v4: uuid } = require('uuid');

//Estamos haciendo que express nos analice la información codificada del formulario que está en el request body.

app.use(express.urlencoded({extended:true}));
//Nuestros datos falsos (puede estar en un archivo externo)
const comentarios = [
    {
        id:uuid(),
        usuario:"luis",
        comentario:"hola mundo"
    },
    {
        id:uuid(),
        usuario:"rogelio",
        comentario:"que calor"
    },
    {
        id:uuid(),
        usuario:"maria",
        comentario:"Hermoso día"
    },
    {
        id:uuid(),
        usuario:"santiago",
        comentario:"bla bla bla"
    },
]

//Definimos ruta absoluta
app.set("views", path.join(__dirname,"views")); 
//Utilizamos el motor de plantillas
app.set("view engine", "ejs"); 

//Definimos rutas
app.get("/", (req,res)=>{
    res.send("Home")
})

//Ruta para mostrar todos los comentarios
app.get("/comentarios",(req,res)=>{
    res.render("comentarios/index",{comentarios});
})

//Ruta para crear un nuevo comentario
//1. Uno con método get para mostrar el formulario.
app.get("/comentarios/nuevo",(req,res)=>{
    res.render("comentarios/nuevo")
})
//2. Uno con método Post para trabajar con los datos del formulario y crear un nuevo comentario. 
app.post("/comentarios",(req,res)=>{
    const { usuario, comentario} = req.body; 
    comentarios.push({ usuario, comentario, id: uuid()});
    res.redirect("/comentarios");
})

//Mostramos un comentario especifico.
app.get("/comentario/:id",(req, res)=>{
    console.log(req.params);
    //Optemeos el id de la URL
    const {id} = req.params; 
    const comentario = comentarios.find( c => c.id === id); 
    console.log(comentario)
    res.render("comentarios/comentario",{comentario});
})

//Actualizar comentario
app.patch("/comentario/:id/editar",(req,res)=>{

})
app.listen(3000, ()=>{
    console.log("Server listo!"); 
})