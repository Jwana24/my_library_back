import express from "express";
const router = express.Router();
import { AppDataSource } from "../src/data-source.js";
import { WatchingType } from "../src/entity/WatchingType";

router.post('/watching-type', async(req, res) => {
  const dataWatchingType = req.body;

  try {
    const insertWatchingType = await AppDataSource.manager.insert(WatchingType, dataWatchingType);
    // TypeORM does not offer the result directly
    const id = (insertWatchingType).identifiers[0].id;
    res.status(201).json(await AppDataSource.manager.findOneBy(WatchingType, { id: id }));
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/watching-type', async (req, res) => {
  res.status(200).json(await AppDataSource.manager.find(WatchingType));
});

router.get('/watching-type/:id', async(req, res) => {
  const idWatchingType = parseInt(req.params.id);
  const watchingType = await AppDataSource.manager.findOneBy(WatchingType, { id: idWatchingType });

  if (!watchingType) {
    res.status(404).send('Ce type de visionnage est introuvable.');
  }
  res.status(200).json(watchingType);
});

router.patch('/watching-type/:id', async(req, res) => {
  const idWatchingType = parseInt(req.params.id);
  const dataWatchingType = req.body;
  const watchingType = await AppDataSource.manager.findOneBy(WatchingType, { id: idWatchingType });

  if (!watchingType) {
    res.status(404).send('Ce type de visionnage est introuvable.');
  }

  res.status(201).json(await AppDataSource.manager.save(WatchingType,
    {
      ...watchingType,
      ...dataWatchingType
    }
  ));
});

router.delete('/watching-type/:id', async(req, res) => {
  const idWatchingType = parseInt(req.params.id);
  const watchingType = await AppDataSource.manager.findOneBy(WatchingType, { id: idWatchingType });

  if (!watchingType) {
    res.status(404).send('Ce type de visionnage est introuvable.');
  }

  await AppDataSource.manager.remove(watchingType)
  res.sendStatus(200);
});

export default router;