import express from "express";
const router = express.Router();
import { AppDataSource } from "../src/data-source.js";
import { ReadingType } from "../src/entity/ReadingType.js";

router.post('/reading-type', async(req, res) => {
  const dataReadingType = req.body;

  try {
    const insertReadingType = await AppDataSource.manager.insert(ReadingType, dataReadingType);
    // TypeORM does not offer the result directly
    const id = (insertReadingType).identifiers[0].id;
    res.status(201).json(await AppDataSource.manager.findOneBy(ReadingType, { id: id }));
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/reading-type', async (req, res) => {
  res.status(200).json(await AppDataSource.manager.find(ReadingType));
});

router.get('/reading-type/:id', async(req, res) => {
  const idReadingType = parseInt(req.params.id);
  const readingType = await AppDataSource.manager.findOneBy(ReadingType, { id: idReadingType });

  if (!readingType) {
    res.status(404).send('Ce type de lecture est introuvable.');
  }
  res.status(200).json(readingType);
});

router.patch('/reading-type/:id', async(req, res) => {
  const idReadingType = parseInt(req.params.id);
  const dataReadingType = req.body;
  const readingType = await AppDataSource.manager.findOneBy(ReadingType, { id: idReadingType });

  if (!readingType) {
    res.status(404).send('Ce type de lecture est introuvable.');
  }

  res.status(201).json(await AppDataSource.manager.save(ReadingType,
    {
      ...readingType,
      ...dataReadingType
    }
  ));
});

router.delete('/reading-type/:id', async(req, res) => {
  const idReadingType = parseInt(req.params.id);
  const readingType = await AppDataSource.manager.findOneBy(ReadingType, { id: idReadingType });

  if (!readingType) {
    res.status(404).send('Ce type de lecture est introuvable.');
  }

  await AppDataSource.manager.remove(readingType)
  res.sendStatus(200);
});

export default router;