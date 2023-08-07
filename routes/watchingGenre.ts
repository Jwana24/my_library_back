import express from "express";
const router = express.Router();
import { create, deleteOne, getAll, getOne, update } from "../src/controller/WatchingGenre.js";

router.post('/watching-genre', async(req, res) => {
  await create(req, res);
});

router.get('/watching-genre', async (req, res) => {
  await getAll(req, res);
});

router.get('/watching-genre/:id', async(req, res) => {
  await getOne(req, res);
});

router.patch('/watching-genre/:id', async(req, res) => {
  await update(req, res);
});

router.delete('/watching-genre/:id', async(req, res) => {
  await deleteOne(req, res);
});

export default router;