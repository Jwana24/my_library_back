import express from "express";
const router = express.Router();

router.post('/viewing', (req, res) => {

});

router.get('/viewing', (req, res) => {
    res.send('hello world')
});

router.get('/viewing/:id', (req, res) => {
    res.send('hello world')
});

router.patch('/viewing/:id', (req, res) => {

});

router.delete('/viewing/:id', (req, res) => {
    
});

export default router;