import express from "express";
const app = express();

app.post('/viewing', (req, res) => {

});

app.get('/viewing', (req, res) => {
    res.send('hello world')
});

app.get('/viewing/:id', (req, res) => {
    res.send('hello world')
});

app.patch('/viewing/:id', (req, res) => {

});

app.delete('/viewing/:id', (req, res) => {
    
});