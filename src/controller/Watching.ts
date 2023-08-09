import { Request, Response } from 'express';
import { AppDataSource } from "../data-source";
import { Watching } from "../entity/Watching.js";
import { Reading } from "../entity/Reading";

export const create = async(req: Request, res: Response) => {
  const dataWatching = req.body;

  try {
    const insertWatching = await AppDataSource.manager.save(Watching, dataWatching);

    res.status(201).json(await AppDataSource.manager.findOne(
      Watching,
      { where: { id: insertWatching.id }, relations: ['genres', 'type'] }
    ));
  } catch (error) {
    res.status(500).send(error);
  }
}

export const getAll = async(req: Request, res: Response) => {
  const sortQuery: { [key: string]: 'ASC' | 'DESC' } = req.query.sort as { [key: string]: 'ASC' | 'DESC' };
  const filterQuery: { [key: string]: string } = req.query.filter as { [key: string]: string };

  const queryBuilder = AppDataSource.manager
    .getRepository(Watching)
    .createQueryBuilder("watching")
    .leftJoinAndSelect(
      "watching.type",
      "wtype"
    )
    .leftJoinAndSelect(
      "watching.genres",
      "wgenres"
    )
  ;

  if (sortQuery) {
    queryBuilder.orderBy({
      ...(sortQuery.title && { "watching.title": sortQuery.title }),
      // ...(sortQuery.rating && { "watching.rating": sortQuery.rating })
    });
  }
  if (filterQuery) {
    queryBuilder.where("watching.title LIKE :title", { title: `%${filterQuery.title}%` });
    /* todo: filter on genre
           : filter on type
           : filter on status
    */
  }

  // console.log(queryBuilder.getSql())

  const watchings = await queryBuilder.getMany();

  res.status(200).json(watchings);
}

export const getOne = async(req: Request, res: Response) => {
  const idWatching = parseInt(req.params.id);
  const watching = await AppDataSource.manager.findOne(
    Watching,
    { where: { id: idWatching }, relations: ['genres', 'type'] }
  );

  if (!watching) {
    res.status(404).send('Ce visionnage est introuvable.');
  }
  res.status(200).json(watching);
}

export const update = async(req: Request, res: Response) => {
  const idWatching = parseInt(req.params.id);
  const dataWatching = req.body;
  const watching = await AppDataSource.manager.findOne(
    Watching,
    { where: { id: idWatching }, relations: ['genres', 'type'] }
  );

  if (!watching) {
    res.status(404).send('Ce visionnage est introuvable.');
  }

  res.status(201).json(await AppDataSource.manager.save(Watching,
    {
      ...watching,
      ...dataWatching
    }
  ));
}

export const deleteOne = async(req: Request, res: Response) => {
  const idWatching = parseInt(req.params.id);
  const watching = await AppDataSource.manager.findOne(
    Watching,
    { where: { id: idWatching }, relations: ['genres', 'type'] }
  );

  if (!watching) {
    res.status(404).send('Ce visionnage est introuvable.');
  }

  await AppDataSource.manager.remove(watching)
  res.sendStatus(200);
}