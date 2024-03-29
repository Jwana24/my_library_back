import { Request, Response } from 'express';
import { AppDataSource } from "../data-source";
import { ReadingType } from "../entity/ReadingType";

export const create = async(req: Request, res: Response) => {
  const dataReadingType = req.body;

  try {
    const insertReadingType = await AppDataSource.manager.save(ReadingType, dataReadingType);

    res.status(201).json(await AppDataSource.manager.findOne(
      ReadingType,
      { where: { id: insertReadingType.id } }
    ));
  } catch (error) {
    res.status(500).send(error);
  }
}

export const getAll = async(_req: Request, res: Response) => {
  res.status(200).json(await AppDataSource.manager.find(ReadingType,
    {
      relations: ['genres'],
      order: {
        genres: {
          name: "ASC"
        }
      }
    }
  ));
}

export const getOne = async(req: Request, res: Response) => {
  const idReadingType = parseInt(req.params.id);
  const readingType = await AppDataSource.manager.findOne(
    ReadingType,
    { where: { id: idReadingType } }
  );

  if (!readingType) {
    res.status(404).send('Ce type de lecture est introuvable.');
  }
  res.status(200).json(readingType);
}

export const update = async(req: Request, res: Response) => {
  const idReadingType = parseInt(req.params.id);
  const dataReadingType = req.body;
  const readingType = await AppDataSource.manager.findOne(
    ReadingType,
    { where: { id: idReadingType } }
  );

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
  const readingType = await AppDataSource.manager.findOne(
    ReadingType,
    { where: { id: idReadingType } }
  );

  if (!readingType) {
    res.status(404).send('Ce type de lecture est introuvable.');
  }

  await AppDataSource.manager.remove(readingType)
  res.sendStatus(200);
}