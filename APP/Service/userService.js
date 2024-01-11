// userService.js

import { getRoleDetailsByRoleName } from '../DAL/adminDAL.js';
import { getFoodDetails } from '../DAL/foodDAL.js';
import { getMenuDetails } from '../DAL/menuDAL.js';
import * as userDAL from '../DAL/userDAL.js';
import { v4 as uuidv4 } from 'uuid';
export async function getUserDetailsByUserId(userId) {
  const result = await userDAL.getUserDetailsByUserId(userId);
  return result;
}
export async function getUserDetailsByLogin(email, password) {
  const result = await userDAL.getUserDetailsByLogin(email, password);
  if (!result) throw new Error(' User not found');
  return result;
}
export async function registerUserDetails(userDetails, client) {
  const [user] = await userDAL.getUserDetailsByEmail(userDetails.email);
  if (user) throw new Error('User email duplicated: ' + user.email);
  if (!userDetails.password) throw new Error('User password can not be empty');
  userDetails.user_id = uuidv4();
  const USER_ROLE = await userDAL.getRoleUserForRegister(client);
  console.log(USER_ROLE.rows[0]);
  userDetails.role_id = USER_ROLE.rows[0].role_id;
  await userDAL.registerUserDetails(userDetails, client);
}
export async function updateUserByUserDetails(userId, userDetails, client) {
  const [user] = await userDAL.getUserDetailsByUserId(userId);
  if (!user) throw new Error('User not found !');
  await userDAL.updateUserByUserDetails(userId, userDetails, client);
}
export async function createFoodFeedback(foodId, feedBackDetails, client) {
  const [result] = await userDAL.getUserDetailsByEmail(feedBackDetails.email);
  if (!result) throw new Error('User email not found ');
  const [foodById] = await getFoodDetails(foodId);
  if (!foodById) throw new Error('Food id is not found ');
  feedBackDetails.user_id = result.user_id;
  feedBackDetails.food_feedback_id = uuidv4();
  await userDAL.createFoodFeedback(foodId, feedBackDetails, client);
}
export async function createMenuFeedback(menuId, feedBackDetails, client) {
  const [user] = await userDAL.getUserDetailsByEmail(feedBackDetails.email);
  const [menuById] = await getMenuDetails(menuId);
  const [result] = await userDAL.getUserDetailsByEmail(feedBackDetails.email);
  if (!user) throw new Error('User email not found ');
  if (!menuById) throw new Error('Menu not found ');
  feedBackDetails.user_id = result.user_id;
  feedBackDetails.menu_feedback_id = uuidv4();
  await userDAL.createMenuFeedback(menuId, feedBackDetails, client);
}
export async function updateUserAvatar(userId, imgPath, client) {
  const [user] = await userDAL.getUserDetailsByUserId(userId);
  if (!user) throw new Error('User not found');
  await userDAL.updateUserAvatar(userId, imgPath, client);
}
export async function updateUserInfo(userDetail, client) {
  const [user] = await userDAL.getUserDetailsByUserId(userDetail.user_id);
  if (!user) throw new Error('User not found');
  userDetail.email = user.email;
  await userDAL.updateUserInfo(userDetail, client);
}

// Utility function
function calculateAge(birthdate) {
  const birthdateDate = new Date(birthdate);
  const currentDate = new Date();
  let age = currentDate.getFullYear() - birthdateDate.getFullYear();
  if (
    currentDate.getMonth() < birthdateDate.getMonth() ||
    (currentDate.getMonth() === birthdateDate.getMonth() &&
      currentDate.getDate() < birthdateDate.getDate())
  )
    age--;
  return age;
}
function calculateBMI(weight, height) {
  const heightInMeters = height / 100;
  const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);
  return bmi;
}
function calculateCalories(weight, height, age, gender, activityLevel) {
  const BMR_CONSTANTS = {
    male: { a: 88.362, b: 13.397, c: 4.799, d: 5.677 },
    female: { a: 447.593, b: 9.247, c: 3.098, d: 4.33 },
  };
  const { a, b, c, d } = BMR_CONSTANTS[gender.toLowerCase()];
  const bmr = a + b * weight + c * height - d * age;
  const activityLevels = {
    sedentary: 1.2,
    lightlyactive: 1.375,
    moderatelyactive: 1.55,
    veryactive: 1.725,
    superactive: 1.9,
  };
  const minCalories = (
    bmr * activityLevels[activityLevel.toLowerCase()]
  ).toFixed(2);
  const maxCalories = (minCalories * 1.2).toFixed(2);
  return {
    minCalories,
    maxCalories,
  };
}
