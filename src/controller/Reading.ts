import { Request, Response } from 'express';
import { AppDataSource } from "../data-source";
import { Reading } from "../entity/Reading.js";

export const create = async(req: Request, res: Response) => {
  const dataReading = req.body;

  try {
    const insertReading = await AppDataSource.manager.insert(Reading, dataReading);
    // TypeORM does not offer the result directly
    const id = (insertReading).identifiers[0].id;
    res.status(201).json(await AppDataSource.manager.findOneBy(Reading, { id: id }));
  } catch (error) {
    res.status(500).send(error);
  }
}

export const getAll = async(_req: Request, res: Response) => {
  res.status(200).json(await AppDataSource.manager.find(Reading));
}

export const getOne = async(req: Request, res: Response) => {
  const idReading = parseInt(req.params.id);
  const reading = await AppDataSource.manager.findOneBy(Reading, { id: idReading });

  if (!reading) {
    res.status(404).send('Cette lecture est introuvable.');
  }
  res.status(200).json(reading);
}

export const update = async(req: Request, res: Response) => {
  const idReading = parseInt(req.params.id);
  const dataReading = req.body;
  const reading = await AppDataSource.manager.findOneBy(Reading, { id: idReading });

  if (!reading) {
    res.status(404).send('Cette lecture est introuvable.');
  }

  res.status(201).json(await AppDataSource.manager.save(Reading,
    {
      ...reading,
      ...dataReading
    }
  ));
}

export const deleteOne = async(req: Request, res: Response) => {
  const idReading = parseInt(req.params.id);
  const reading = await AppDataSource.manager.findOneBy(Reading, { id: idReading });

  if (!reading) {
    res.status(404).send('Cette lecture est introuvable.');
  }

  await AppDataSource.manager.remove(reading)
  res.sendStatus(200);
}