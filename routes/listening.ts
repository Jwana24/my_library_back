import express from "express";
const router = express.Router();
import { AppDataSource } from "../src/data-source.js";
import { Listening } from "../src/entity/Listening.js";

router.post('/listening', async(req, res) => {
    const dataListening = req.body;

    try {
        const insertListening = await AppDataSource.manager.insert(Listening, dataListening);
        const id = (insertListening).identifiers[0].id;
        res.status(201).json(await AppDataSource.manager.findOneBy(Listening, { id: id }));
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/listening', async (req, res) => {
    res.status(200).json(await AppDataSource.manager.find(Listening));
});

router.get('/listening/:id', async(req, res) => {
    const idListening = parseInt(req.params.id);
    const listening = await AppDataSource.manager.findOneBy(Listening, { id: idListening });

    if (!listening) {
        res.status(404).send('Cette écoute est introuvable.');
    }
    res.status(200).json(listening);
});

router.patch('/listening/:id', async(req, res) => {
    const idListening = parseInt(req.params.id);
    const dataListening = req.body;
    const listening = await AppDataSource.manager.findOneBy(Listening, { id: idListening });

    if (!listening) {
        res.status(404).send('Cette écoute est introuvable.');
    }

    res.status(201).json(await AppDataSource.manager.save(Listening,
      {
          ...listening,
          ...dataListening
      }
    ));
});

router.delete('/listening/:id', async(req, res) => {
    const idListening = parseInt(req.params.id);
    const listening = await AppDataSource.manager.findOneBy(Listening, { id: idListening });

    if (!listening) {
        res.status(404).send('Cette écoute est introuvable.');
    }

    await AppDataSource.manager.remove(listening)
    res.sendStatus(200);
});

export default router;