import express from "express";
const app = express();

app.post('/listening', (req, res) => {

});

app.get('/listening', (req, res) => {
    res.send('hello world')
});

app.get('/listening/:id', (req, res) => {
    res.send('hello world')
});

app.patch('/listening/:id', (req, res) => {

});

app.delete('/listening/:id', (req, res) => {
    
});