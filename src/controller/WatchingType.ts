import { Request, Response } from 'express';
import { AppDataSource } from "../data-source";
import { WatchingType } from "../entity/WatchingType.js";

export const create = async(req: Request, res: Response) => {
  const dataWatchingType = req.body;

  try {
    const insertWatchingType = await AppDataSource.manager.insert(WatchingType, dataWatchingType);
    // TypeORM does not offer the result directly
    const id = (insertWatchingType).identifiers[0].id;
    res.status(201).json(await AppDataSource.manager.findOneBy(WatchingType, { id: id }));
  } catch (error) {
    res.status(500).send(error);
  }
}

export const getAll = async(_req: Request, res: Response) => {
  res.status(200).json(await AppDataSource.manager.find(WatchingType));
}

export const getOne = async(req: Request, res: Response) => {
  const idWatchingType = parseInt(req.params.id);
  const watchingType = await AppDataSource.manager.findOneBy(WatchingType, { id: idWatchingType });

  if (!watchingType) {
    res.status(404).send('Ce type de visionnage est introuvable.');
  }
  res.status(200).json(watchingType);
}

export const update = async(req: Request, res: Response) => {
  const idWatchingType = parseInt(req.params.id);
  const dataWatchingType = req.body;
  const watchingType = await AppDataSource.manager.findOneBy(WatchingType, { id: idWatchingType });

  if (!watchingType) {
    res.status(404).send('Ce type de visionnage est introuvable.');
  }

  res.status(201).json(await AppDataSource.manager.save(WatchingType,
    {
      ...watchingType,
      ...dataWatchingType
    }
  ));
}

export const deleteOne = async(req: Request, res: Response) => {
  const idWatchingType = parseInt(req.params.id);
  const watchingType = await AppDataSource.manager.findOneBy(WatchingType, { id: idWatchingType });

  if (!watchingType) {
    res.status(404).send('Ce type de visionnage est introuvable.');
  }

  await AppDataSource.manager.remove(watchingType)
  res.sendStatus(200);
}