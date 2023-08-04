import express from "express";
const router = express.Router();
import { AppDataSource } from "../src/data-source.js";
import { ListeningType } from "../src/entity/ListeningType.js";

router.post('/listening-type', async(req, res) => {
  const dataListeningType = req.body;

  try {
    const insertListeningType = await AppDataSource.manager.insert(ListeningType, dataListeningType);
    // TypeORM does not offer the result directly
    const id = (insertListeningType).identifiers[0].id;
    res.status(201).json(await AppDataSource.manager.findOneBy(ListeningType, { id: id }));
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/listening-type', async (req, res) => {
  res.status(200).json(await AppDataSource.manager.find(ListeningType));
});

router.get('/listening-type/:id', async(req, res) => {
  const idListeningType = parseInt(req.params.id);
  const listeningType = await AppDataSource.manager.findOneBy(ListeningType, { id: idListeningType });

  if (!listeningType) {
    res.status(404).send('Ce type d\'écoute est introuvable.');
  }
  res.status(200).json(listeningType);
});

router.patch('/listening-type/:id', async(req, res) => {
  const idListeningType = parseInt(req.params.id);
  const dataListeningType = req.body;
  const listeningType = await AppDataSource.manager.findOneBy(ListeningType, { id: idListeningType });

  if (!listeningType) {
    res.status(404).send('Ce type d\'écoute est introuvable.');
  }

  res.status(201).json(await AppDataSource.manager.save(ListeningType,
    {
      ...listeningType,
      ...dataListeningType
    }
  ));
});

router.delete('/listening-type/:id', async(req, res) => {
  const idListeningType = parseInt(req.params.id);
  const listeningType = await AppDataSource.manager.findOneBy(ListeningType, { id: idListeningType });

  if (!listeningType) {
    res.status(404).send('Ce type d\'écoute est introuvable.');
  }

  await AppDataSource.manager.remove(listeningType)
  res.sendStatus(200);
});

export default router;