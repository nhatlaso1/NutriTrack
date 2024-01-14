// admRoutes.js

import express from 'express';
import jwt from 'jsonwebtoken';
import * as admService from '../Service/adminService.js';
import { pool } from '../utility/DbHelper.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const secret_key = process.env.SECRET_KEY;

export async function loginAdmin(req, res) {
  try {
    const { email, password } = req.body;
    const userDetails = await admService.getAdmDetails(email, password);
    if (userDetails) {
      const accessToken = jwt.sign({ email: userDetails.email }, secret_key, {
        expiresIn: '30d',
      });
      res.header('Authorization', `Bearer ${accessToken}`);
      userDetails.accessToken = `Bearer ${accessToken}`
      res.send(userDetails);
    } else {
      res.status(400).send({ message: 'Admin not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
}

export async function getUserList(req, res) {
  try {
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
    const result = await admService.getUserList(email);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

export async function updateUserStatus(req, res) {
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
    const { userId, status } = req.body;
    const email = decodEd.email;
    await admService.updateUserStatus(email, userId, status, client);
    res.status(200).send({ message: 'Update user status successful ' });
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    console.log(error);
    res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
}

export async function updateUserRole(req, res) {
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
    const { userId, role_name } = req.body;
    console.log(email);
    await admService.updateUserRole(email, userId, role_name, client);
    res.status(200).send({ message: 'Update user role successful ' });
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');

    console.log(error);
    res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
}

export async function deleteUser(req, res) {
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
    const userId = req.params.userId;
    await admService.deleteUser(email, userId, client);
    res.status(200).send({ message: 'Delete user successful ' });
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');

    console.log(error);
    res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
}

export default router;
