import express from "express";
const router = express.Router();
import { AppDataSource } from "../src/data-source.js";
import { Reading } from "../src/entity/Reading.js";

router.post('/reading', async(req, res) => {
    const dataReading = req.body;

    try {
        const insertReading = await AppDataSource.manager.insert(Reading, dataReading);
        // TypeORM does not offer the result directly
        const id = (insertReading).identifiers[0].id;
        res.status(201).json(await AppDataSource.manager.findOneBy(Reading, { id: id }));
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/reading', async (req, res) => {
    res.status(200).json(await AppDataSource.manager.find(Reading));
});

router.get('/reading/:id', async(req, res) => {
    const idReading = parseInt(req.params.id);
    const reading = await AppDataSource.manager.findOneBy(Reading, { id: idReading });

    if (!reading) {
        res.status(404).send('Cette lecture est introuvable.');
    }
    res.status(200).json(reading);
});

router.patch('/reading/:id', async(req, res) => {
    const idReading = parseInt(req.params.id);
    const dataReading = req.body;
    const reading = await AppDataSource.manager.findOneBy(Reading, { id: idReading });

    if (!reading) {
        res.status(404).send('Cette lecture est introuvable.');
    }

    res.status(201).json(await AppDataSource.manager.save(Reading,
      {
          ...reading,
          ...dataReading
      }
    ));
});

router.delete('/reading/:id', async(req, res) => {
    const idReading = parseInt(req.params.id);
    const reading = await AppDataSource.manager.findOneBy(Reading, { id: idReading });

    if (!reading) {
        res.status(404).send('Cette lecture est introuvable.');
    }

    await AppDataSource.manager.remove(reading)
    res.sendStatus(200);
});

export default router;