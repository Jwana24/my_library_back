import { Request, Response } from 'express';
import { AppDataSource } from "../data-source";
import { Watching } from "../entity/Watching";

export const create = async(req: Request, res: Response) => {
  const dataWatching = req.body;

  try {
    const watching = AppDataSource.manager.create(Watching, dataWatching);
    const insertWatching = await AppDataSource.manager.save(watching);

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
    if (filterQuery.title) {
      queryBuilder.andWhere("watching.title LIKE :title", { title: `${filterQuery.title}%` });
    }
    if (filterQuery.genre) {
      queryBuilder.andWhere("wgenres.name = :genre", { genre: filterQuery.genre });
    }
    if (filterQuery.type) {
      queryBuilder.andWhere("wtype.name = :type", { type: filterQuery.type });
    }
    if (filterQuery.status) {
      queryBuilder.andWhere("watching.status = :status", { status: filterQuery.status });
    }
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

  try {
    const updatedWatching = AppDataSource.manager.create(Watching,
      {
        ...watching,
        ...dataWatching
      }
    );

    await AppDataSource.manager.save(Watching, updatedWatching);

    const watchingAfterUpdate = await AppDataSource.manager.findOne(
      Watching,
      {where: {id: idWatching}, relations: ['genres', 'type']}
    );

    res.status(201).json(watchingAfterUpdate);
  } catch (error) {
    res.status(500).send(error);
  }
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