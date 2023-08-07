import { Request, Response } from 'express';
import { AppDataSource } from "../data-source";
import { ListeningType } from "../entity/ListeningType.js";

export const create = async(req: Request, res: Response) => {
  const dataListeningType = req.body;

  try {
    const insertListeningType = await AppDataSource.manager.insert(ListeningType, dataListeningType);
    // TypeORM does not offer the result directly
    const id = (insertListeningType).identifiers[0].id;
    res.status(201).json(await AppDataSource.manager.findOne(
      ListeningType,
      { where: { id: id }, relations: ['genres', 'type'] }
    ));
  } catch (error) {
    res.status(500).send(error);
  }
}

export const getAll = async(_req: Request, res: Response) => {
  res.status(200).json(await AppDataSource.manager.find(ListeningType));
}

export const getOne = async(req: Request, res: Response) => {
  const idListeningType = parseInt(req.params.id);
  const listeningType = await AppDataSource.manager.findOne(
    ListeningType,
    { where: { id: idListeningType }, relations: ['genres', 'type'] }
  );

  if (!listeningType) {
    res.status(404).send('Ce type d\'écoute est introuvable.');
  }
  res.status(200).json(listeningType);
}

export const update = async(req: Request, res: Response) => {
  const idListeningType = parseInt(req.params.id);
  const dataListeningType = req.body;
  const listeningType = await AppDataSource.manager.findOne(
    ListeningType,
    { where: { id: idListeningType }, relations: ['genres', 'type'] }
  );

  if (!listeningType) {
    res.status(404).send('Ce type d\'écoute est introuvable.');
  }

  res.status(201).json(await AppDataSource.manager.save(ListeningType,
    {
      ...listeningType,
      ...dataListeningType
    }
  ));
}

export const deleteOne = async(req: Request, res: Response) => {
  const idListeningType = parseInt(req.params.id);
  const listeningType = await AppDataSource.manager.findOne(
    ListeningType,
    { where: { id: idListeningType }, relations: ['genres', 'type'] }
  );

  if (!listeningType) {
    res.status(404).send('Ce type d\'écoute est introuvable.');
  }

  await AppDataSource.manager.remove(listeningType)
  res.sendStatus(200);
}