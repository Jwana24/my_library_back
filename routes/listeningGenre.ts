import express from "express";
const router = express.Router();
import { AppDataSource } from "../src/data-source.js";
import { ListeningGenre } from "../src/entity/ListeningGenre.js";

router.post('/listening-genre', async(req, res) => {
  const dataListeningGenre = req.body;

  try {
    const insertListeningGenre = await AppDataSource.manager.insert(ListeningGenre, dataListeningGenre);
    const id = (insertListeningGenre).identifiers[0].id;
    res.status(201).json(await AppDataSource.manager.findOneBy(ListeningGenre, { id: id }));
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/listening-genre', async (req, res) => {
  res.status(200).json(await AppDataSource.manager.find(ListeningGenre));
});

router.get('/listening-genre/:id', async(req, res) => {
  const idListeningGenre = parseInt(req.params.id);
  const listeningGenre = await AppDataSource.manager.findOneBy(ListeningGenre, { id: idListeningGenre });

  if (!listeningGenre) {
    res.status(404).send('Ce genre d\'écoute est introuvable.');
  }
  res.status(200).json(listeningGenre);
});

router.patch('/listening-genre/:id', async(req, res) => {
  const idListeningGenre = parseInt(req.params.id);
  const dataListeningGenre = req.body;
  const listeningGenre = await AppDataSource.manager.findOneBy(ListeningGenre, { id: idListeningGenre });

  if (!listeningGenre) {
    res.status(404).send('Ce genre d\'écoute est introuvable.');
  }

  res.status(201).json(await AppDataSource.manager.save(ListeningGenre,
    {
      ...listeningGenre,
      ...dataListeningGenre
    }
  ));
});

router.delete('/listening-genre/:id', async(req, res) => {
  const idListeningGenre = parseInt(req.params.id);
  const listeningGenre = await AppDataSource.manager.findOneBy(ListeningGenre, { id: idListeningGenre });

  if (!listeningGenre) {
    res.status(404).send('Ce genre d\'écoute est introuvable.');
  }

  await AppDataSource.manager.remove(listeningGenre)
  res.sendStatus(200);
});

export default router;