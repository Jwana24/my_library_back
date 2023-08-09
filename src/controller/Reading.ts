import { Request, Response } from 'express';
import { AppDataSource } from "../data-source";
import { Reading } from "../entity/Reading.js";

export const create = async(req: Request, res: Response) => {
  const dataReading = req.body;

  try {
    const insertReading = await AppDataSource.manager.save(Reading, dataReading);

    res.status(201).json(await AppDataSource.manager.findOne(
      Reading,
      { where: { id: insertReading.id }, relations: ['genres', 'type'] }
    ));
  } catch (error) {
    res.status(500).send(error);
  }
}

export const getAll = async(req: Request, res: Response) => {
  const sortQuery: { [key: string]: 'ASC' | 'DESC' } = req.query.sort as { [key: string]: 'ASC' | 'DESC' };
  // const filterQuery = req.query.filter;

  const queryBuilder = AppDataSource.manager
    .getRepository(Reading)
    .createQueryBuilder("reading")
    .leftJoinAndSelect(
      "reading.type",
      "rtype"
    )
    .leftJoinAndSelect(
      "reading.genres",
      "rgenres"
    )

  if (sortQuery) {
    queryBuilder.orderBy({
      ...(sortQuery.title && {"reading.title": sortQuery.title}),
      // ...(sortQuery.rating && { "reading.rating": sortQuery.rating })
    });
  }

  const readings = await queryBuilder.getMany();

  res.status(200).json(readings);
}

export const getOne = async(req: Request, res: Response) => {
  const idReading = parseInt(req.params.id);
  const reading = await AppDataSource.manager.findOne(
    Reading,
    { where: { id: idReading }, relations: ['genres', 'type'] }
  );

  if (!reading) {
    res.status(404).send('Cette lecture est introuvable.');
  }
  res.status(200).json(reading);
}

export const update = async(req: Request, res: Response) => {
  const idReading = parseInt(req.params.id);
  const dataReading = req.body;
  const reading = await AppDataSource.manager.findOne(
    Reading,
    { where: { id: idReading }, relations: ['genres', 'type'] }
  );

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
  const reading = await AppDataSource.manager.findOne(
    Reading,
    { where: { id: idReading }, relations: ['genres', 'type'] }
  );

  if (!reading) {
    res.status(404).send('Cette lecture est introuvable.');
  }

  await AppDataSource.manager.remove(reading)
  res.sendStatus(200);
}