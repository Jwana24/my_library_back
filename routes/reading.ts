import express from "express";
const router = express.Router();
import { AppDataSource } from "../src/data-source.js";
import { Reading } from "../src/entity/Reading.js";

router.post('/reading', (req, res) => {
    const dataReading = req.body;
});

router.get('/reading', async (req, res) => {
    res.status(200).json(await AppDataSource.manager.find(Reading));
});

router.get('/reading/:id', async(req, res) => {
    const idReading = parseInt(req.params.id);
    res.status(200).json(await AppDataSource.manager.findOneBy(Reading, { id: idReading }));
});

router.patch('/reading/:id', (req, res) => {

});

router.delete('/reading/:id', (req, res) => {
    
});

export default router;