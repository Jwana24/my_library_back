import express from "express";
const router = express.Router();
import { create, deleteOne, getAll, getOne, update } from "../src/controller/ListeningGenre.js";

router.post('/listening-genre', async(req, res) => {
  await create(req, res);
});

router.get('/listening-genre', async (req, res) => {
  await getAll(req, res);
});

router.get('/listening-genre/:id', async(req, res) => {
  await getOne(req, res);
});

router.patch('/listening-genre/:id', async(req, res) => {
  await update(req, res);
});

router.delete('/listening-genre/:id', async(req, res) => {
  await deleteOne(req, res);
});

export default router;