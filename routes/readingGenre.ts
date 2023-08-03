import express from "express";
const router = express.Router();
import { AppDataSource } from "../src/data-source.js";
import { ReadingGenre } from "../src/entity/ReadingGenre.js";
import { ReadingType } from "../src/entity/ReadingType";

router.post('/reading-genre', async(req, res) => {
  const dataReadingGenre = req.body;

  try {
    const insertReadingGenre = await AppDataSource.manager.insert(ReadingGenre, dataReadingGenre);
    const id = (insertReadingGenre).identifiers[0].id;
    res.status(201).json(await AppDataSource.manager.findOneBy(ReadingGenre, { id: id }));
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/reading-genre', async (req, res) => {
  res.status(200).json(await AppDataSource.manager.find(ReadingGenre));
});

router.get('/reading-genre/:id', async(req, res) => {
  const idReadingGenre = parseInt(req.params.id);
  const readingGenre = await AppDataSource.manager.findOneBy(ReadingGenre, { id: idReadingGenre });

  if (!readingGenre) {
    res.status(404).send('Ce genre de lecture est introuvable.');
  }
  res.status(200).json(readingGenre);
});

router.patch('/reading-genre/:id', async(req, res) => {
  const idReadingGenre = parseInt(req.params.id);
  const dataReadingGenre = req.body;
  const readingGenre = await AppDataSource.manager.findOneBy(ReadingGenre, { id: idReadingGenre });

  if (!readingGenre) {
    res.status(404).send('Ce genre de lecture est introuvable.');
  }

  res.status(201).json(await AppDataSource.manager.save(ReadingGenre,
    {
      ...readingGenre,
      ...dataReadingGenre
    }
  ));
});

router.delete('/reading-genre/:id', async(req, res) => {
  const idReadingGenre = parseInt(req.params.id);
  const readingGenre = await AppDataSource.manager.findOneBy(ReadingGenre, { id: idReadingGenre });

  if (!readingGenre) {
    res.status(404).send('Ce genre de lecture est introuvable.');
  }

  await AppDataSource.manager.remove(readingGenre)
  res.sendStatus(200);
});

export default router;