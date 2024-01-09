import * as menuSQL from '../SQL/menuSQL.js';
import { pool } from '../utility/DbHelper.js';
export async function getMenuList() {
  const getMenuListQuery = menuSQL.getMenuList();
  const menulist = await pool.query(getMenuListQuery);
  return menulist.rows;
}

export async function getMenuFoodDetails(menuId) {
  const getMenuDetailsQuery = menuSQL.getMenuFoodDetails(menuId);
  const menu = await pool.query(getMenuDetailsQuery);
  return menu.rows;
}

export async function getMenuFoodDetailsByName(menuName) {
  const getMenuDetailsQuery = menuSQL.getMenuFoodDetailsByName(menuName);
  const menu = await pool.query(getMenuDetailsQuery);
  return menu.rows;
}
export async function createMenu(menuDetails, client) {
  const createMenuQuery = menuSQL.createMenu(menuDetails);
  await client.query(createMenuQuery);
}
export async function updateMenu(menuDetails, client) {
  const updateMenuQuery = menuSQL.updateMenu(menuDetails);
  await client.query(updateMenuQuery);
}
export async function deleteMenu(menuId, client) {
  const deleteMenuQuery = menuSQL.deleteMenu(menuId);
  await client.query(deleteMenuQuery);
}

export async function getMenuDetails(menuId) {
  const getMenuDetailsQuery = menuSQL.getMenuDetails(menuId);
  const menu = await pool.query(getMenuDetailsQuery);
  return menu.rows;
}

export async function getFoodByMenu(menuId) {
  const getMenuDetailsQuery = menuSQL.getFoodByMenu(menuId);
  const menu = await pool.query(getMenuDetailsQuery);
  return menu.rows;
}

export async function updateMenuAvatar(menuId, image, client) {
  const query = menuSQL.updateMenuAvatar(menuId, image.path);
  await client.query(query);
}
