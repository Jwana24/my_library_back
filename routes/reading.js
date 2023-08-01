import express from "express";
const app = express();

app.post('/reading', (req, res) => {

});

app.get('/reading', (req, res) => {
    res.send('hello world')
});

app.get('/reading/:id', (req, res) => {
    res.send('hello world')
});

app.patch('/reading/:id', (req, res) => {

});

app.delete('/reading/:id', (req, res) => {
    
});