import express from 'express';
import * as menuService from '../Service/menuService.js';
import { pool } from '../utility/DbHelper.js';
const router = express.Router();

export async function getMenuList(req, res) {
  try {
    const result = await menuService.getMenuList();
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(404);
  }
}

export async function getMenuFoodDetails(req, res) {
  try {
    const menuId = req.params.menuId;
    const result = await menuService.getMenuFoodDetails(menuId);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(404).send({ message: err.message });
  }
}

export async function createMenu(req, res) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const menuDetails = req.body;
    await menuService.createMenu(menuDetails, client);
    res.send({ message: 'menu created successfully' });
    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');

    console.log(err);
    res.status(404).send({ message: err.message });
  } finally {
    client.release();
  }
}

export async function updateMenuAvatar(req, res) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const menuId = req.params.menuId;
    const image = req.file;
    await menuService.updateMenuAvatar(menuId, image, client);
    res.send({ message: `menu's avatar updated successfully` });
    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');

    console.log(err);
    res.status(404).send({ message: err.message });
  } finally {
    client.release();
  }
}
export async function updateMenu(req, res) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const menuId = req.params.menuId;
    const menuDetails = req.body;
    menuDetails.menu_id = menuId;
    await menuService.updateMenu(menuDetails, client);
    res.send({ message: 'menu updated successfully' });
    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');

    console.log(err);
    res.status(404).send({ message: err.message });
  } finally {
    client.release();
  }
}
export async function deleteMenu(req, res) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const menuId = req.params.menuId;
    await menuService.deleteMenu(menuId);
    res.send({ message: 'menu deleted successfully' });
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
