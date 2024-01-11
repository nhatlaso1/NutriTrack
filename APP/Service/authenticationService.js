// authenticationService.js

import * as userSQL from '../SQL/UserSQL.js';
import { pool } from '../utility/DbHelper.js';

export async function loginAdmin(email, password) {
  const getUserDetailsQuery = userSQL.getAdminDetails(email, password);
  const getUserDetails = await pool.query(getUserDetailsQuery);
  return getUserDetails.rows;
}
