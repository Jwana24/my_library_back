import { Request, Response } from 'express';
import { AppDataSource } from "../data-source";
import { ListeningGenre } from "../entity/ListeningGenre";

export const create = async(req: Request, res: Response) => {
  const dataListeningGenre = req.body;

  try {
    const insertListeningGenre = await AppDataSource.manager.save(ListeningGenre, dataListeningGenre);

    res.status(201).json(await AppDataSource.manager.findOne(
      ListeningGenre,
      { where: { id: insertListeningGenre.id } }
    ));
  } catch (error) {
    res.status(500).send(error);
  }
}

export const getAll = async(_req: Request, res: Response) => {
  res.status(200).json(await AppDataSource.manager.find(ListeningGenre, {
    order: {
      name: "ASC"
    },
    relations: ['type']
  }));
}

export const getOne = async(req: Request, res: Response) => {
  const idListeningGenre = parseInt(req.params.id);
  const listeningGenre = await AppDataSource.manager.findOne(
    ListeningGenre,
    { where: { id: idListeningGenre } }
  );

  if (!listeningGenre) {
    res.status(404).send('Ce genre d\'écoute est introuvable.');
  }
  res.status(200).json(listeningGenre);
}

export const update = async(req: Request, res: Response) => {
  const idListeningGenre = parseInt(req.params.id);
  const dataListeningGenre = req.body;
  const listeningGenre = await AppDataSource.manager.findOne(
    ListeningGenre,
    { where: { id: idListeningGenre } }
  );

  if (!listeningGenre) {
    res.status(404).send('Ce genre d\'écoute est introuvable.');
  }

  res.status(201).json(await AppDataSource.manager.save(ListeningGenre,
    {
      ...listeningGenre,
      ...dataListeningGenre
    }
  ));
}

export const deleteOne = async(req: Request, res: Response) => {
  const idListeningGenre = parseInt(req.params.id);
  const listeningGenre = await AppDataSource.manager.findOne(
    ListeningGenre,
    { where: { id: idListeningGenre } }
  );

  if (!listeningGenre) {
    res.status(404).send('Ce genre d\'écoute est introuvable.');
  }

  await AppDataSource.manager.remove(listeningGenre)
  res.sendStatus(200);
}