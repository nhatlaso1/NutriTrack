import express from 'express';
import * as serviceService from '../Service/serviceService.js';
import { pool } from '../utility/DbHelper.js';
const router = express.Router();

export async function getServiceList(req, res) {
  try {
    const result = await serviceService.getServiceList();
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(404);
  }
}

export async function getSalePackageDetails(req, res) {
  try {
    const salePackageId = req.params.salePackageId;
    const result = await serviceService.getSalePackageDetails(salePackageId);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(404).send({ message: err.message });
  }
}

export async function createSalePackage(req, res) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const salePackageDetails = req.body;
    await serviceService.createSalePackage(salePackageDetails, client);
    res.send({ message: 'Sale Package created successfully' });
    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');

    console.log(err);
    res.status(404).json({ error: error.message });
  } finally {
    client.release();
  }
}
export async function updateSalePackage(req, res) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const salePackageId = req.params.salePackageId;
    const salePackageDetails = req.body;
    salePackageDetails.sale_package_id = salePackageId;
    await serviceService.updateSalePackage(salePackageDetails, client);
    res.send({ message: 'Sale Package updated successfully' });
    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');

    console.log(err);
    res.status(404).json({ error: error.message });
  } finally {
    client.release();
  }
}
export async function deleteSalePackage(req, res) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const salePackageId = req.params.salePackageId;
    await serviceService.deleteSalePackage(salePackageId, client);
    res.send({ message: 'Sale Package deleted successfully' });
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
