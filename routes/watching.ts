import express from "express";
const router = express.Router();
import { create, deleteOne, getAll, getOne, update } from "../src/controller/Watching.js";

router.post('/watching', async(req, res) => {
  await create(req, res);
});

router.get('/watching', async (req, res) => {
  await getAll(req, res);
});

router.get('/watching/:id', async(req, res) => {
  await getOne(req, res);
});

router.patch('/watching/:id', async(req, res) => {
  await update(req, res);
});

router.delete('/watching/:id', async(req, res) => {
  await deleteOne(req, res);
});

export default router;