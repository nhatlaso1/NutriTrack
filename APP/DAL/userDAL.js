// userService.js

import * as userSQL from '../SQL/UserSQL.js';
import { pool } from '../utility/DbHelper.js';

export async function getUserDetailsByUserId(userId) {
  const getUserDetailsQuery = userSQL.getUserDetailsByUserId(userId);
  const getUserDetails = await pool.query(getUserDetailsQuery);
  return getUserDetails.rows;
}
export async function getUserDetailsByEmail(userId) {
  const getUserDetailsQuery = userSQL.getUserDetailsByUserEmail(userId);
  const getUserDetails = await pool.query(getUserDetailsQuery);
  return getUserDetails.rows;
}
export async function getUserDetailsByLogin(email, password) {
  const getUserDetailsQuery = userSQL.getUserDetailsByLogin(email, password);
  const getUserDetails = await pool.query(getUserDetailsQuery);
  return getUserDetails.rows;
}

export async function registerUserDetails(userDetails, client) {
  const getUserDetailsQuery = userSQL.registerUserDetails(userDetails);
  await client.query(getUserDetailsQuery);
}
export async function updateUserByUserDetails(userId, userDetails, client) {
  const updateUserQuery = userSQL.updateUserByUserDetails(userId, userDetails);
  await client.query(updateUserQuery);
}
export async function createFoodFeedback(foodId, feedBackDetails, client) {
  const getUserDetailsQuery = userSQL.createFoodFeedback(
    foodId,
    feedBackDetails,
  );
  await client.query(getUserDetailsQuery);
}

export async function createMenuFeedback(menuId, feedBackDetails, client) {
  const getUserDetailsQuery = userSQL.createMenuFeedback(
    menuId,
    feedBackDetails,
  );
  await client.query(getUserDetailsQuery);
}
export async function createUserInfo(userDetails, client) {
  const createUserInfoQuery = userSQL.createUserInfo(userDetails);
  await client.query(createUserInfoQuery);
}

export async function updateUserAvatar(userId, imagPath, client) {
  const createUserInfoQuery = userSQL.updateUserAvatar(userId, imagPath);
  await client.query(createUserInfoQuery);
}
export async function getUserInfoById(userId) {
  const getUserInfoQuery = userSQL.getUserInfoById(userId);
  const result = await pool.query(getUserInfoQuery);
  return result.rows;
}
export async function updateUserInfo(userDetails, client) {
  const updateUserInfoQuery = userSQL.updateUserInfo(userDetails);
  await client.query(updateUserInfoQuery);
}

export async function getRoleUserForRegister(client) {
  const getRoleUser = userSQL.getRoleUserForRegister();
  return await client.query(getRoleUser);
}
