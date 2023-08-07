import { Request, Response } from 'express';
import { AppDataSource } from "../data-source";
import { WatchingGenre } from "../entity/WatchingGenre.js";

export const create = async(req: Request, res: Response) => {
  const dataWatchingGenre = req.body;

  try {
    const insertWatchingGenre = await AppDataSource.manager.insert(WatchingGenre, dataWatchingGenre);
    const id = (insertWatchingGenre).identifiers[0].id;
    res.status(201).json(await AppDataSource.manager.findOneBy(WatchingGenre, { id: id }));
  } catch (error) {
    res.status(500).send(error);
  }
}

export const getAll = async(_req: Request, res: Response) => {
  res.status(200).json(await AppDataSource.manager.find(WatchingGenre));
}

export const getOne = async(req: Request, res: Response) => {
  const idWatchingGenre = parseInt(req.params.id);
  const watchingGenre = await AppDataSource.manager.findOneBy(WatchingGenre, { id: idWatchingGenre });

  if (!watchingGenre) {
    res.status(404).send('Ce genre de visionnage est introuvable.');
  }
  res.status(200).json(watchingGenre);
}

export const update = async(req: Request, res: Response) => {
  const idWatchingGenre = parseInt(req.params.id);
  const dataWatchingGenre = req.body;
  const watchingGenre = await AppDataSource.manager.findOneBy(WatchingGenre, { id: idWatchingGenre });

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
  const watchingGenre = await AppDataSource.manager.findOneBy(WatchingGenre, { id: idWatchingGenre });

  if (!watchingGenre) {
    res.status(404).send('Ce genre de visionnage est introuvable.');
  }

  await AppDataSource.manager.remove(watchingGenre)
  res.sendStatus(200);
}