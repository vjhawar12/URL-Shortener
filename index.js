import express from "express"; 
import bodyParser from "body-parser";
import axios from "axios"; 

const port = 3000; 
var app = express(); 

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended : true})); 

app.get("/", (req, res) => {
    res.render("index.ejs"); 
}); 

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`); 
})