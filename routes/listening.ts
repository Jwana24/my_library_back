import express from "express";
const router = express.Router();

router.post('/listening', (req, res) => {

});

router.get('/listening', (req, res) => {
    res.send('hello world')
});

router.get('/listening/:id', (req, res) => {
    res.send('hello world')
});

router.patch('/listening/:id', (req, res) => {

});

router.delete('/listening/:id', (req, res) => {
    
});
export default router;