import { Request, Response } from 'express';
import { AppDataSource } from "../data-source";
import { ReadingGenre } from "../entity/ReadingGenre.js";

export const create = async(req: Request, res: Response) => {
  const dataReadingGenre = req.body;

  try {
    const insertReadingGenre = await AppDataSource.manager.insert(ReadingGenre, dataReadingGenre);
    const id = (insertReadingGenre).identifiers[0].id;
    res.status(201).json(await AppDataSource.manager.findOne(
      ReadingGenre,
      { where: { id: id }, relations: ['genres', 'type'] }
    ));
  } catch (error) {
    res.status(500).send(error);
  }
}

export const getAll = async(_req: Request, res: Response) => {
  res.status(200).json(await AppDataSource.manager.find(ReadingGenre));
}

export const getOne = async(req: Request, res: Response) => {
  const idReadingGenre = parseInt(req.params.id);
  const readingGenre = await AppDataSource.manager.findOne(
    ReadingGenre,
    { where: { id: idReadingGenre }, relations: ['genres', 'type'] }
  );

  if (!readingGenre) {
    res.status(404).send('Ce genre de lecture est introuvable.');
  }
  res.status(200).json(readingGenre);
}

export const update = async(req: Request, res: Response) => {
  const idReadingGenre = parseInt(req.params.id);
  const dataReadingGenre = req.body;
  const readingGenre = await AppDataSource.manager.findOne(
    ReadingGenre,
    { where: { id: idReadingGenre }, relations: ['genres', 'type'] }
  );

  if (!readingGenre) {
    res.status(404).send('Ce genre de lecture est introuvable.');
  }

  res.status(201).json(await AppDataSource.manager.save(ReadingGenre,
    {
      ...readingGenre,
      ...dataReadingGenre
    }
  ));
}

export const deleteOne = async(req: Request, res: Response) => {
  const idReadingGenre = parseInt(req.params.id);
  const readingGenre = await AppDataSource.manager.findOne(
    ReadingGenre,
    { where: { id: idReadingGenre }, relations: ['genres', 'type'] }
  );

  if (!readingGenre) {
    res.status(404).send('Ce genre de lecture est introuvable.');
  }

  await AppDataSource.manager.remove(readingGenre)
  res.sendStatus(200);
}