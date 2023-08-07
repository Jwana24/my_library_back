import express from "express";
const router = express.Router();
import { create, deleteOne, getAll, getOne, update } from "../src/controller/WatchingType.js";

router.post('/watching-type', async(req, res) => {
  await create(req, res);
});

router.get('/watching-type', async (req, res) => {
  await getAll(req, res);
});

router.get('/watching-type/:id', async(req, res) => {
  await getOne(req, res);
});

router.patch('/watching-type/:id', async(req, res) => {
  await update(req, res);
});

router.delete('/watching-type/:id', async(req, res) => {
  await deleteOne(req, res);
});

export default router;