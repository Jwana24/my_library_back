import express from "express";
const router = express.Router();
import { AppDataSource } from "../src/data-source.js";
import { Watching } from "../src/entity/Watching";

router.post('/watching', async(req, res) => {
    const dataWatching = req.body;

    try {
        const insertWatching = await AppDataSource.manager.insert(Watching, dataWatching);
        const id = (insertWatching).identifiers[0].id;
        res.status(201).json(await AppDataSource.manager.findOneBy(Watching, { id: id }));
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/watching', async (req, res) => {
    res.status(200).json(await AppDataSource.manager.find(Watching));
});

router.get('/watching/:id', async(req, res) => {
    const idWatching = parseInt(req.params.id);
    const watching = await AppDataSource.manager.findOneBy(Watching, { id: idWatching });

    if (!watching) {
        res.status(404).send('Ce visionnage est introuvable.');
    }
    res.status(200).json(watching);
});

router.patch('/watching/:id', async(req, res) => {
    const idWatching = parseInt(req.params.id);
    const dataWatching = req.body;
    const watching = await AppDataSource.manager.findOneBy(Watching, { id: idWatching });

    if (!watching) {
        res.status(404).send('Ce visionnage est introuvable.');
    }

    res.status(201).json(await AppDataSource.manager.save(Watching,
      {
          ...watching,
          ...dataWatching
      }
    ));
});

router.delete('/watching/:id', async(req, res) => {
    const idWatching = parseInt(req.params.id);
    const watching = await AppDataSource.manager.findOneBy(Watching, { id: idWatching });

    if (!watching) {
        res.status(404).send('Ce visionnage est introuvable.');
    }

    await AppDataSource.manager.remove(watching)
    res.sendStatus(200);
});

export default router;