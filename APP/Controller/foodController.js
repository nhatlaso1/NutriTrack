import express from 'express';
import * as foodService from '../Service/foodService.js';
import { pool } from '../utility/DbHelper.js';
const router = express.Router();

export async function getFoodList(req, res) {
  try {
    const result = await foodService.getFoodList();
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(404);
  }
}
export async function getAllFoodByFoodName(req, res) {
  try {
    const foodName = req.query.foodName;
    const result = await foodService.getAllFoodByFoodName(foodName);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(404);
  }
}

export async function getFoodDetails(req, res) {
  try {
    const foodId = req.params.foodId;
    const result = await foodService.getFoodDetails(foodId);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(404).send({ message: err.message });
  }
}

export async function createFood(req, res) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const foodDetails = req.body;
    await foodService.createFood(foodDetails, client);
    res.send({ message: 'food created successfully' });
    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    console.log(err);
    res.status(404).send({ message: err.message });
  } finally {
    client.release();
  }
}

export async function updateFoodAvatar(req, res) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const foodId = req.params.foodId;
    const image = req.file;
    await foodService.updateFoodAvatar(foodId, image, client);
    res.send({ message: `food's avatar updated successfully` });
    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    console.log(err);
    res.status(404).send({ message: err.message });
  } finally {
    client.release();
  }
}
export async function updateFood(req, res) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const foodId = req.params.foodId;
    const foodDetails = req.body;
    foodDetails.food_id = foodId;
    await foodService.updateFood(foodDetails, client);
    res.send({ message: 'food updated successfully' });
    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    console.log(err);
    res.status(404).send({ message: err.message });
  } finally {
    client.release();
  }
}
export async function deleteFood(req, res) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    const foodId = req.params.foodId;
    await foodService.deleteFood(foodId);
    res.send({ message: 'food deleted successfully' });
    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    console.log(err);
    res.status(404).send({ message: err.message });
  } finally {
    client.release();
  }
}

export default router;
