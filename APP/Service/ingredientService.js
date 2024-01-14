import * as ingredientDAL from '../DAL/ingredientDAL.js';
import { v4 as uuidv4 } from 'uuid';
export async function getIngredientList() {
  const result = await ingredientDAL.getIngredientList();
  return result;
}

export async function getIngredientDetails(ingredientId) {
  const [result] = await ingredientDAL.getIngredientDetails(ingredientId);
  if (!result) throw new Error(`Ingredient is not found`);
  return result;
}

export async function createNewIngredient(ingredientDetails, client) {
  // const [ingredient] = await ingredientDAL.getIngredientDetailsByName(
  //   ingredientDetails.ingredient_name,
  // );
  // if (ingredient)
  //   throw new Error(
  //     'Ingredient name duplicated: ' + ingredientDetails.ingredient_name,
  //   );
  ingredientDetails.ingredient_id = uuidv4();
  await ingredientDAL.createNewIngredient(ingredientDetails, client);
}

export async function updateIngredient(
  ingredientId,
  ingredientDetails,
  client,
) {
  const [ingredient] = await ingredientDAL.getIngredientDetailsByName(
    ingredientDetails.ingredient_name,
  );
  if (ingredient)
    throw new Error(
      'Ingredient name duplicated: ' + ingredientDetails.ingredient_name,
    );
  const [ingredientById] = await ingredientDAL.getIngredientDetails(
    ingredientId,
  );
  if (!ingredientById)
    throw new Error(
      'Ingredient can not be found: ' + ingredientDetails.ingredient_name,
    );
  await ingredientDAL.updateIngredient(ingredientId, ingredientDetails, client);
}

export async function updateIngredientAvatar(ingredientId, file, client) {
  await getIngredientDetails(ingredientId);
  const filePath = file.path;
  await ingredientDAL.updateIngredientAvatar(ingredientId, filePath, client);
}
export async function deleteIngredient(ingredientId, client) {
  const [ingredientById] = await ingredientDAL.getIngredientDetails(
    ingredientId,
  );
  if (!ingredientById)
    throw new Error('Ingredient can not be found: ' + ingredientId);
  await ingredientDAL.deleteIngredient(ingredientId, client);
}
