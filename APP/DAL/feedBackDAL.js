// userService.js

import * as feedBackSQL from '../SQL/feedBackSQL.js';
import { pool } from '../utility/DbHelper.js';

export async function getFoodFeedBacks() {
  const getFoodFeedBacksQuery = feedBackSQL.getFoodFeedBacks();
  const getFoodFeedBacks = await pool.query(getFoodFeedBacksQuery);
  return getFoodFeedBacks.rows;
}

export async function getMenuFeedBacks() {
  const getMenuFeedBackList = feedBackSQL.getMenuFeedBacks();
  const result = await pool.query(getMenuFeedBackList);
  return result.rows;
}

export async function getTrainerFeedBacks() {
  const getMenuFeedBackList = feedBackSQL.getTrainerFeedBacks();
  const result = await pool.query(getMenuFeedBackList);
  return result.rows;
}

//

export async function getFoodFeedBackByFoodId(foodId) {
  const getFoodFeedBackByFoodIdQuery =
    feedBackSQL.getFoodFeedBackByFoodId(foodId);
  const getFoodFeedBackByFoodId = await pool.query(
    getFoodFeedBackByFoodIdQuery,
  );
  return getFoodFeedBackByFoodId.rows;
}

export async function getMenuFeedBackByMenuId(menuId) {
  const getMenuFeedBackList = feedBackSQL.getMenuFeedBackByMenuId(menuId);
  const result = await pool.query(getMenuFeedBackList);
  return result.rows;
}

export async function getTrainerFeedBackByMenuId(trainerId) {
  const getMenuFeedBackList = feedBackSQL.getTrainerFeedBackByMenuId(trainerId);
  const result = await pool.query(getMenuFeedBackList);
  return result.rows;
}
