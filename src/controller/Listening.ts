import { Request, Response } from 'express';
import { AppDataSource } from "../data-source";
import { Listening } from "../entity/Listening.js";
import { Watching } from "../entity/Watching";

export const create = async(req: Request, res: Response) => {
  const dataListening = req.body;

  try {
    const insertListening = await AppDataSource.manager.save(Listening, dataListening);

    res.status(201).json(await AppDataSource.manager.findOne(
      Listening,
      { where: { id: insertListening.id }, relations: ['genres', 'type'] }
    ));
  } catch (error) {
    res.status(500).send(error);
  }
}

export const getAll = async(req: Request, res: Response) => {
  const sortQuery: { [key: string]: 'ASC' | 'DESC' } = req.query.sort as { [key: string]: 'ASC' | 'DESC' };
  const filterQuery: { [key: string]: string } = req.query.filter as { [key: string]: string };

  const queryBuilder = AppDataSource.manager
    .getRepository(Listening)
    .createQueryBuilder("listening")
    .leftJoinAndSelect(
      "listening.type",
      "ltype"
    )
    .leftJoinAndSelect(
      "listening.genres",
      "lgenres"
    )
  ;

  if (sortQuery) {
    queryBuilder.orderBy({
      ...(sortQuery.title && { "listening.title": sortQuery.title }),
      // ...(sortQuery.rating && { "listening.rating": sortQuery.rating })
    });
  }
  if (filterQuery) {
    if (filterQuery.title) {
      queryBuilder.andWhere("listening.title LIKE :title", { title: `${filterQuery.title}%` });
    }
    if (filterQuery.genre) {
      queryBuilder.andWhere("lgenres.name = :genre", { genre: filterQuery.genre });
    }
    if (filterQuery.type) {
      queryBuilder.andWhere("ltype.name = :type", { type: filterQuery.type });
    }
    if (filterQuery.status) {
      queryBuilder.andWhere("listening.status = :status", { status: filterQuery.status });
    }
  }

  const listenings = await queryBuilder.getMany();

  res.status(200).json(listenings);
}

export const getOne = async(req: Request, res: Response) => {
  const idListening = parseInt(req.params.id);
  const listening = await AppDataSource.manager.findOne(
    Listening,
    { where: { id: idListening }, relations: ['genres', 'type'] }
  );

  if (!listening) {
    res.status(404).send('Cette écoute est introuvable.');
  }
  res.status(200).json(listening);
}

export const update = async(req: Request, res: Response) => {
  const idListening = parseInt(req.params.id);
  const dataListening = req.body;
  const listening = await AppDataSource.manager.findOne(
    Listening,
    { where: { id: idListening }, relations: ['genres', 'type'] }
  );

  if (!listening) {
    res.status(404).send('Cette écoute est introuvable.');
  }

  res.status(201).json(await AppDataSource.manager.save(Listening,
    {
      ...listening,
      ...dataListening
    }
  ));
}

export const deleteOne = async(req: Request, res: Response) => {
  const idListening = parseInt(req.params.id);
  const listening = await AppDataSource.manager.findOne(
    Listening,
    { where: { id: idListening }, relations: ['genres', 'type'] }
  );

  if (!listening) {
    res.status(404).send('Cette écoute est introuvable.');
  }

  await AppDataSource.manager.remove(listening)
  res.sendStatus(200);
}