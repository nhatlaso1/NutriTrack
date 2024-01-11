// userRoutes.js

import express from 'express';
import * as feedBackService from '../Service/feedBackService.js';

const router = express.Router();

export async function getFoodFeedBacks(req, res) {
  try {
    const feedBackList = await feedBackService.getFoodFeedBacks();
    if (feedBackList.length) {
      res.send({ feedBackList });
    } else
      res.status(200).send({ message: 'no feed back found', feedBackList });
  } catch (err) {
    console.log(err);
    res.status(404).send({ message: err.message });
  }
}

export async function getMenuFeedBacks(req, res) {
  try {
    const feedBackList = await feedBackService.getMenuFeedBacks();
    if (feedBackList.length) {
      res.send({ feedBackList });
    } else
      res.status(200).send({ message: 'no feed back found', feedBackList });
  } catch (err) {
    console.log(err);
    res.status(404).send({ message: err.message });
  }
}

export async function getFoodFeedBackByFoodId(req, res) {
  try {
    const foodId = req.params.foodId;
    const feedBackList = await feedBackService.getFoodFeedBackByFoodId(foodId);
    if (feedBackList.length) {
      res.send({ feedBackList });
    } else
      res.status(200).send({ message: 'no feed back found', feedBackList });
  } catch (err) {
    console.log(err);
    res.status(404).send({ message: err.message });
  }
}

export async function getMenuFeedBackListByMenuId(req, res) {
  try {
    const menuId = req.params.menuId;
    const feedBackList = await feedBackService.getMenuFeedBackListByMenuId(
      menuId,
    );
    if (feedBackList.length) {
      res.send({ feedBackList });
    } else
      res.status(200).send({ message: 'no feed back found', feedBackList });
  } catch (err) {
    console.log(err);
    res.status(404).send({ message: err.message });
  }
}

export default router;
