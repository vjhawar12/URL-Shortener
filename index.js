import express from "express"; 
import bodyParser from "body-parser";
import axios from "axios"; 

const port = 3000; 
var app = express(); 
const apiKey = "96955faeacdf481db33a71d13cb90368"; 

const headers = {
    "Content-Type": "application/json",
    "apikey": apiKey,
}; 

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended : true})); 

app.use((req, res, next) => {
    res.status(404).send("Number of links-classic exceeded"); 
}); 

app.get("/", (req, res) => {
    res.render("index.ejs"); 
}); 

app.post("/", async (req, res) => { 
    console.log(req.body); 
    const url = req.body.link;

    async function shorten(url) {
        let endpoint = "https://api.rebrandly.com/v1/links";
        let linkRequest = {
            destination: url,
            domain: { fullName: "rebrand.ly" }
        };
        const apiCall = {
            method: 'post',
            url: endpoint,
            data: linkRequest,
            headers: headers
        }; 
        let apiResponse = await axios(apiCall);
        let link = apiResponse.data;
        return link.shortUrl;
    }; 

    let shortURL = await shorten(url); 
    console.log(shortURL); 
    res.render("index.ejs", { "shortURL" : shortURL}); 
}); 

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`); 
})
