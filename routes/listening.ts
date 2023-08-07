import express from "express";
const router = express.Router();
import { create, deleteOne, getAll, getOne, update } from "../src/controller/Listening.js";

router.post('/listening', async(req, res) => {
  await create(req, res);
});

router.get('/listening', async (req, res) => {
  await getAll(req, res);
});

router.get('/listening/:id', async(req, res) => {
  await getOne(req, res);
});

router.patch('/listening/:id', async(req, res) => {
  await update(req, res);
});

router.delete('/listening/:id', async(req, res) => {
  await deleteOne(req, res);
});

export default router;