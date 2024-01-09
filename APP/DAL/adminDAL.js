// adminService.js

import * as userSQL from '../SQL/UserSQL.js';
import { pool } from '../utility/DbHelper.js';

export async function adminCheck(email) {
  const getUserDetailsQuery = userSQL.getAdminDetailsByUserId(email);
  const getUserDetails = await pool.query(getUserDetailsQuery);
  return getUserDetails.rows;
}

export async function getUserList() {
  const getUserDetailsQuery = userSQL.getUserList();
  const getUserDetails = await pool.query(getUserDetailsQuery);
  return getUserDetails.rows;
}

export async function updateUserStatus(userId, status, client) {
  const updateUserStatusQuery = userSQL.updateUserStatus(
    userId,
    status,
    client,
  );
  await client.query(updateUserStatusQuery);
}

export async function getRoleDetailsByRoleName(roleName) {
  const getRoleDetailsQuery = userSQL.getRoleDetailsByRoleName(roleName);
  const result = await pool.query(getRoleDetailsQuery);
  return result.rows;
}

export async function updateUserRole(userId, roleId, adminName, client) {
  const updateUserRoleQuery = userSQL.updateUserRole(
    userId,
    roleId,
    adminName,
    client,
  );
  await client.query(updateUserRoleQuery);
}
export async function deleteUser(userId, client) {
  const deleteUserQuery = userSQL.deleteUser(userId, client);
  await client.query(deleteUserQuery);
}
