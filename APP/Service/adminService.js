// admService.js

import * as authenticationService from '../Service/authenticationService.js';
import * as adminDAL from '../DAL/adminDAL.js';
import { getUserDetailsByUserId } from '../DAL/userDAL.js';

export async function getAdmDetails(email, password) {
  const [adminDetails] = await authenticationService.loginAdmin(
    email,
    password,
  );
  if (!adminDetails) throw new Error('Admin not found');
  return adminDetails;
}

export async function getUserList(email) {
  const [adminDetails] = await adminDAL.adminCheck(email);
  if (!adminDetails) throw new Error('You are not admin');
  const userList = await adminDAL.getUserList();
  return userList;
}

export async function updateUserStatus(email, userId, status, client) {
  const [adminDetails] = await adminDAL.adminCheck(email);
  const [userDetails] = await getUserDetailsByUserId(userId);
  if (!adminDetails) throw new Error('You are not admin');
  if (!userDetails) throw new Error('User not found');
  if (Number(status) !== 1 && Number(status) !== 0)
    throw new Error('status must be available/1 or temp_ban/0');
  await adminDAL.updateUserStatus(userId, status, client);
}

export async function updateUserRole(email, userId, roleName, client) {
  const [userDetails] = await getUserDetailsByUserId(userId);
  const [adminDetails] = await adminDAL.adminCheck(email);
  const [roleDetails] = await adminDAL.getRoleDetailsByRoleName(roleName);
  if (!userDetails) throw new Error('User not found');
  if (!adminDetails) throw new Error('You are not admin');
  if (roleName === 'ADMIN') throw new Error('User can not be promote to admin');
  if (!roleDetails) throw new Error('Role not found');
  await adminDAL.updateUserRole(
    userId,
    roleDetails.role_id,
    adminDetails.email,
    client,
  );
}

export async function deleteUser(email, userId, client) {
  const [adminDetails] = await adminDAL.adminCheck(email);
  const [userDetails] = await getUserDetailsByUserId(userId);
  if (!adminDetails) throw new Error('You are not admin');
  if (userDetails.is_activate) throw new Error('This user is not banned');
  await adminDAL.deleteUser(userId, client);
}
