import express from "express";
const router = express.Router();
import { AppDataSource } from "../src/data-source.js";
import { WatchingGenre } from "../src/entity/WatchingGenre";

router.post('/watching-genre', async(req, res) => {
  const dataWatchingGenre = req.body;

  try {
    const insertWatchingGenre = await AppDataSource.manager.insert(WatchingGenre, dataWatchingGenre);
    const id = (insertWatchingGenre).identifiers[0].id;
    res.status(201).json(await AppDataSource.manager.findOneBy(WatchingGenre, { id: id }));
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/watching-genre', async (req, res) => {
  res.status(200).json(await AppDataSource.manager.find(WatchingGenre));
});

router.get('/watching-genre/:id', async(req, res) => {
  const idWatchingGenre = parseInt(req.params.id);
  const watchingGenre = await AppDataSource.manager.findOneBy(WatchingGenre, { id: idWatchingGenre });

  if (!watchingGenre) {
    res.status(404).send('Ce genre de visionnage est introuvable.');
  }
  res.status(200).json(watchingGenre);
});

router.patch('/watching-genre/:id', async(req, res) => {
  const idWatchingGenre = parseInt(req.params.id);
  const dataWatchingGenre = req.body;
  const watchingGenre = await AppDataSource.manager.findOneBy(WatchingGenre, { id: idWatchingGenre });

  if (!watchingGenre) {
    res.status(404).send('Ce genre de visionnage est introuvable.');
  }

  res.status(201).json(await AppDataSource.manager.save(WatchingGenre,
    {
      ...watchingGenre,
      ...dataWatchingGenre
    }
  ));
});

router.delete('/watching-genre/:id', async(req, res) => {
  const idWatchingGenre = parseInt(req.params.id);
  const watchingGenre = await AppDataSource.manager.findOneBy(WatchingGenre, { id: idWatchingGenre });

  if (!watchingGenre) {
    res.status(404).send('Ce genre de visionnage est introuvable.');
  }

  await AppDataSource.manager.remove(watchingGenre)
  res.sendStatus(200);
});

export default router;