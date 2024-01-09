// userService.js

import * as feedBackDAL from '../DAL/feedBackDAL.js';

export async function getFoodFeedBacks() {
  const result = await feedBackDAL.getFoodFeedBacks();
  return result;
}
export async function getMenuFeedBacks() {
  const result = await feedBackDAL.getMenuFeedBacks();
  return result;
}

export async function getTrainerFeedBacks() {
  const result = await feedBackDAL.getTrainerFeedBacks();
  return result;
}

export async function getFoodFeedBackByFoodId(foodId) {
  const [result] = await feedBackDAL.getFoodFeedBackByFoodId(foodId);
  if (!result) throw new Error("Can not find food's feedback");
  return result;
}
export async function getMenuFeedBackListByMenuId(menuId) {
  const [result] = await feedBackDAL.getMenuFeedBackByMenuId(menuId);
  if (!result) throw new Error("Can not find menu's feedback");
  return result;
}

export async function getTrainerFeedBackByTrainerId(trainerId) {
  const [result] = await feedBackDAL.getTrainerFeedBackByMenuId(trainerId);
  if (!result) throw new Error("Can not find trainer's feedback");
  return result;
}
