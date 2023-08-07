import { Request, Response } from 'express';
import { AppDataSource } from "../data-source";
import { Listening } from "../entity/Listening.js";

export const create = async(req: Request, res: Response) => {
  const dataListening = req.body;

  try {
    const insertListening = await AppDataSource.manager.insert(Listening, dataListening);
    const id = (insertListening).identifiers[0].id;
    res.status(201).json(await AppDataSource.manager.findOne(
      Listening,
      { where: { id: id }, relations: ['genres', 'type'] }
    ));
  } catch (error) {
    res.status(500).send(error);
  }
}

export const getAll = async(_req: Request, res: Response) => {
  res.status(200).json(await AppDataSource.manager.find(Listening));
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