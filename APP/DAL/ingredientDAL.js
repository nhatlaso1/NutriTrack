import * as ingredientSQL from '../SQL/ingredientSQL.js';
import { pool } from '../utility/DbHelper.js';

export async function getIngredientList() {
  const getIngredientListQuery = ingredientSQL.getIngredientList();
  const result = await pool.query(getIngredientListQuery);
  return result.rows;
}

export async function getIngredientDetails(ingredientId) {
  const getIngredientDetailsQuery =
    ingredientSQL.getIngredientDetails(ingredientId);
  const result = await pool.query(getIngredientDetailsQuery);
  return result.rows;
}
export async function getIngredientDetailsByName(ingredientName) {
  const getIngredientDetailsQuery =
    ingredientSQL.getIngredientDetailsByName(ingredientName);
  const result = await pool.query(getIngredientDetailsQuery);
  return result.rows;
}

export async function getIngredientDetailsByNames(ingredientName) {
  const getIngredientDetailsQuery =
    ingredientSQL.getIngredientDetailsByNames(ingredientName);
  const result = await pool.query(getIngredientDetailsQuery);
  return result.rows;
}
export async function createNewIngredient(ingredientDetails, client) {
  const createNewIngredientQuery =
    ingredientSQL.createNewIngredient(ingredientDetails);
  await client.query(createNewIngredientQuery);
}
export async function updateIngredientAvatar(ingredientId, filePath, client) {
  const queryObject = ingredientSQL.updateIngredientAvatar(
    ingredientId,
    filePath,
  );
  await client.query(queryObject);
}
export async function updateIngredient(
  ingredientId,
  ingredientDetails,
  client,
) {
  const ingredientCategoryQuery = ingredientSQL.getIngredientCategory(
    ingredientDetails.ingredient_category_name,
  );
  const ingredientCategory = await client.query(ingredientCategoryQuery);

  ingredientDetails.ingredient_category_id =
    ingredientCategory.rows[0].ingredient_category_id;

  const updateIngredientQuery = ingredientSQL.updateIngredient(
    ingredientId,
    ingredientDetails,
  );
  await client.query(updateIngredientQuery);
}
export async function deleteIngredient(ingredientId, client) {
  const deleteIngredientQuery = ingredientSQL.deleteIngredient(ingredientId);
  await client.query(deleteIngredientQuery);
}
export async function getIngredientCategory(ingredientName) {
  const ingredientCategoryQuery =
    ingredientSQL.getIngredientCategory(ingredientName);
  const result = await pool.query(ingredientCategoryQuery);
  return result.rows;
}
