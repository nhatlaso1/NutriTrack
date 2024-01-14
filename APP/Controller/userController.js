// userRoutes.js

import express from 'express';
import jwt from 'jsonwebtoken';
const router = express.Router();

import * as userService from '../Service/userService.js';
import dotenv from 'dotenv';
import { pool } from '../utility/DbHelper.js';

dotenv.config();

const secret_key = process.env.SECRET_KEY || '1wyPEta:D@;T#rs#R.Z^B4F?Tyv|kl^l';
export async function getUserDetails(req, res) {
  try {
    const userId = req.params.userId;
    const [userDetails] = await userService.getUserDetailsByUserId(userId);
    if (userDetails) {
      res.send(userDetails);
    } else res.status(200).send({ message: 'user not found' });
  } catch (err) {
    console.log(err);
    res.status(404);
  }
}

export async function createUserInfo(req, res) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const userId = req.params.userId;
    const userDetail = req.body;
    userDetail.user_id = userId;
    const result = await userService.createUserInfo(userDetail, client);
    res.status(200).send(result);
    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    console.log(err);
    res.status(404).send({ message: err.message });
  } finally {
    client.release();
  }
}

export async function updateUserAvatar(req, res) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const image = req.file;
    const userId = req.params.userId;
    await userService.updateUserAvatar(userId, image.path, client);
    res.status(200).send({ message: 'Avatar updated successfully' });
    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    console.log(err);
    res.status(404).send({ message: err.message });
  } finally {
    client.release();
  }
}
export async function updateUserInfo(req, res) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const userId = req.params.userId;
    const userDetail = req.body;
    userDetail.user_id = userId;
    await userService.updateUserInfo(userDetail, client);
    res.status(200).send({ message: 'Update user info' });
    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    console.log(err);
    res.status(404).send({ message: err.message });
  } finally {
    client.release();
  }
}
export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const [userDetails] = await userService.getUserDetailsByLogin(
      email,
      password,
    );
    if (userDetails) {
      const accessToken = jwt.sign({ email }, secret_key, {
        expiresIn: '30d',
      });
      res.header('Authorization', `Bearer ${accessToken}`);
      userDetails.accessToken = `Bearer ${accessToken}`
      res.send(userDetails);
    } else res.status(401).send({ message: 'user not found' });
  } catch (err) {
    console.log(err);
    res.status(404).send({ message: err.message });
  }
}
export async function registerUser(req, res) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const userDetails = req.body;
    await userService.registerUserDetails(userDetails, client);
    res.status(200).send({ message: 'User registration successful' });
    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    console.log(err);
    res.status(404).send({ message: 'User registration failed' });
  } finally {
    client.release();
  }
}

export async function updateUserDetails(req, res) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const userId = req.params.userId;
    const userDetails = req.body;
    console.log(userDetails);
    await userService.updateUserByUserDetails(userId, userDetails, client);
    if (!userDetails) res.status(200).send({ message: 'user not found' });
    res.status(200).send({ message: 'Update user successful ' });
    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    console.log(err);
    res.status(404).send({ message: err.message });
  } finally {
    client.release();
  }
}
export async function createFoodFeedback(req, res) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'No token provided' });
    }
    // Check if the header includes the Bearer scheme
    const tokenParts = authHeader.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
      return res.status(401).json({ message: 'Invalid token format' });
    }
    // Extract the token
    const token = tokenParts[1];
    let decodEd;
    // Verify and decode the JWT token
    jwt.verify(token, secret_key, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' });
      } else decodEd = decoded;
    });
    const email = decodEd.email;
    const foodId = req.params.foodId;
    const feedBackDetails = req.body;
    feedBackDetails.email = email;
    await userService.createFoodFeedback(foodId, feedBackDetails, client);
    res.status(200).send({ message: 'Feed back created successful ' });
    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    console.log(err);
    res.status(404).send({ message: err.message });
  } finally {
    client.release();
  }
}
export async function createMenuFeedback(req, res) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'No token provided' });
    }
    // Check if the header includes the Bearer scheme
    const tokenParts = authHeader.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
      return res.status(401).json({ message: 'Invalid token format' });
    }
    // Extract the token
    const token = tokenParts[1];
    let decodEd;
    // Verify and decode the JWT token
    jwt.verify(token, secret_key, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' });
      } else decodEd = decoded;
    });
    const email = decodEd.email;
    const menuId = req.params.menuId;
    const feedBackDetails = req.body;
    feedBackDetails.email = email;
    await userService.createMenuFeedback(menuId, feedBackDetails, client);
    res.status(200).send({ message: 'Feed back created successful ' });
    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    console.log(err);
    res.status(404).send({ message: err.message });
  } finally {
    client.release();
  }
}

export default router;
