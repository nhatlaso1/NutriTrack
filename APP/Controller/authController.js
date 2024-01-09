import express from 'express';
import jwt from 'jsonwebtoken';
import * as authService from '../Service/authenticationService.js';
const router = express.Router();
router.post('/reset-password/send', async (req, res) => {
  try {
    const { email } = req.body;
    const result = await authService.sendMailVerifyForResetPassword(email);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
