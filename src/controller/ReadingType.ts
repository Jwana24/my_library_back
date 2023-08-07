import { Request, Response } from 'express';
import { AppDataSource } from "../data-source";
import { ReadingType } from "../entity/ReadingType.js";

export const create = async(req: Request, res: Response) => {
  const dataReadingType = req.body;

  try {
    const insertReadingType = await AppDataSource.manager.insert(ReadingType, dataReadingType);
    // TypeORM does not offer the result directly
    const id = (insertReadingType).identifiers[0].id;
    res.status(201).json(await AppDataSource.manager.findOneBy(ReadingType, { id: id }));
  } catch (error) {
    res.status(500).send(error);
  }
}

export const getAll = async(_req: Request, res: Response) => {
  res.status(200).json(await AppDataSource.manager.find(ReadingType));
}

export const getOne = async(req: Request, res: Response) => {
  const idReadingType = parseInt(req.params.id);
  const readingType = await AppDataSource.manager.findOneBy(ReadingType, { id: idReadingType });

  if (!readingType) {
    res.status(404).send('Ce type de lecture est introuvable.');
  }
  res.status(200).json(readingType);
}

export const update = async(req: Request, res: Response) => {
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
}

export const deleteOne = async(req: Request, res: Response) => {
  const idReadingType = parseInt(req.params.id);
  const readingType = await AppDataSource.manager.findOneBy(ReadingType, { id: idReadingType });

  if (!readingType) {
    res.status(404).send('Ce type de lecture est introuvable.');
  }

  await AppDataSource.manager.remove(readingType)
  res.sendStatus(200);
}