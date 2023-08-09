import { Request, Response } from 'express';
import { AppDataSource } from "../data-source";
import { WatchingGenre } from "../entity/WatchingGenre.js";

export const create = async(req: Request, res: Response) => {
  const dataWatchingGenre = req.body;

  try {
    const insertWatchingGenre = await AppDataSource.manager.save(WatchingGenre, dataWatchingGenre);

    res.status(201).json(await AppDataSource.manager.findOne(
      WatchingGenre,
      { where: { id: insertWatchingGenre.id } }
    ));
  } catch (error) {
    res.status(500).send(error);
  }
}

export const getAll = async(_req: Request, res: Response) => {
  res.status(200).json(await AppDataSource.manager.find(WatchingGenre, {
    order: {
      name: "ASC"
    }
  }));
}

export const getOne = async(req: Request, res: Response) => {
  const idWatchingGenre = parseInt(req.params.id);
  const watchingGenre = await AppDataSource.manager.findOne(
    WatchingGenre,
    { where: { id: idWatchingGenre } }
  );

  if (!watchingGenre) {
    res.status(404).send('Ce genre de visionnage est introuvable.');
  }
  res.status(200).json(watchingGenre);
}

export const update = async(req: Request, res: Response) => {
  const idWatchingGenre = parseInt(req.params.id);
  const dataWatchingGenre = req.body;
  const watchingGenre = await AppDataSource.manager.findOne(
    WatchingGenre,
    { where: { id: idWatchingGenre } }
  );

  if (!watchingGenre) {
    res.status(404).send('Ce genre de visionnage est introuvable.');
  }

  res.status(201).json(await AppDataSource.manager.save(WatchingGenre,
    {
      ...watchingGenre,
      ...dataWatchingGenre
    }
  ));
}

export const deleteOne = async(req: Request, res: Response) => {
  const idWatchingGenre = parseInt(req.params.id);
  const watchingGenre = await AppDataSource.manager.findOne(
    WatchingGenre,
    { where: { id: idWatchingGenre } }
  );

  if (!watchingGenre) {
    res.status(404).send('Ce genre de visionnage est introuvable.');
  }

  await AppDataSource.manager.remove(watchingGenre)
  res.sendStatus(200);
}