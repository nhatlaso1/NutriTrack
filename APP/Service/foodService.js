import * as foodDAL from '../DAL/foodDAL.js';
import { v4 as uuidv4 } from 'uuid';
import { getIngredientList } from '../DAL/ingredientDAL.js';
export async function getFoodList() {
  const result = await foodDAL.getFoodList();
  return result;
}

export async function getFoodDetails(foodId) {
  const [result] = await foodDAL.getFoodDetails(foodId);
  if (!result) throw new Error('Food is not found');
  return result;
}

export async function createFood(foodDetails, client) {
  // const [food] = await foodDAL.getFoodDetailsByName(foodDetails.food_name);
  // if (food) throw new Error('Food name duplicated: ' + foodDetails.food_name);
  foodDetails.food_id = uuidv4();
  const [foodCategory] = await foodDAL.getFoodCategory(
    foodDetails.food_category_name,
  );

  foodDetails.category_id = foodCategory.category_id;
  // const ingredients = await getIngredientList();
  // const foodCategoryIds = ingredients
  //   .filter((e) => foodDetails.food_ingredients.includes(e.ingredient_id))
  //   .map((e) => e.ingredient_id);

  // if (foodCategoryIds.length)
  //   for (const e of foodCategoryIds) {
  //     await foodDAL.createFoodIngredient(foodDetails.food_id, e, client);
  //   }
  await foodDAL.createFood(foodDetails, client);
}
export async function updateFoodAvatar(foodId, image, client) {
  await getFoodDetails(foodId);
  await foodDAL.updateFoodAvatar(foodId, image, client);
}

export async function updateFood(foodDetails, client) {
  const [foodCategory] = await foodDAL.getFoodCategory(
    foodDetails.food_category_name,
  );
  foodDetails.category_id = foodCategory.category_id;
  // const [food] = await foodDAL.getFoodDetailsByName(foodDetails.food_name);
  // const [foodById] = await foodDAL.getFoodDetails(foodDetails.food_id);
  // if (food) throw new Error('Food name duplicated: ' + foodDetails.food_name);
  // if (!foodById) throw new Error('food id is not found ');
  // const ingredients = await getIngredientList();
  // const foodCategoryIds = ingredients
  //   .filter((e) => foodDetails.food_ingredients.includes(e.ingredient_id))
  //   .map((e) => e.ingredient_id);

  // if (foodCategoryIds.length)
  //   for (const e of foodCategoryIds) {
  //     await foodDAL.createFoodIngredient(foodDetails.food_id, e, client);
  //   }
  await foodDAL.updateFood(foodDetails, client);
}

export async function deleteFood(foodId, client) {
  const [result] = await foodDAL.getFoodDetails(foodId);
  if (!result) throw new Error('Food is not found');
  await foodDAL.deleteFood(foodId, client);
}
