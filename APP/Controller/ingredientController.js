// ingredient

import express from 'express';
import * as ingredientService from '../Service/ingredientService.js';
import { pool } from '../utility/DbHelper.js';
const router = express.Router();

export async function getIngredientList(req, res) {
  try {
    const result = await ingredientService.getIngredientList();
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

export async function getIngredientById(req, res) {
  try {
    const ingredientId = req.params.ingredientId;
    const result = await ingredientService.getIngredientDetails(ingredientId);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}
export async function createNewIngredient(req, res) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const ingredientDetails = req.body;
    await ingredientService.createNewIngredient(ingredientDetails, client);
    res.send({ message: 'Ingredient created successfully' });
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    console.log(error);
    res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
}

export async function updateIngredientAvatar(req, res) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const ingredientId = req.params.ingredientId;
    const image = req.file;
    await ingredientService.updateIngredientAvatar(ingredientId, image, client);
    res.send({ message: `Ingredient's avatar updated successfully` });
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');

    console.log(error);
    res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
}
export async function updateIngredient(req, res) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const ingredientId = req.params.ingredientId;
    const ingredientDetails = req.body;
    await ingredientService.updateIngredient(
      ingredientId,
      ingredientDetails,
      client,
    );
    res.send({ message: 'Ingredient updated successfully' });
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');

    console.log(error);
    res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
}
export async function deleteIngredient(req, res) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const ingredientId = req.params.ingredientId;
    await ingredientService.deleteIngredient(ingredientId, client);
    res.send({ message: 'Ingredient deleted' });
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');

    console.log(error);
    res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
}
export default router;
