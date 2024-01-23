import * as foodSQL from '../SQL/foodSQL.js';
import { pool } from '../utility/DbHelper.js';
export async function getFoodList() {
  const getFoodListQuery = foodSQL.getFoodList();
  const foodList = await pool.query(getFoodListQuery);
  return foodList.rows;
}
export async function getAllFoodByFoodName(foodName) {
  const getAllFoodByFoodNameQuery = foodSQL.getAllFoodByFoodName(foodName);
  const foodList = await pool.query(getAllFoodByFoodNameQuery);
  return foodList.rows;
}

export async function getFoodDetails(foodId) {
  const getFoodDetailsQuery = foodSQL.getFoodDetails(foodId);
  const food = await pool.query(getFoodDetailsQuery);
  return food.rows;
}

export async function getFoodDetailsByName(foodName) {
  const getFoodDetailsQuery = foodSQL.getFoodDetailsByName(foodName);
  const food = await pool.query(getFoodDetailsQuery);
  return food.rows;
}
export async function createFood(foodDetails, client) {
  const createFoodQuery = foodSQL.createFood(foodDetails);
  await client.query(createFoodQuery);
}
export async function updateFood(foodDetails, client) {
  const updateFoodQuery = foodSQL.updateFood(foodDetails);
  await client.query(updateFoodQuery);
}
export async function updateFoodAvatar(foodId, image, client) {
  const query = foodSQL.updateFoodAvatar(foodId, image.path);
  await client.query(query);
}

export async function deleteFood(foodId, client) {
  const deleteFoodQuery = foodSQL.deleteFood(foodId);
  await client.query(deleteFoodQuery);
}
export async function createFoodIngredient(foodId, ingredientIds, client) {
  const createFoodIngredientQuery = foodSQL.createFoodIngredient(
    foodId,
    ingredientIds,
  );
  await client.query(createFoodIngredientQuery);
}
export async function getFoodCategory(foodCategoryName) {
  const getFoodCategoryDetailsQuery = foodSQL.getFoodCategory(foodCategoryName);
  const foodCategory = await pool.query(getFoodCategoryDetailsQuery);
  return foodCategory.rows;
}
