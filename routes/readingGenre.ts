import express from "express";
const router = express.Router();
import { create, deleteOne, getAll, getOne, update } from "../src/controller/ReadingGenre.js";

router.post('/reading-genre', async(req, res) => {
  await create(req, res);
});

router.get('/reading-genre', async (req, res) => {
  await getAll(req, res);
});

router.get('/reading-genre/:id', async(req, res) => {
  await getOne(req, res);
});

router.patch('/reading-genre/:id', async(req, res) => {
  await update(req, res);
});

router.delete('/reading-genre/:id', async(req, res) => {
  await deleteOne(req, res);
});

export default router;