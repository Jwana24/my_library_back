import { Request, Response } from 'express';
import { AppDataSource } from "../data-source";
import { Watching } from "../entity/Watching.js";

export const create = async(req: Request, res: Response) => {
  const dataWatching = req.body;

  try {
    const insertWatching = await AppDataSource.manager.insert(Watching, dataWatching);
    const id = (insertWatching).identifiers[0].id;
    res.status(201).json(await AppDataSource.manager.findOneBy(Watching, { id: id }));
  } catch (error) {
    res.status(500).send(error);
  }
}

export const getAll = async(_req: Request, res: Response) => {
  res.status(200).json(await AppDataSource.manager.find(Watching));
}

export const getOne = async(req: Request, res: Response) => {
  const idWatching = parseInt(req.params.id);
  const watching = await AppDataSource.manager.findOneBy(Watching, { id: idWatching });

  if (!watching) {
    res.status(404).send('Ce visionnage est introuvable.');
  }
  res.status(200).json(watching);
}

export const update = async(req: Request, res: Response) => {
  const idWatching = parseInt(req.params.id);
  const dataWatching = req.body;
  const watching = await AppDataSource.manager.findOneBy(Watching, { id: idWatching });

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
  const watching = await AppDataSource.manager.findOneBy(Watching, { id: idWatching });

  if (!watching) {
    res.status(404).send('Ce visionnage est introuvable.');
  }

  await AppDataSource.manager.remove(watching)
  res.sendStatus(200);
}