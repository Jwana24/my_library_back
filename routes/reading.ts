import express from "express";
const router = express.Router();
import { create, deleteOne, getAll, getOne, update } from "../src/controller/Reading.js";

router.post('/reading', async(req, res) => {
  await create(req, res);
});

router.get('/reading', async (req, res) => {
  await getAll(req, res);
});

router.get('/reading/:id', async(req, res) => {
  await getOne(req, res);
});

router.patch('/reading/:id', async(req, res) => {
  await update(req, res);
});

router.delete('/reading/:id', async(req, res) => {
  await deleteOne(req, res);
});

export default router;