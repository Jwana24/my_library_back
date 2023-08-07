import express from "express";
const router = express.Router();
import { create, deleteOne, getAll, getOne, update } from "../src/controller/ReadingType.js";

router.post('/reading-type', async(req, res) => {
  await create(req, res);
});

router.get('/reading-type', async (req, res) => {
  await getAll(req, res);
});

router.get('/reading-type/:id', async(req, res) => {
  await getOne(req, res);
});

router.patch('/reading-type/:id', async(req, res) => {
  await update(req, res);
});

router.delete('/reading-type/:id', async(req, res) => {
  await deleteOne(req, res);
});

export default router;