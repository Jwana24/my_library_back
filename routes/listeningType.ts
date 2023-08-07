import express from "express";
const router = express.Router();
import { create, deleteOne, getAll, getOne, update } from "../src/controller/ListeningType.js";

router.post('/listening-type', async(req, res) => {
  await create(req, res);
});

router.get('/listening-type', async (req, res) => {
  await getAll(req, res);
});

router.get('/listening-type/:id', async(req, res) => {
  await getOne(req, res);
});

router.patch('/listening-type/:id', async(req, res) => {
  await update(req, res);
});

router.delete('/listening-type/:id', async(req, res) => {
  await deleteOne(req, res);
});

export default router;